import { chakra, Heading } from "@chakra-ui/react";
import React, { SyntheticEvent, useState } from "react";
import {
  useAllPianoHotKeyName,
  useNoteNameKeyMap,
} from "../context/PianosHotKeysContext";
import {
  extractKeyNames,
  getDefaultNoteNameKeyMap,
  NoteNameKeyMap,
} from "../hooks/usePianos";
import { NoteName, NoteNumber } from "../lib/sound";
import {
  isEmptyString,
  isKeyNotIncluded,
  isUniqueKey,
} from "../utils/validators";
import { PianoKeyMapEditor, ValidationRule } from "./PianoKeyMapEditor";

export type ChangePianoKeyMapFormProps = {
  className?: string;
  formId: string;
  noteNumber: NoteNumber;
  onSubmit: (keyMap: NoteNameKeyMap) => void;
};

const Component: React.FC<ChangePianoKeyMapFormProps> = ({
  className,
  formId,
  noteNumber,
  onSubmit,
}) => {
  const defaultKeyMap = useNoteNameKeyMap(noteNumber);
  const [keyMap, setKeyMap] = useState(
    defaultKeyMap ?? getDefaultNoteNameKeyMap()
  );
  const existingKeyNames = useAllPianoHotKeyName({
    excludingNoteNumber: noteNumber,
  });

  const keyMapValidationRules: ValidationRule[] = [
    {
      validate: (key: string) =>
        isEmptyString(key) || isKeyNotIncluded(existingKeyNames, key),
      errorMessage: "すでに設定されているキーです",
    },
    {
      validate: (key: string) =>
        isEmptyString(key) || isUniqueKey(extractKeyNames(keyMap), key),
      errorMessage: "設定しようとしているキーが重複しています",
    },
  ];

  const isKeyMapValid = extractKeyNames(keyMap).every((key) =>
    keyMapValidationRules.every(({ validate }) => validate(key))
  );

  const handleChangeHotKeys = (noteName: NoteName, hotKey: string) => {
    setKeyMap((keyMap) => {
      return { ...keyMap, [noteName]: hotKey };
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isKeyMapValid) {
      onSubmit(keyMap);
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit} id={formId}>
      <Heading size="md">Hot Keys</Heading>
      <PianoKeyMapEditor
        mt={3}
        noteNumber={noteNumber}
        keyMap={keyMap}
        onChange={handleChangeHotKeys}
        validationRules={keyMapValidationRules}
      />
    </form>
  );
};

export const ChangePianoKeyMapForm = chakra(Component);
