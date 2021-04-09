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
import { isNoteNumber, NoteNumber } from "../lib/sound";

type Props = {
  className?: string;
  deletePiano: (noteNumber: NoteNumber) => void;
};

const Component: React.FC<Props> = ({ className, deletePiano }) => {
  const [noteNumber, setNoteNumber] = useState<NoteNumber>("0");

  const handleChangeNoteNumber = (value: string) => {
    if (isNoteNumber(value)) {
      setNoteNumber(value);
    }
  };

  const handleClickDeletePianoButton = () => {
    deletePiano(noteNumber);
  };

  return (
    <Flex className={className} flexDir="column" align="center">
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
      <Button mt={10} onClick={handleClickDeletePianoButton}>
        キーボードを削除
      </Button>
    </Flex>
  );
};

export const DeletePianoForm = chakra(Component);
