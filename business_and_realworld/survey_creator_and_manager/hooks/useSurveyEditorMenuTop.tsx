import { useCallback, useState } from "react";

// viewport内の座標
export type ViewTop = { type: "Viewport"; value: number };
// document内の座標
export type Top = { type: "Document"; value: number };

export const useSurveyEditorMenuTop = ({
  menuHeight,
  menuTopMargin,
  menuBottomMargin,
}: {
  menuHeight: number;
  // documentの一番上 + menuTopMarginが、menuTopの0になるようにする。
  menuTopMargin: number;
  menuBottomMargin: number;
}) => {
  const [menuTop, setMenuTop] = useState<Top>({ type: "Document", value: 0 });

  // viewTopからtopに変換
  const convertToMenuTop = useCallback(
    (menuViewTop: ViewTop, viewportTop: Top): Top => {
      return {
        type: "Document",
        value: menuViewTop.value + viewportTop.value - menuTopMargin,
      };
    },
    [menuTopMargin]
  );

  // topからviewTopに変換
  const convertToMenuViewTop = useCallback(
    (menuTop: Top, viewportTop: Top): ViewTop => {
      return {
        type: "Viewport",
        value: menuTop.value + menuTopMargin - viewportTop.value,
      };
    },
    [menuTopMargin]
  );

  // viewportMarginを除くviewportの範囲に収まるMenuTopを返す
  const setMenuTopToFitInViewport = useCallback(
    (menuTop: Top, viewportTop: Top): Top => {
      let newMenuTop = menuTop;

      const menuViewTop = convertToMenuViewTop(menuTop, viewportTop);
      const menuViewBottom = menuViewTop.value + menuHeight;
      const menuViewBottomBase = window.innerHeight - menuBottomMargin;

      // 上にはみ出す場合
      if (menuViewTop.value < menuTopMargin) {
        newMenuTop = viewportTop;
      }

      //下にはみ出す場合
      if (menuViewBottom > menuViewBottomBase) {
        newMenuTop = {
          type: "Document",
          value: newMenuTop.value - (menuViewBottom - menuViewBottomBase),
        };
      }

      return newMenuTop;
    },
    [convertToMenuViewTop, menuBottomMargin, menuHeight, menuTopMargin]
  );

  const changeMenuTopUsingViewTop = useCallback(
    (menuViewTop: ViewTop, viewportTop: Top) => {
      const menuTop = convertToMenuTop(menuViewTop, viewportTop);
      const newMenuTop = setMenuTopToFitInViewport(menuTop, viewportTop);
      setMenuTop(newMenuTop);
    },
    [convertToMenuTop, setMenuTopToFitInViewport]
  );

  // 現在のscroll値によってmenuTopを更新する
  const updateMenuTop = useCallback(
    (viewportTop: Top) => {
      setMenuTop((menuTop) => {
        return setMenuTopToFitInViewport(menuTop, viewportTop);
      });
    },
    [setMenuTopToFitInViewport]
  );

  return {
    menuTop: menuTop.value,
    updateMenuTop,
    changeMenuTopUsingViewTop,
    setMenuTop,
  };
};
