import React, { Dispatch } from "react";
import { NoteNameKeyMap, PianosAction } from "../hooks/usePianos";
import { Piano as PianoObj } from "../hooks/usePianos";
import { Note } from "../lib/sound";
import { Piano, PianoProps } from "./Piano";

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
    Pick<PianoProps, "deletePiano" | "changePianoKeyMap">)[] = pianos.map(
    (piano) => ({
      ...piano,
      deletePiano: () => {
        dispatchToPianos({
          type: "deletePiano",
          noteNumber: piano.noteNumber,
        });
      },
      changePianoKeyMap: (keyMap: NoteNameKeyMap) => {
        dispatchToPianos({
          type: "changePianoHotKeys",
          noteNumber: piano.noteNumber,
          keyMap,
        });
      },
    })
  );

  return (
    <>
      {pianosForRender.map(
        ({ noteNumber, pressedNoteNames, deletePiano, changePianoKeyMap }) => {
          return (
            <Piano
              key={noteNumber}
              noteNumber={noteNumber}
              deletePiano={deletePiano}
              changePianoKeyMap={changePianoKeyMap}
              pressedNoteNames={pressedNoteNames}
              playSound={playSound}
              m={1}
              bg="red.800"
            />
          );
        }
      )}
    </>
  );
};

export const PianoContainer = Component;
