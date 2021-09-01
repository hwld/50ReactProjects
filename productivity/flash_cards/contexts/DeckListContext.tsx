import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { useDeckList } from "../hooks/useDeckList";
import { Deck } from "../types";

const deckListContext = createContext<{
  deckList: Deck[];
  setDeckList: Dispatch<SetStateAction<Deck[]>>;
}>({ deckList: [], setDeckList: () => {} });

export const DeckListContextProvider: React.FC = ({ children }) => {
  const { deckList, setDeckList } = useDeckList();
  return (
    <deckListContext.Provider value={{ deckList, setDeckList }}>
      {children}
    </deckListContext.Provider>
  );
};

export const useDeckListContext = () => useContext(deckListContext);
