import { Button, chakra, Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { NoteNumber } from "../lib/sound";
import { NoteNumberSelect } from "./NoteNumberSelect";

type Props = {
  className?: string;
  existingNoteNumbers: NoteNumber[];
  deletePiano: (noteNumber: NoteNumber) => void;
};

const Component: React.FC<Props> = ({
  className,
  existingNoteNumbers,
  deletePiano,
}) => {
  const [selectedNoteNumber, setSelectedNoteNumber] = useState<NoteNumber>("0");

  const handleChangeNoteNumber = (noteNumber: NoteNumber | undefined) => {
    if (noteNumber) {
      setSelectedNoteNumber(noteNumber);
    }
  };

  const handleClickDeletePianoButton = () => {
    deletePiano(selectedNoteNumber);
  };

  return (
    <Flex className={className} flexDir="column" align="center">
      <Heading size="xl">キーボードの削除</Heading>

      <Heading mt={3} size="md">
        Note Number
      </Heading>
      <NoteNumberSelect
        noteNumbers={existingNoteNumbers}
        selected={selectedNoteNumber}
        onChange={handleChangeNoteNumber}
        mt={1}
        bg="gray.100"
        w="100px"
      />

      <Button mt={10} w="80px" onClick={handleClickDeletePianoButton}>
        削除
      </Button>
    </Flex>
  );
};

export const DeletePianoForm = chakra(Component);
