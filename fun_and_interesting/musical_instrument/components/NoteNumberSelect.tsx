import { chakra, Select } from "@chakra-ui/react";
import React, { ChangeEventHandler, useEffect } from "react";
import { ALL_NOTE_NUMBERS, isNoteNumber, NoteNumber } from "../lib/sound";

type Props = {
  className?: string;
  noteNumbers?: readonly NoteNumber[];
  // 何も選択されていない状態をundefinedとして受け入れる
  selected: NoteNumber | undefined;
  onChange?: (noteNumber: NoteNumber | undefined) => void;
};

const Component: React.FC<Props> = ({
  className,
  noteNumbers = ALL_NOTE_NUMBERS,
  selected,
  onChange = () => {},
}) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    if (isNoteNumber(value)) {
      onChange(value);
    }
  };

  // 動的な選択要素に対応
  useEffect(() => {
    if (noteNumbers.length === 0) {
      // 選択可能な要素が0になったらundefinedを渡す
      onChange(undefined);
    } else if (selected === undefined || !noteNumbers.includes(selected)) {
      //　選択している要素がなければ、先頭の要素を渡す
      onChange(noteNumbers[0]);
    }
  }, [noteNumbers, selected]);

  return (
    <Select
      className={className}
      rootProps={{ w: "auto" }}
      value={selected}
      onChange={handleChange}
      disabled={noteNumbers.length === 0}
    >
      {noteNumbers.map((num) => (
        <option key={num}>{num}</option>
      ))}
    </Select>
  );
};

export const NoteNumberSelect = chakra(Component);
