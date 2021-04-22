import { Grid } from "@chakra-ui/react";
import React, { Dispatch } from "react";
import { PianosAction } from "../hooks/usePianos";
import { Piano as PianoObj } from "../hooks/usePianos";
import { Note } from "../lib/sound";
import { Piano, PianoProps } from "./Piano";
import { PianoDragLayer } from "./PianoDragLayer";

type Props = {
  pianos: PianoObj[];
  dispatchToPianos: Dispatch<PianosAction>;
  playSound: ({ noteName, noteNumber }: Note) => void;
};

const Component: React.FC<Props> = ({
  pianos,
  dispatchToPianos,
  playSound,
}) => {
  // mapの中でこれらの関数を定義することもできたが、メモ化しやすくするために分離させた
  const pianosForRender: (PianoObj &
    Pick<
      PianoProps,
      "deletePiano" | "changePianoKeyMap" | "movePiano"
    >)[] = pianos.map((piano) => ({
    ...piano,
    deletePiano: () => {
      dispatchToPianos({
        type: "deletePiano",
        noteNumber: piano.noteNumber,
      });
    },
    changePianoKeyMap: (keyMap) => {
      dispatchToPianos({
        type: "changePianoHotKeys",
        noteNumber: piano.noteNumber,
        keyMap,
      });
    },
    movePiano: (moveTargetIndex, baseIndex) => {
      dispatchToPianos({ type: "movePiano", moveTargetIndex, baseIndex });
    },
  }));

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
      {pianosForRender.map((piano, index) => {
        return (
          <Piano
            key={piano.noteNumber}
            index={index}
            noteNumber={piano.noteNumber}
            deletePiano={piano.deletePiano}
            changePianoKeyMap={piano.changePianoKeyMap}
            movePiano={piano.movePiano}
            pressedNoteNames={piano.pressedNoteNames}
            playSound={playSound}
            m={1}
            bg="red.800"
            layout="position"
            transition={{ duration: 0.3 }}
          />
        );
      })}
      <PianoDragLayer />
    </Grid>
  );
};

export const PianoContainer = Component;
