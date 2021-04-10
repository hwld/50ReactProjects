import { Button, chakra, Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { PianoObj } from "../hooks/usePianos";
import { NoteNumber } from "../lib/sound";
import { NoteNumberSelect } from "./NoteNumberSelect";

type Props = {
  className?: string;
  pianos: PianoObj[];
  deletePiano: (noteNumber: NoteNumber) => void;
};

const Component: React.FC<Props> = ({ className, pianos, deletePiano }) => {
  // 選択されていない状態も持たせる
  const [selectedNoteNumber, setSelectedNoteNumber] = useState<
    NoteNumber | undefined
  >(undefined);

  const handleChangeNoteNumber = (noteNumber: NoteNumber | undefined) => {
    setSelectedNoteNumber(noteNumber);
  };

  const handleClickDeletePianoButton = () => {
    if (selectedNoteNumber !== undefined) {
      deletePiano(selectedNoteNumber);
    }
  };

  return (
    <Flex className={className} flexDir="column" align="center">
      <Heading mt={5} size="md">
        Note Number
      </Heading>
      <NoteNumberSelect
        noteNumbers={pianos.map((p) => p.noteNumber)}
        selected={selectedNoteNumber}
        onChange={handleChangeNoteNumber}
        mt={1}
        bg="gray.100"
        w="100px"
      />
      <Button
        mt={10}
        onClick={handleClickDeletePianoButton}
        disabled={selectedNoteNumber === undefined}
      >
        キーボードを削除
      </Button>
    </Flex>
  );
};

export const DeletePianoForm = chakra(Component);
