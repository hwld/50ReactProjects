import { Dispatch, useReducer } from "react";
import { ALL_NOTE_NAMES, NoteName, NoteNumber } from "../lib/sound";

export type PianoKeys = { [T in NoteName]: string };
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
  | { type: "changePianoHotKeys"; noteNumber: NoteNumber; keys: PianoKeys }
  | { type: "deletePiano"; noteNumber: NoteNumber }
  | { type: "keyDown"; noteNumber: NoteNumber; key: NoteName }
  | { type: "keyUp"; noteNumber: NoteNumber; key: NoteName }
  | { type: "resetPressed" };

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

    case "changePianoHotKeys": {
      return state.map((piano) => {
        if (piano.noteNumber !== action.noteNumber) {
          return piano;
        }
        return { ...piano, keys: action.keys };
      });
    }

    case "deletePiano": {
      return state.filter((piano) => piano.noteNumber !== action.noteNumber);
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

    case "resetPressed": {
      return state.map((piano) => {
        return { ...piano, pressedNoteNames: [] };
      });
    }
  }
};

export const usePianos = (
  initialPianos: PianoObj[]
): [PianoObj[], Dispatch<PianosAction>] => {
  return useReducer(reducer, initialPianos);
};

export const extractKeyNames = (hotKeys: PianoKeys): string[] => {
  const keys: string[] = [];
  for (const noteName in hotKeys) {
    const hotKey = hotKeys[noteName as NoteName];
    if (hotKey !== "") {
      keys.push(hotKey);
    }
  }
  return keys;
};

export const getDefaultPianoKeys = (): PianoKeys => {
  return ALL_NOTE_NAMES.reduce((keys, noteName): PianoKeys => {
    return { ...keys, [noteName]: "" };
  }, {} as PianoKeys);
};
