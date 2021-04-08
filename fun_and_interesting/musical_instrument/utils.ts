import { ApplicationKeyMap, MouseTrapKeySequence } from "react-hotkeys";

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
