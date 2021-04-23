import { Box, Button, chakra, Flex } from "@chakra-ui/react";
import React, { forwardRef, useCallback } from "react";
import { PianoKeyMap } from "../context/PianosHotKeysContext";
import { useNoteNameKeyMapLayout } from "../hooks/usePianoKeysLayout";
import { NoteNameKeyMap } from "../hooks/usePianos";
import { Note, NoteName, NoteNumber } from "../lib/sound";
import { OpenChangePianoKeyMapFormButton } from "./OpenChangePianoKeyMapFormButton";
import { PianoHotKeyIcon } from "./PianoHotKeyIcon";
import { PianoKey } from "./PianoKey";

type Props = {
  className?: string;
  noteNumber: NoteNumber;
  pianoKeyMap: PianoKeyMap | undefined;
  pressedNoteNames?: NoteName[];
  playSound?: (note: Note) => void;
  deletePiano?: () => void;
  changePianoKeyMap?: (keyMap: NoteNameKeyMap) => void;
};

const Component = React.memo(
  forwardRef<HTMLDivElement, Props>(
    (
      {
        className,
        noteNumber,
        pianoKeyMap,
        pressedNoteNames = [],
        playSound = () => {},
        deletePiano = () => {},
        changePianoKeyMap = () => {},
      },
      ref
    ) => {
      const { whiteKeys, blackKeys } = useNoteNameKeyMapLayout();

      const handlePressNote = useCallback(
        (note: Note) => {
          playSound(note);
        },
        [playSound]
      );

      return (
        <Box
          ref={ref}
          className={className}
          pt={5}
          pr={5}
          pl={5}
          height="auto"
          minW="450px"
        >
          <Box position="relative">
            <Flex>
              {whiteKeys.map(
                ({ noteName, whiteKeyWidth, whiteKeyMarginRight }) => {
                  return (
                    <PianoKey
                      key={noteName}
                      onPressNote={handlePressNote}
                      noteName={noteName}
                      noteNumber={noteNumber}
                      pressed={pressedNoteNames.includes(noteName)}
                      _active={{ bg: "yellow.300" }}
                      mr={whiteKeyMarginRight}
                      w={whiteKeyWidth}
                      h="250px"
                      bg="gray.100"
                    >
                      <PianoHotKeyIcon
                        keyName={pianoKeyMap?.[noteName] ?? ""}
                      />
                    </PianoKey>
                  );
                }
              )}
              {blackKeys.map(({ noteName, left, blackKeyWidth }) => {
                return (
                  <PianoKey
                    key={noteName}
                    onPressNote={handlePressNote}
                    noteName={noteName}
                    noteNumber={noteNumber}
                    pressed={pressedNoteNames.includes(noteName)}
                    _active={{ bg: "red.500" }}
                    position="absolute"
                    left={left}
                    w={blackKeyWidth}
                    h="160px"
                    bg="gray.800"
                    noteTextStyle={{ color: "gray.50" }}
                  >
                    <PianoHotKeyIcon keyName={pianoKeyMap?.[noteName] ?? ""} />
                  </PianoKey>
                );
              })}
            </Flex>
          </Box>
          <Flex pt={3} pb={3} justify="center">
            <Button onClick={deletePiano} mr={3}>
              削除
            </Button>
            <OpenChangePianoKeyMapFormButton
              noteNumber={noteNumber}
              changePianoKeyMap={changePianoKeyMap}
            />
          </Flex>
        </Box>
      );
    }
  )
);

export const PianoView = chakra(Component);
