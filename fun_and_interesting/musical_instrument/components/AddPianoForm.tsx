import { Button, chakra, Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { PianoKeys } from "../hooks/usePianos";
import { NoteName, NoteNumber } from "../lib/sound";
import { NoteNumberSelect } from "./NoteNumberSelect";
import { PianoHotKeyEditor } from "./PianoHotKeyEditor";

type Props = {
  className?: string;
  addPiano: (noteNumber: NoteNumber, keys: PianoKeys) => void;
};

const Component: React.FC<Props> = ({ className, addPiano }) => {
  const [noteNumber, setNoteNumber] = useState<NoteNumber>("0");
  const [hotKeys, setHotKeys] = useState<PianoKeys>({
    "A#": "",
    "C#": "",
    "D#": "",
    "E#": "",
    "G#": "",
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
    F: "",
    G: "",
  });

  const changeHotKeys = (noteName: NoteName, hotKey: string) => {
    setHotKeys((keys) => {
      return { ...keys, [noteName]: hotKey };
    });
  };

  const handleChangeNoteNumber = (noteNumber: NoteNumber | undefined) => {
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
      <PianoHotKeyEditor
        mt={3}
        noteNumber={noteNumber}
        hotKeys={hotKeys}
        onChange={changeHotKeys}
      />
      <Heading mt={5} size="md">
        Note Number
      </Heading>
      <NoteNumberSelect
        selected={noteNumber}
        onChange={handleChangeNoteNumber}
        mt={1}
        w="100px"
        bg="gray.100"
      />
      <Button mt={5} onClick={handleClickAddPianoButton}>
        キーボードを追加
      </Button>
    </Flex>
  );
};

export const AddPianoForm = chakra(Component);
