import { Box, chakra, Flex } from "@chakra-ui/react";
import React from "react";
import { useNoteNameKeyMapLayout } from "../hooks/usePianoKeysLayout";
import { Note, NoteName, NoteNumber } from "../lib/sound";
import { PlayablePianoKey } from "./PlayablePianoKey";

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
  const { whiteKeys, blackKeys } = useNoteNameKeyMapLayout();

  return (
    <Box position="relative" className={className}>
      <Flex>
        {whiteKeys.map(({ noteName, whiteKeyWidth, whiteKeyMarginRight }) => {
          return (
            <PlayablePianoKey
              key={noteName}
              note={{ noteName, noteNumber }}
              pressed={pressedNoteNames.includes(noteName)}
              playSound={playSound}
              _active={{ bg: "yellow.300" }}
              mr={whiteKeyMarginRight}
              w={whiteKeyWidth}
              h="250px"
              bg="gray.100"
            />
          );
        })}
        {blackKeys.map(({ noteName, left, blackKeyWidth }) => {
          return (
            <PlayablePianoKey
              key={noteName}
              note={{ noteName, noteNumber }}
              pressed={pressedNoteNames.includes(noteName)}
              playSound={playSound}
              _active={{ bg: "red.500" }}
              position="absolute"
              left={left}
              w={blackKeyWidth}
              h="160px"
              bg="gray.800"
              noteTextStyle={{ color: "gray.50" }}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export const Piano = chakra(Component);
