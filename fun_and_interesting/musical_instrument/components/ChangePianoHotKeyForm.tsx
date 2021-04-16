import { Button, chakra, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { getDefaultPianoKeys, PianoKeys } from "../hooks/usePianos";
import { NoteName, NoteNumber } from "../lib/sound";
import { NoteNumberSelect } from "./NoteNumberSelect";
import { PianoHotKeyEditor } from "./PianoHotKeyEditor";

type Props = {
  className?: string;
  existingNoteNumbers: NoteNumber[];
  changePianoHotKeys: (noteNumber: NoteNumber, keys: PianoKeys) => void;
};

const Component: React.FC<Props> = ({
  className,
  existingNoteNumbers,
  changePianoHotKeys,
}) => {
  const [noteNumber, setNoteNumber] = useState<NoteNumber>(
    existingNoteNumbers[0]
  );
  const [hotKeys, setHotKeys] = useState(getDefaultPianoKeys());

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

  const handleChangeHotKeysButton = () => {
    changePianoHotKeys(noteNumber, hotKeys);
  };

  return (
    <Flex className={className} flexDir="column" align="center">
      <Heading mb={3} size="xl">
        HotKeysの変更
      </Heading>

      {existingNoteNumbers.length === 0 ? (
        <Text>変更するキーボードが存在しません</Text>
      ) : (
        <>
          <Heading size="md">Hot Keys</Heading>
          <PianoHotKeyEditor
            mt={3}
            noteNumber={noteNumber}
            hotKeys={hotKeys}
            onChange={handleChangeHotKeys}
          />

          <Heading mt={5} size="md">
            Note Number
          </Heading>
          <NoteNumberSelect
            selected={noteNumber}
            noteNumbers={existingNoteNumbers}
            onChange={handleChangeNoteNumber}
            mt={1}
            w="100px"
            bg="gray.100"
          />
          <Button mt={10} w="80px" onClick={handleChangeHotKeysButton}>
            変更
          </Button>
        </>
      )}
    </Flex>
  );
};

export const ChangePianoHotKeyForm = chakra(Component);
