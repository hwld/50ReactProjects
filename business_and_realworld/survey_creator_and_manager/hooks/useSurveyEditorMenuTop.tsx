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
        console.log("observe", viewTop);
        changeMenuTopUsingViewTop(viewTop, window.scrollY);
      },
      { rootMargin: `-${menuTopMargin}px 0px 0px 0px`, threshold: 1 }
    );
    observer.observe(currentTarget);
    oldInterSectionObserver.current = observer;

    const viewTop = currentTarget.getBoundingClientRect().top;
    console.log("focus", viewTop);
    changeMenuTopUsingViewTop(viewTop, window.scrollY);
  };

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
    handleBlur,
    handleFocus,
    setMenuTop,
  };
};
