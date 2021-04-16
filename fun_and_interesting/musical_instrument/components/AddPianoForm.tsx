import { Button, chakra, Flex, Heading } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { useAllPianoHotKeyName } from "../context/PianosHotKeysContext";
import {
  extractKeyNames,
  getDefaultPianoKeys,
  PianoKeys,
} from "../hooks/usePianos";
import { NoteName, NoteNumber } from "../lib/sound";
import { NoteNumberSelect } from "./NoteNumberSelect";
import { PianoHotKeyEditor, ValidationRule } from "./PianoHotKeyEditor";

type Props = {
  className?: string;
  nonExistentNoteNumbers: readonly NoteNumber[];
  addPiano: (noteNumber: NoteNumber, keys: PianoKeys) => void;
};

const Component: React.FC<Props> = ({
  className,
  nonExistentNoteNumbers,
  addPiano,
}) => {
  const [noteNumber, setNoteNumber] = useState<NoteNumber>("0");
  const [hotKeys, setHotKeys] = useState(getDefaultPianoKeys());
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
          extractKeyNames(hotKeys).filter((edittingKey) => edittingKey === key)
            .length === 1
        );
      },
      errorMessage: "設定しようとしているキーが重複しています",
    },
  ];

  const isValid = useMemo(() => {
    return extractKeyNames(hotKeys).every((key) =>
      validationRules.every(({ validate }) => validate(key))
    );
  }, [hotKeys, validationRules]);

  const handleChangeHotKeys = (noteName: NoteName, hotKey: string) => {
    setHotKeys((keys) => {
      return { ...keys, [noteName]: hotKey };
    });
  };

  const handleChangeNoteNumber = (noteNumber: NoteNumber | undefined) => {
    if (noteNumber) {
      setNoteNumber(noteNumber);
    }
  };

  const handleClickAddPianoButton = () => {
    addPiano(noteNumber, hotKeys);
    setHotKeys(getDefaultPianoKeys());
  };

  return (
    <Flex className={className} flexDir="column" align="center">
      <Heading size="xl">キーボードの追加</Heading>

      <Heading mt={3} size="md">
        Hot Keys
      </Heading>
      <PianoHotKeyEditor
        mt={3}
        noteNumber={noteNumber}
        hotKeys={hotKeys}
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
        mt={1}
        w="100px"
        bg="gray.100"
      />
      <Button
        mt={10}
        w="80px"
        onClick={handleClickAddPianoButton}
        disabled={!isValid}
      >
        追加
      </Button>
    </Flex>
  );
};

export const AddPianoForm = chakra(Component);
