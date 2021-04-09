import { Dispatch, useReducer } from "react";
import { NoteName, NoteNumber } from "../lib/sound";

export type PianoKeys = { [T in NoteName]?: string };
export type PianoObj = {
  noteNumber: NoteNumber;
  keys: PianoKeys;
  pressedNoteNames: NoteName[];
};

export type PianosAction =
  | {
      type: "addPiano";
      noteNumber: NoteNumber;
      keys: PianoKeys;
    }
  | { type: "deletePiano"; noteNumber: NoteNumber }
  | { type: "keyDown"; noteNumber: NoteNumber; key: NoteName }
  | { type: "keyUp"; noteNumber: NoteNumber; key: NoteName };

const reducer = (state: PianoObj[], action: PianosAction): PianoObj[] => {
  switch (action.type) {
    case "addPiano": {
      return [
        ...state,
        {
          noteNumber: action.noteNumber,
          keys: action.keys,
          pressedNoteNames: [],
        },
      ];
    }

    case "deletePiano": {
      return state.filter((s) => s.noteNumber !== action.noteNumber);
    }

    case "keyDown": {
      return state.map((piano) => {
        if (piano.noteNumber !== action.noteNumber) {
          return piano;
        }
        return {
          ...piano,
          pressedNoteNames: [...piano.pressedNoteNames, action.key],
        };
      });
    }

    case "keyUp": {
      return state.map((piano) => {
        if (piano.noteNumber !== action.noteNumber) {
          return piano;
        }
        return {
          ...piano,
          pressedNoteNames: piano.pressedNoteNames.filter(
            (n) => n !== action.key
          ),
        };
      });
    }
  }
};

export const usePianos = (
  initialPianos: PianoObj[]
): [PianoObj[], Dispatch<PianosAction>] => {
  return useReducer(reducer, initialPianos);
};
