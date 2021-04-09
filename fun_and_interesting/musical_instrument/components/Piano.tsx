import { Box, chakra, ChakraProps, Flex } from "@chakra-ui/react";
import React from "react";
import { Note, NoteName, NoteNumber } from "../lib/sound";
import { PianoBlackKey } from "./PianoBlackKey";
import { PianoWhiteKey } from "./PianoWhiteKey";

type Props = {
  className?: string;
  noteNumber: NoteNumber;
  pressedNoteNames?: NoteName[];
  playSound: (note: Note) => void;
};

const Component: React.FC<Props> = ({
  className,
  noteNumber,
  pressedNoteNames = [],
  playSound,
}) => {
  const whiteKeyWidth = "50px";
  const whiteKeyMarginRight = "10px";
  const blackKeyWidth = "45px";

  const whiteKeys: { noteName: NoteName }[] = [
    { noteName: "C" },
    { noteName: "D" },
    { noteName: "E" },
    { noteName: "F" },
    { noteName: "G" },
    { noteName: "A" },
    { noteName: "B" },
  ];

  const blackKeys: {
    noteName: NoteName;
    left: ChakraProps["left"];
  }[] = [
    { noteName: "C#", left: `calc(${whiteKeyWidth} / 2)` },
    {
      noteName: "D#",
      left: `calc(((${whiteKeyWidth} + ${whiteKeyMarginRight}) * 2) + (${whiteKeyWidth} / 2) - ${blackKeyWidth})`,
    },
    {
      noteName: "E#",
      left: `calc(((${whiteKeyWidth} + ${whiteKeyMarginRight}) * 3) + (${whiteKeyWidth} / 2))`,
    },
    {
      noteName: "G#",
      left: `calc(((${whiteKeyWidth} + ${whiteKeyMarginRight}) * 4) + ((${whiteKeyWidth} + (${whiteKeyMarginRight}) / 2)) - (${blackKeyWidth} / 2))`,
    },
    {
      noteName: "A#",
      left: `calc(((${whiteKeyWidth} + ${whiteKeyMarginRight}) * 6) + (${whiteKeyWidth} / 2) - ${blackKeyWidth})`,
    },
  ];

  return (
    <Box position="relative" className={className}>
      {blackKeys.map(({ noteName, left }) => {
        return (
          <PianoBlackKey
            key={`${noteName}${noteNumber}`}
            note={{ noteName, noteNumber }}
            pressed={pressedNoteNames.includes(noteName)}
            playSound={playSound}
            position="absolute"
            left={left}
            w={blackKeyWidth}
            h="160px"
          />
        );
      })}
      <Flex>
        {whiteKeys.map(({ noteName }) => {
          return (
            <PianoWhiteKey
              key={`${noteName}${noteNumber}`}
              note={{ noteName, noteNumber }}
              pressed={pressedNoteNames.includes(noteName)}
              playSound={playSound}
              mr={whiteKeyMarginRight}
              w={whiteKeyWidth}
              h="250px"
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export const Piano = chakra(Component);
