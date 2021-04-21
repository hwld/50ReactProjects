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
    <>
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
            w="450px"
            bg="red.800"
            layout
          />
        );
      })}
      <PianoDragLayer />
    </>
  );
};

export const PianoContainer = Component;
