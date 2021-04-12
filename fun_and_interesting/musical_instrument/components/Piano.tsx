import { Box, chakra, Flex } from "@chakra-ui/react";
import React from "react";
import { usePianoKeysLayout } from "../hooks/usePianoKeysLayout";
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
  const { whiteKeys, blackKeys } = usePianoKeysLayout();

  return (
    <Box position="relative" className={className}>
      <Flex>
        {whiteKeys.map(({ noteName, whiteKeyWidth, whiteKeyMarginRight }) => {
          return (
            <PianoWhiteKey
              key={`${noteName}${noteNumber}`}
              note={{ noteName, noteNumber }}
              pressed={pressedNoteNames.includes(noteName)}
              _active={{ bg: "yellow.300" }}
              playSound={playSound}
              mr={whiteKeyMarginRight}
              w={whiteKeyWidth}
              h="250px"
            />
          );
        })}
        {blackKeys.map(({ noteName, left, blackKeyWidth }) => {
          return (
            <PianoBlackKey
              key={`${noteName}${noteNumber}`}
              note={{ noteName, noteNumber }}
              pressed={pressedNoteNames.includes(noteName)}
              _active={{ bg: "red.500" }}
              playSound={playSound}
              position="absolute"
              left={left}
              w={blackKeyWidth}
              h="160px"
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export const Piano = chakra(Component);
