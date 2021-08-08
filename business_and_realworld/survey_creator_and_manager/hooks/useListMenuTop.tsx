import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type UseListMenuTopArgs = {
  menuHeight: number;
  // documentの一番上 + menuTopMarginが、menuTopの0になるようにする。
  menuTopMargin: number;
  menuBottomMargin: number;
  secondToLastItemRef: MutableRefObject<HTMLElement | null>;
};

export const useListMenuTop = ({
  menuHeight,
  menuTopMargin,
  menuBottomMargin,
  secondToLastItemRef,
}: UseListMenuTopArgs) => {
  const [menuTop, setMenuTop] = useState(0);

  // viewTopからtopに変換
  const convertToMenuTop = useCallback(
    (menuViewTop: number, viewportTop: number) => {
      return menuViewTop + viewportTop - menuTopMargin;
    },
    [menuTopMargin]
  );

  // topからviewTopに変換
  const convertToMenuViewTop = useCallback(
    (menuTop: number, viewportTop: number) => {
      return menuTop + menuTopMargin - viewportTop;
    },
    [menuTopMargin]
  );

  // viewportMarginを除くviewportの範囲に収まるMenuTopを返す
  const setMenuTopToFitInViewport = useCallback(
    (menuTop: number, viewportTop: number) => {
      let newMenuTop = menuTop;

      const menuViewTop = convertToMenuViewTop(menuTop, viewportTop);
      const menuViewBottom = menuViewTop + menuHeight;
      const menuViewBottomBase = window.innerHeight - menuBottomMargin;

      // 上にはみ出す場合
      if (menuViewTop < menuTopMargin) {
        newMenuTop = viewportTop;
      }

      //下にはみ出す場合
      if (menuViewBottom > menuViewBottomBase) {
        newMenuTop -= menuViewBottom - menuViewBottomBase;
      }

      return newMenuTop;
    },
    [convertToMenuViewTop, menuBottomMargin, menuHeight, menuTopMargin]
  );

  const changeMenuTopUsingViewTop = useCallback(
    (menuViewTop: number, viewportTop: number) => {
      const menuTop = convertToMenuTop(menuViewTop, viewportTop);
      const newMenuTop = setMenuTopToFitInViewport(menuTop, viewportTop);
      setMenuTop(newMenuTop);
    },
    [convertToMenuTop, setMenuTopToFitInViewport]
  );

  // scroll値によってmenuTopを更新する
  const updateMenuTop = useCallback(
    (viewportTop: number) => {
      setMenuTop((menuTop) => {
        return setMenuTopToFitInViewport(menuTop, viewportTop);
      });
    },
    [setMenuTopToFitInViewport]
  );

  const oldInterSectionObserver = useRef<IntersectionObserver>();
  const handleBlurItem = useCallback(() => {
    oldInterSectionObserver.current?.disconnect();
  }, []);
  const handleFocusItem: React.FocusEventHandler<HTMLElement> = useCallback(
    ({ currentTarget }) => {
      // focusされた要素がviewPortに100％表示されたときにmenuを移動させる
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) {
            return;
          }

          const viewTop = entries[0].target.getBoundingClientRect().top;
          changeMenuTopUsingViewTop(viewTop, window.scrollY);
        },
        { rootMargin: `-${menuTopMargin}px 0px 0px 0px`, threshold: 1 }
      );
      observer.observe(currentTarget);
      oldInterSectionObserver.current = observer;

      const viewTop = currentTarget.getBoundingClientRect().top;
      changeMenuTopUsingViewTop(viewTop, window.scrollY);
    },
    [changeMenuTopUsingViewTop, menuTopMargin]
  );

  const didDeleteLast = useRef<{ nextMenuTop: number } | null>(null);
  const handleBeforeDeleteLastItem = useCallback(() => {
    didDeleteLast.current = {
      nextMenuTop:
        (secondToLastItemRef.current?.getBoundingClientRect().top ?? 0) +
        window.scrollY -
        menuTopMargin,
    };
  }, [menuTopMargin, secondToLastItemRef]);

  const didDeleteNonLast = useRef<{ oldScrollY: number } | null>(null);
  const handleBeforeDeleteNonLastItem = useCallback(() => {
    didDeleteNonLast.current = { oldScrollY: window.scrollY };
  }, []);

  const handleAfterDeleteItem = useCallback(() => {
    if (didDeleteLast.current) {
      setMenuTop(didDeleteLast.current.nextMenuTop);
      didDeleteLast.current = null;
    }
    if (didDeleteNonLast.current) {
      setMenuTop((top) => {
        return top + (window.scrollY - didDeleteNonLast.current!.oldScrollY);
      });
      didDeleteNonLast.current = null;
    }
  }, []);

  // scrollとtopを連動させる
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        updateMenuTop(window.scrollY);
      }, 30);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  });

  return {
    menuTop: menuTop,
    handleBlurItem,
    handleFocusItem,
    handleBeforeDeleteLastItem,
    handleBeforeDeleteNonLastItem,
    handleAfterDeleteItem,
  };
};
