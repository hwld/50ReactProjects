/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useState } from "react";
import { Character } from "../fetch";

const CharactersStateContext = createContext<Character[]>([]);
const CharactersSetContext = createContext<
  React.Dispatch<React.SetStateAction<Character[]>>
>(() => {});

export const CharactersProvider: React.FC = ({ children }) => {
  const [counters, setCounters] = useState<Character[]>([]);
  return (
    <CharactersStateContext.Provider value={counters}>
      <CharactersSetContext.Provider value={setCounters}>
        {children}
      </CharactersSetContext.Provider>
    </CharactersStateContext.Provider>
  );
};

export const useCharacters = (): Character[] =>
  useContext(CharactersStateContext);

export const useSetCharacters = (): React.Dispatch<
  React.SetStateAction<Character[]>
> => useContext(CharactersSetContext);
