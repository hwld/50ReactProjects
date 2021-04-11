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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { PianoKeys } from "../hooks/usePianos";
import { isNoteNumber, NoteName, NoteNumber } from "../lib/sound";
import { EditPianoHotKey } from "./EditPianoHotKey";

type Props = {
  className?: string;
  addPiano: (noteNumber: NoteNumber, keys: PianoKeys) => void;
};

const Component: React.FC<Props> = ({ className, addPiano }) => {
  const [noteNumber, setNoteNumber] = useState<NoteNumber>("0");
  const [hotKeys, setHotKeys] = useState<PianoKeys>({});

  const changeHotKeys = (noteName: NoteName, hotKey: string) => {
    setHotKeys((keys) => {
      if (hotKey === "") {
        const tmp = { ...keys };
        delete tmp[noteName];
        return tmp;
      }
      return { ...keys, [noteName]: hotKey };
    });
  };

  const handleChangeNoteNumber = (value: string) => {
    if (isNoteNumber(value)) {
      setNoteNumber(value);
    }
  };

  const handleClickAddPianoButton = () => {
    addPiano(noteNumber, hotKeys);
  };

  return (
    <Flex className={className} flexDir="column" align="center">
      <Heading size="md">Hot Keys</Heading>
      <EditPianoHotKey
        mt={3}
        hotKeys={hotKeys}
        onChange={changeHotKeys}
        noteNumber={noteNumber}
      />
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
