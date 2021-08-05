import { useCallback, useEffect, useRef, useState } from "react";

type UseSurveyEditorMenuTopArgs = {
  menuHeight: number;
  // documentの一番上 + menuTopMarginが、menuTopの0になるようにする。
  menuTopMargin: number;
  menuBottomMargin: number;
};

export const useSurveyEditorMenuTop = ({
  menuHeight,
  menuTopMargin,
  menuBottomMargin,
}: UseSurveyEditorMenuTopArgs) => {
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

  // 現在のscroll値によってmenuTopを更新する
  const updateMenuTop = useCallback(
    (viewportTop: number) => {
      setMenuTop((menuTop) => {
        return setMenuTopToFitInViewport(menuTop, viewportTop);
      });
    },
    [setMenuTopToFitInViewport]
  );

  const oldInterSectionObserver = useRef<IntersectionObserver>();
  const handleBlur = () => {
    oldInterSectionObserver.current?.disconnect();
  };
  const handleFocus: React.FocusEventHandler<HTMLElement> = ({
    currentTarget,
  }) => {
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
  };

  // 次のscroll eventで指定されたmenuTopに変更する
  const isChangeInNextScroll = useRef<{ menuTop: number } | null>(null);
  const changeMenuTopAtNextScroll = (menuTop: number) => {
    isChangeInNextScroll.current = { menuTop };
  };

  // 次のscroll eventで指定されたviewportTopと、その時点でのwindow.scrollYを使ってmenuTopを更新する
  // 指定されたviewportTopよりも大きければmenuTopをその分上に、小さければその分下に移動させる。
  const isUpdateInNextScroll = useRef<{ viewportTop: number } | null>(null);
  const updateMenuTopAtNextScroll = (viewportTop: number) => {
    isUpdateInNextScroll.current = { viewportTop };
  };

  // scrollとtopを連動させる
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        if (isChangeInNextScroll.current) {
          setMenuTop(isChangeInNextScroll.current.menuTop);
          isChangeInNextScroll.current = null;
        }

        if (isUpdateInNextScroll.current) {
          setMenuTop((top) => {
            return (
              top + (window.scrollY - isUpdateInNextScroll.current!.viewportTop)
            );
          });
          isUpdateInNextScroll.current = null;
        }

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
    handleBlur,
    handleFocus,
    changeMenuTopAtNextScroll,
    updateMenuTopAtNextScroll,
  };
};
