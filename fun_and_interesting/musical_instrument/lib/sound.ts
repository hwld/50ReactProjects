import { Synth } from "tone";

export const ALL_NOTE_NAMES = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "A",
  "B",
  "C#",
  "D#",
  "E#",
  "G#",
  "A#",
] as const;
export type NoteName = typeof ALL_NOTE_NAMES[number];

const ALL_NOTE_NUMBERS = [
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
export type NoteNumber = typeof ALL_NOTE_NUMBERS[number];

export type Note = { noteName: NoteName; noteNumber: NoteNumber };

export const isNoteNumber = (arg: string): arg is NoteNumber => {
  //argを無理やりNoteNumberにしているが、NoteNumberではない可能性もある
  return ALL_NOTE_NUMBERS.includes(arg as NoteNumber);
};

export const playSound = ({ noteName, noteNumber }: Note): void => {
  new Synth()
    .toDestination()
    .triggerAttackRelease(`${noteName}${noteNumber}`, "8n");
};
