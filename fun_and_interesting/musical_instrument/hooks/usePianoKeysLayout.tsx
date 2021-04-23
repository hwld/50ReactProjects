import { ChakraProps } from "@chakra-ui/react";
import { useMemo } from "react";
import {
  ALL_BLACK_NOTE_NAMES,
  ALL_WHITE_NOTE_NAMES,
  NoteName,
} from "../lib/sound";

type WhiteKeyLayout = {
  noteName: NoteName;
  whiteKeyWidth: ChakraProps["width"];
  whiteKeyMarginRight: ChakraProps["marginRight"];
};

type BlackKeyLayout = {
  noteName: NoteName;
  left: ChakraProps["left"];
  blackKeyWidth: ChakraProps["width"];
};

type NoteNameKeyMapLayout = {
  whiteKeys: WhiteKeyLayout[];
  blackKeys: BlackKeyLayout[];
};

export const useNoteNameKeyMapLayout = (): NoteNameKeyMapLayout => {
  const whiteKeyWidth = "50px";
  const whiteKeyMarginRight = "10px";
  const blackKeyWidth = "45px";

  const whiteKeys: WhiteKeyLayout[] = useMemo(
    () =>
      ALL_WHITE_NOTE_NAMES.map((noteName, index) => {
        let marginRight = whiteKeyMarginRight;
        if (index === ALL_WHITE_NOTE_NAMES.length - 1) {
          marginRight = "0";
        }
        return {
          noteName,
          whiteKeyWidth,
          whiteKeyMarginRight: marginRight,
        };
      }),
    []
  );

  const blackKeys: BlackKeyLayout[] = useMemo(
    () =>
      ALL_BLACK_NOTE_NAMES.map((noteName) => {
        let left: ChakraProps["left"];
        switch (noteName) {
          case "C#":
            left = `calc(${whiteKeyWidth} / 2)`;
            break;
          case "D#":
            left = `calc(((${whiteKeyWidth} + ${whiteKeyMarginRight}) * 2) + (${whiteKeyWidth} / 2) - ${blackKeyWidth})`;
            break;
          case "E#":
            left = `calc(((${whiteKeyWidth} + ${whiteKeyMarginRight}) * 3) + (${whiteKeyWidth} / 2))`;
            break;
          case "G#":
            left = `calc(((${whiteKeyWidth} + ${whiteKeyMarginRight}) * 4) + ((${whiteKeyWidth} + (${whiteKeyMarginRight}) / 2)) - (${blackKeyWidth} / 2))`;
            break;
          case "A#":
            left = `calc(((${whiteKeyWidth} + ${whiteKeyMarginRight}) * 6) + (${whiteKeyWidth} / 2) - ${blackKeyWidth})`;
            break;
        }
        return { noteName, left, blackKeyWidth };
      }),
    []
  );

  return {
    blackKeys,
    whiteKeys,
  };
};
