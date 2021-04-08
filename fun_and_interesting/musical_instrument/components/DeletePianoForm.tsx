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
import { NoteNumber, stringToNoteNumber } from "../utils";

type Props = {
  className?: string;
  deletePiano: (noteNumber: NoteNumber) => void;
};

const Component: React.FC<Props> = ({ className, deletePiano }) => {
  const [noteNumber, setNoteNumber] = useState<NoteNumber>(0);

  const handleChangeNoteNumber: UseCounterProps["onChange"] = (value) => {
    const noteNumber = stringToNoteNumber(value);
    if (noteNumber !== undefined) {
      setNoteNumber(noteNumber);
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
