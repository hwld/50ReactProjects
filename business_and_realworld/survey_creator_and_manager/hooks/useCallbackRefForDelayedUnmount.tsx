// framer-motionのAnimatePresenceでコンポーネントのリストをラップして、その元となる配列の要素を削除したときに、
// すぐにコンポーネントがアンマウントされずに、次のコンポーネントにrefが渡されたあとにアンマウントされる。

import React, { useCallback, useRef } from "react";

// これを解決するために、連続したmountと同じ数のunmountが設定されて初めてnullがrefに渡されるcallbackRefを作る
export const useCallbackRefForDelayedUnmount = (
  ref: React.MutableRefObject<HTMLElement | null>
) => {
  // 連続してelementが渡されたときには、連続した数と同じnullを渡されて初めてrefをnullに設定する
  // elementが複数渡されるときには、対応する数-1のnullが渡されることを前提としているけど、間違ってるかも・・・
  const mountCount = useRef(0);
  const unmountCount = useRef(0);
  const callbackRef = useCallback(
    (e: HTMLElement | null) => {
      if (e) {
        ref.current = e;
        mountCount.current += 1;
      } else {
        unmountCount.current += 1;
        if (mountCount.current === unmountCount.current) {
          ref.current = null;
          mountCount.current = 0;
          unmountCount.current = 0;
        }
      }
    },
    [ref]
  );

  return callbackRef;
};
