import { Grid } from "@chakra-ui/react";
import React, { Dispatch, useCallback } from "react";
import { NoteNameKeyMap, PianosAction } from "../hooks/usePianos";
import { Piano as PianoObj } from "../hooks/usePianos";
import { Note, NoteNumber } from "../lib/sound";
import { Piano } from "./Piano";

type Props = {
  pianos: PianoObj[];
  dispatchToPianos: Dispatch<PianosAction>;
  playSound: ({ noteName, noteNumber }: Note) => void;
};

const Component: React.FC<Props> = React.memo(
  ({ pianos, dispatchToPianos, playSound }) => {
    const deletePiano = useCallback((noteNumber: NoteNumber) => {
      dispatchToPianos({ type: "deletePiano", noteNumber });
    }, []);

    const changePianoKeyMap = useCallback(
      (noteNumber: NoteNumber, keyMap: NoteNameKeyMap) => {
        dispatchToPianos({ type: "changePianoHotKeys", noteNumber, keyMap });
      },
      []
    );

    const movePiano = useCallback(
      (moveTargetIndex: number, baseIndex: number) => {
        dispatchToPianos({ type: "movePiano", moveTargetIndex, baseIndex });
      },
      []
    );

    return (
      <Grid
        justifyContent="center"
        templateColumns="repeat(auto-fill, 450px)"
        gap={3}
        bg="gray.800"
        p={5}
        tabIndex={0}
        _focus={{ outline: "none" }}
      >
        {pianos.map((piano, index) => {
          return (
            <Piano
              key={piano.noteNumber}
              index={index}
              noteNumber={piano.noteNumber}
              deletePiano={deletePiano}
              changePianoKeyMap={changePianoKeyMap}
              movePiano={movePiano}
              pressedNoteNames={piano.pressedNoteNames}
              playSound={playSound}
              m={1}
              bg="red.800"
              layout="position"
              transition={{ duration: 0.3 }}
            />
          );
        })}
      </Grid>
    );
  }
);

export const PianoContainer = Component;
