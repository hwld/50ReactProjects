import { chakra, Heading, Text } from "@chakra-ui/react";
import React, { SyntheticEvent, useState } from "react";
import { useAllPianoHotKeyName } from "../context/PianosHotKeysContext";
import {
  extractKeyNames,
  getDefaultNoteNameKeyMap,
  NoteNameKeyMap,
} from "../hooks/usePianos";
import { NoteName, NoteNumber } from "../lib/sound";
import { NoteNumberSelect } from "./NoteNumberSelect";
import { PianoKeyMapEditor, ValidationRule } from "./PianoKeyMapEditor";

export type AddPianoFormProps = {
  className?: string;
  formId: string;
  nonExistentNoteNumbers: readonly NoteNumber[];
  onSubmit: (noteNumber: NoteNumber, keyMap: NoteNameKeyMap) => void;
};

const Component: React.FC<AddPianoFormProps> = ({
  className,
  formId,
  nonExistentNoteNumbers,
  onSubmit,
}) => {
  const [noteNumber, setNoteNumber] = useState<NoteNumber>("0");
  const [keyMap, setKeyMap] = useState(getDefaultNoteNameKeyMap());
  const existingKeyNames = useAllPianoHotKeyName();

  const validationRules: ValidationRule[] = [
    {
      validate: (key: string) => {
        if (key === "") {
          return true;
        }

        return !existingKeyNames.includes(key);
      },
      errorMessage: "すでに設定されているキーです",
    },
    {
      validate: (key: string) => {
        if (key === "") {
          return true;
        }

        return (
          extractKeyNames(keyMap).filter((edittingKey) => edittingKey === key)
            .length === 1
        );
      },
      errorMessage: "設定しようとしているキーが重複しています",
    },
  ];

  const isKeyMapValid = extractKeyNames(keyMap).every((key) =>
    validationRules.every(({ validate }) => validate(key))
  );

  const isNoteNumberValid = nonExistentNoteNumbers.length !== 0;

  const handleChangeHotKeys = (noteName: NoteName, hotKey: string) => {
    setKeyMap((keyMap) => {
      return { ...keyMap, [noteName]: hotKey };
    });
  };

  const handleChangeNoteNumber = (noteNumber: NoteNumber | undefined) => {
    if (noteNumber) {
      setNoteNumber(noteNumber);
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isKeyMapValid && isNoteNumberValid) {
      onSubmit(noteNumber, keyMap);
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit} id={formId}>
      {isNoteNumberValid ? (
        <>
          <Heading mt={3} size="md">
            Hot Keys
          </Heading>
          <PianoKeyMapEditor
            mt={3}
            noteNumber={noteNumber}
            keyMap={keyMap}
            onChange={handleChangeHotKeys}
            validationRules={validationRules}
          />

          <Heading mt={5} size="md">
            Note Number
          </Heading>
          <NoteNumberSelect
            selected={noteNumber}
            noteNumbers={nonExistentNoteNumbers}
            onChange={handleChangeNoteNumber}
            mt={3}
            w="100px"
            maxW="100px"
            bg="gray.100"
          />
        </>
      ) : (
        <Text>追加できるNoteNumberが存在しません</Text>
      )}
    </form>
  );
};

export const AddPianoForm = chakra(Component);
