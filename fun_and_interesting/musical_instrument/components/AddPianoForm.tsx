import {
  Button,
  chakra,
  Flex,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  UseCounterProps,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { NoteName, NoteNumber, PianoKeys, stringToNoteNumber } from "../utils";
import { PianoHotKeyEdit } from "./PianoHotKeyEdit";

type Props = {
  className?: string;
  addPiano: (noteNumber: NoteNumber, keys: PianoKeys) => void;
};

const Component: React.FC<Props> = ({ className, addPiano }) => {
  const [noteNumber, setNoteNumber] = useState<NoteNumber>(0);
  const [hotKeys, setHotKeys] = useState<PianoKeys>({});

  const changeHotKeys = (noteName: NoteName, key: string) => {
    setHotKeys((keys) => {
      if (key === "") {
        const tmp = { ...keys };
        delete tmp[noteName];
        return tmp;
      }
      return { ...keys, [noteName]: key };
    });
  };

  const handleChangeNoteNumber: UseCounterProps["onChange"] = (value) => {
    const noteNumber = stringToNoteNumber(value);
    if (noteNumber !== undefined) {
      setNoteNumber(noteNumber);
    }
  };

  const handleClickAddPianoButton = () => {
    addPiano(noteNumber, hotKeys);
  };

  return (
    <Flex className={className} flexDir="column" align="center">
      <Heading size="md">Hot Keys</Heading>
      <PianoHotKeyEdit mt={1} onChange={changeHotKeys} />
      <Heading mt={5} size="md">
        Note Number
      </Heading>
      <NumberInput
        mt={1}
        bg="gray.100"
        w="100px"
        value={noteNumber}
        onChange={handleChangeNoteNumber}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button mt={10} onClick={handleClickAddPianoButton}>
        キーボードを追加
      </Button>
    </Flex>
  );
};

export const AddPianoForm = chakra(Component);
