import { Dispatch, useReducer } from "react";
import { ALL_NOTE_NAMES, isNoteName, NoteName, NoteNumber } from "../lib/sound";

export type NoteNameKeyMap = { [T in NoteName]: string };
export type Piano = {
  noteNumber: NoteNumber;
  keyMap: NoteNameKeyMap;
  pressedNoteNames: NoteName[];
};

export type PianosAction =
  | {
      type: "addPiano";
      noteNumber: NoteNumber;
      keyMap: NoteNameKeyMap;
    }
  | {
      type: "changePianoHotKeys";
      noteNumber: NoteNumber;
      keyMap: NoteNameKeyMap;
    }
  | { type: "deletePiano"; noteNumber: NoteNumber }
  | { type: "keyDown"; noteNumber: NoteNumber; key: NoteName }
  | { type: "keyUp"; noteNumber: NoteNumber; key: NoteName }
  | { type: "resetPressed" };

export const extractKeyNames = (keyMap: NoteNameKeyMap): string[] => {
  const keyNames: string[] = [];
  for (const noteName in keyMap) {
    if (!isNoteName(noteName)) {
      continue;
    }
    const hotKey = keyMap[noteName];
    if (hotKey !== "") {
      keyNames.push(hotKey);
    }
  }
  return keyNames;
};

export const getDefaultNoteNameKeyMap = (): NoteNameKeyMap => {
  return ALL_NOTE_NAMES.reduce((keyMap, noteName): NoteNameKeyMap => {
    return { ...keyMap, [noteName]: "" };
  }, {} as NoteNameKeyMap);
};

const reducer = (state: Piano[], action: PianosAction): Piano[] => {
  switch (action.type) {
    case "addPiano": {
      return [
        ...state,
        {
          noteNumber: action.noteNumber,
          keyMap: action.keyMap,
          pressedNoteNames: [],
        },
      ];
    }

    case "changePianoHotKeys": {
      return state.map((piano) => {
        if (piano.noteNumber !== action.noteNumber) {
          return piano;
        }
        return { ...piano, keyMap: action.keyMap };
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
  initialPianos: Piano[]
): [Piano[], Dispatch<PianosAction>] => {
  return useReducer(reducer, initialPianos);
};
