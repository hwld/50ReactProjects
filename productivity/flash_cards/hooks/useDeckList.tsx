import { useState } from "react";
import { Deck } from "../types";

export const useDeckList = () => {
  const [deckList, setDeckList] = useState<Deck[]>([
    {
      id: "1",
      name: "英単語1",
      cards: [
        { id: "1", question: "dog", answer: "犬" },
        { id: "2", question: "cat", answer: "猫" },
      ],
    },
    {
      id: "2",
      name: "英単語2",
      cards: [
        { id: "1", question: "dog", answer: "犬" },
        { id: "2", question: "cat", answer: "猫" },
      ],
    },
    {
      id: "3",
      name: "英単語3",
      cards: [
        { id: "1", question: "dog", answer: "犬" },
        { id: "2", question: "cat", answer: "猫" },
      ],
    },
    {
      id: "4",
      name: "英単語4",
      cards: [
        { id: "1", question: "dog", answer: "犬" },
        { id: "2", question: "cat", answer: "猫" },
      ],
    },
  ]);
  return { deckList, setDeckList };
};
