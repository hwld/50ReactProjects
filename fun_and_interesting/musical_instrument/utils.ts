import {
  ApplicationKeyMap,
  HotKeysProps,
  KeyMap,
  MouseTrapKeySequence,
} from "react-hotkeys";
import { Synth } from "tone";

export type NoteName =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "A#"
  | "C#"
  | "D#"
  | "E#"
  | "G#";
export type NoteNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type Note = `${NoteName}${NoteNumber}`;

export const stringToNoteNumber = (
  numberString: string
): NoteNumber | undefined => {
  const num = parseInt(numberString);
  if (0 <= num && 11 >= num) {
    return num as NoteNumber;
  }
};

export const toNote = (noteName: NoteName, noteNumber: NoteNumber): Note => {
  return `${noteName}${noteNumber}` as Note;
};

export type PianoKeys = { [T in NoteName]?: string };
export type PianoObj = {
  noteNumber: NoteNumber;
  keys: PianoKeys;
  pressedNoteNames: NoteName[];
};

type CreatePianoKeyMap = (piano: PianoObj) => KeyMap;

export const createPianoKeyMap: CreatePianoKeyMap = ({ noteNumber, keys }) => {
  const keyMaps: KeyMap = {};
  for (const noteName in keys) {
    const key = keys[noteName as NoteName] as string;
    keyMaps[`${noteName}${noteNumber}_KEYDOWN`] = {
      sequence: key,
      action: "keydown",
    };
    keyMaps[`${noteName}${noteNumber}_KEYUP`] = {
      sequence: key,
      action: "keyup",
    };
  }

  return keyMaps;
};

type CreatePianoKeyHandlers = (
  piano: PianoObj,
  setPianos: React.Dispatch<React.SetStateAction<PianoObj[]>>
) => HotKeysProps["handlers"];
export const createPianoKeyHandlers: CreatePianoKeyHandlers = (
  { noteNumber, keys },
  setPianos
) => {
  let handlers: HotKeysProps["handlers"] = {};
  for (const property in keys) {
    const noteName = property as NoteName;
    handlers = {
      ...handlers,
      [`${noteName}${noteNumber}_KEYDOWN`]: () => {
        new Synth()
          .toDestination()
          .triggerAttackRelease(`${noteName}${noteNumber}`, "8n");

        setPianos((pianos) => {
          return pianos.map((piano) => {
            if (piano.noteNumber !== noteNumber) {
              return piano;
            }
            return {
              ...piano,
              pressedNoteNames: [...piano.pressedNoteNames, noteName],
            };
          });
        });
      },

      [`${noteName}${noteNumber}_KEYUP`]: () => {
        setPianos((pianos) => {
          return pianos.map((piano) => {
            if (piano.noteNumber !== noteNumber) {
              return piano;
            }
            return {
              ...piano,
              pressedNoteNames: piano.pressedNoteNames.filter(
                (n) => n !== noteName
              ),
            };
          });
        });
      },
    };
  }
  return handlers;
};

export const getPianoKey = (
  keyMap: ApplicationKeyMap,
  note: Note
): string | undefined => {
  const sequence: MouseTrapKeySequence | undefined =
    keyMap[`${note}_KEYDOWN`]?.sequences[0].sequence;
  if (Array.isArray(sequence)) {
    return;
  }

  return sequence?.toUpperCase();
};
