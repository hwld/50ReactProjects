/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useState } from "react";

type AppState = {
  scrollY: number;
  setScrollY: React.Dispatch<React.SetStateAction<number>>;
};

const AppStateContext = createContext<AppState>({
  scrollY: 0,
  setScrollY: () => {},
});

export const AppStateProvider: React.FC = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  return (
    <AppStateContext.Provider value={{ scrollY, setScrollY }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppState => useContext(AppStateContext);
