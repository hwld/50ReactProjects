import { Synth } from "tone";

export const ALL_WHITE_NOTE_NAMES = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
] as const;

export const ALL_BLACK_NOTE_NAMES = ["C#", "D#", "E#", "G#", "A#"] as const;

export const ALL_NOTE_NAMES = [
  ...ALL_BLACK_NOTE_NAMES,
  ...ALL_WHITE_NOTE_NAMES,
] as const;

export const ALL_NOTE_NUMBERS = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
] as const;

export type NoteName = typeof ALL_NOTE_NAMES[number];
export type NoteNumber = typeof ALL_NOTE_NUMBERS[number];
export type Note = { noteName: NoteName; noteNumber: NoteNumber };

export const isNoteName = (arg: unknown): arg is NoteName => {
  return ALL_NOTE_NAMES.includes(arg as NoteName);
};

export const isNoteNumber = (arg: unknown): arg is NoteNumber => {
  return ALL_NOTE_NUMBERS.includes(arg as NoteNumber);
};

export const playSound = ({ noteName, noteNumber }: Note): void => {
  new Synth()
    .toDestination()
    .triggerAttackRelease(`${noteName}${noteNumber}`, "8n");
};
