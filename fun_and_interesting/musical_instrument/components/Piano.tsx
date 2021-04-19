import { Box, Button, chakra, Flex } from "@chakra-ui/react";
import React, { Dispatch } from "react";
import { useNoteNameKeyMapLayout } from "../hooks/usePianoKeysLayout";
import { NoteNameKeyMap, PianosAction } from "../hooks/usePianos";
import { Note, NoteName, NoteNumber } from "../lib/sound";
import { OpenChangePianoKeyMapForm } from "./OpenChangePianoKeyMapForm";
import { PlayablePianoKey } from "./PlayablePianoKey";

type Props = {
  className?: string;
  noteNumber: NoteNumber;
  pressedNoteNames?: NoteName[];
  existingNoteNumbers: NoteNumber[];
  getNoteNameKeyMap: (noteNumber: NoteNumber) => NoteNameKeyMap;
  changePianoHotKeys: (noteNumber: NoteNumber, keyMap: NoteNameKeyMap) => void;
  playSound: (note: Note) => void;
  deletePiano: (noteNumber: NoteNumber) => void;
};

const Component: React.FC<Props> = ({
  className,
  noteNumber,
  pressedNoteNames = [],
  existingNoteNumbers,
  getNoteNameKeyMap,
  changePianoHotKeys,
  playSound,
  deletePiano,
}) => {
  const { whiteKeys, blackKeys } = useNoteNameKeyMapLayout();

  const handleDeletePiano = () => {
    deletePiano(noteNumber);
  };

  return (
    <Box className={className} pt={5} pr={5} pl={5} height="auto">
      <Box position="relative">
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
      <Flex pt={3} pb={3} justify="center">
        <Button onClick={handleDeletePiano} mr={3}>
          削除
        </Button>
        <OpenChangePianoKeyMapForm
          noteNumber={noteNumber}
          changePianoHotKeys={changePianoHotKeys}
          getNoteNameKeyMap={getNoteNameKeyMap}
        />
      </Flex>
    </Box>
  );
};

export const Piano = chakra(Component);
