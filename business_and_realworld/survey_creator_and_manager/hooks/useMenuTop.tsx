import { useCallback, useState } from "react";

export const useMenuTop = ({
  menuHeight,
  menuTopMargin = 0,
  menuBottomMargin = 0,
}: {
  menuHeight: number;
  menuTopMargin?: number;
  menuBottomMargin?: number;
}) => {
  const [menuTop, setMenuTop] = useState(0);

  const calcMenuTop = useCallback(
    (menuViewTop: number) => {
      // topMarginがmenuTopの基準
      let newMenuTop = menuViewTop + window.scrollY - menuTopMargin;

      // 上にはみ出す場合
      if (menuViewTop < menuTopMargin) {
        newMenuTop = window.scrollY;
      }

      //下にはみ出す場合
      const menuViewBottom = menuViewTop + menuHeight;
      const menuViewBottomBase = window.innerHeight - menuBottomMargin;
      if (menuViewBottom > menuViewBottomBase) {
        newMenuTop -= menuViewBottom - menuViewBottomBase;
      }

      return newMenuTop;
    },
    [menuBottomMargin, menuHeight, menuTopMargin]
  );

  const changeMenuTopUsingViewTop = useCallback(
    (menuViewTop: number) => {
      const newMenuTop = calcMenuTop(menuViewTop);
      setMenuTop(newMenuTop);
    },
    [calcMenuTop]
  );

  // 現在のscroll値によってmenuTopを更新する
  const updateMenuTop = useCallback(() => {
    setMenuTop((menuTop) => {
      const menuViewTop = menuTop + menuTopMargin - window.scrollY;
      return calcMenuTop(menuViewTop);
    });
  }, [calcMenuTop, menuTopMargin]);

  return { menuTop, updateMenuTop, changeMenuTopUsingViewTop };
};
