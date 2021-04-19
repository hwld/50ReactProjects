import { Button, chakra, Flex, Heading, Text } from "@chakra-ui/react";
import React, { SyntheticEvent, useState } from "react";
import { useAllPianoHotKeyName } from "../context/PianosHotKeysContext";
import { extractKeyNames, NoteNameKeyMap } from "../hooks/usePianos";
import { NoteName, NoteNumber } from "../lib/sound";
import { NoteNumberSelect } from "./NoteNumberSelect";
import { PianoKeyMapEditor, ValidationRule } from "./PianoKeyMapEditor";

type Props = {
  className?: string;
  formId: string;
  noteNumber: NoteNumber;
  getNoteNameKeyMap: (noteNumber: NoteNumber) => NoteNameKeyMap;
  onSubmit: (noteNumber: NoteNumber, keyMap: NoteNameKeyMap) => void;
};

const Component: React.FC<Props> = ({
  className,
  formId,
  noteNumber,
  getNoteNameKeyMap,
  onSubmit,
}) => {
  const [keyMap, setKeyMap] = useState(getNoteNameKeyMap(noteNumber));
  const existingKeyNames = useAllPianoHotKeyName({
    excludingNoteNumber: noteNumber,
  });

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

  const handleChangeHotKeys = (noteName: NoteName, hotKey: string) => {
    setKeyMap((keyMap) => {
      return { ...keyMap, [noteName]: hotKey };
    });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isKeyMapValid) {
      onSubmit(noteNumber, keyMap);
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
        validationRules={validationRules}
      />
    </form>
  );
};

export const ChangePianoKeyMapForm = chakra(Component);
