import { Center } from "@chakra-ui/layout";
import { Box, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useMemo } from "react";
import { AddPianoForm } from "../components/AddPianoForm";
import { ChangePianoHotKeyForm } from "../components/ChangePianoHotKeyForm";
import { DeletePianoForm } from "../components/DeletePianoForm";
import { Piano } from "../components/Piano";
import { PianosHotKeysProvider } from "../context/PianosHotKeysContext";
import { getDefaultPianoKeys, PianoKeys, usePianos } from "../hooks/usePianos";
import { ALL_NOTE_NUMBERS, NoteNumber, playSound } from "../lib/sound";

const Home: NextPage = () => {
  const [allPianos, dispatchToAllPianos] = usePianos([
    {
      noteNumber: "3",
      keys: {
        C: "a",
        D: "s",
        E: "d",
        F: "f",
        G: "g",
        A: "h",
        B: "j",
        "C#": "k",
        "D#": "l",
        "E#": ";",
        "G#": ":",
        "A#": "]",
      },
      pressedNoteNames: [],
    },
  ]);

  const existingNoteNumber = useMemo(() => {
    return allPianos.map(({ noteNumber }) => noteNumber);
  }, [allPianos]);

  const nonExistentNoteNumber = useMemo(() => {
    return ALL_NOTE_NUMBERS.filter(
      (number) =>
        !allPianos.map(({ noteNumber }) => noteNumber).includes(number)
    );
  }, [allPianos]);

  const getPianoKeys = (noteNumber: NoteNumber) => {
    const piano = allPianos.find((piano) => piano.noteNumber === noteNumber);
    if (!piano) {
      return getDefaultPianoKeys();
    }

    return piano.keys;
  };

  const addPiano = (noteNumber: NoteNumber, keys: PianoKeys) => {
    const isDuplicated = Boolean(
      allPianos.find((piano) => piano.noteNumber === noteNumber)
    );

    if (!isDuplicated) {
      dispatchToAllPianos({ type: "addPiano", noteNumber, keys });
    }
  };

  const changePianoHotKeys = (noteNumber: NoteNumber, keys: PianoKeys) => {
    dispatchToAllPianos({ type: "changePianoHotKeys", noteNumber, keys });
  };

  const deletePiano = (noteNumber: NoteNumber) => {
    dispatchToAllPianos({ type: "deletePiano", noteNumber });
  };

  return (
    <PianosHotKeysProvider
      pianos={allPianos}
      dispatchToPianos={dispatchToAllPianos}
      playSound={playSound}
      role="group"
      _focus={{ outline: "none" }}
      // マージンの相殺が起こらないようにする
      pt={1}
    >
      <Box>
        <Center mt={5}>
          <Flex
            flexWrap="wrap"
            w="90%"
            justify="center"
            bg="gray.800"
            p={5}
            tabIndex={0}
            opacity={0.3}
            _groupFocus={{ opacity: 1, outline: "none" }}
            _focus={{ opacity: 1, outline: "none" }}
            _focusWithin={{ opacity: 1, outline: "none" }}
          >
            {allPianos.map(({ noteNumber, pressedNoteNames }, index) => (
              <Piano
                key={noteNumber}
                noteNumber={noteNumber}
                pressedNoteNames={pressedNoteNames}
                playSound={playSound}
                mt={5}
                ml={index === 0 ? 0 : 3}
              />
            ))}
          </Flex>
        </Center>

        <Flex p={10}>
          <AddPianoForm
            nonExistentNoteNumbers={nonExistentNoteNumber}
            addPiano={addPiano}
            flexGrow={1}
            p={5}
            bg="gray.400"
            borderRight="1px solid"
            borderColor="gray.500"
          />

          <ChangePianoHotKeyForm
            existingNoteNumbers={existingNoteNumber}
            getPianoKeys={getPianoKeys}
            changePianoHotKeys={changePianoHotKeys}
            flexGrow={1}
            p={5}
            bg="gray.400"
            borderRight="1px solid"
            borderColor="gray.500"
          />
          <DeletePianoForm
            existingNoteNumbers={existingNoteNumber}
            deletePiano={deletePiano}
            flexGrow={1}
            p={5}
            bg="gray.400"
          />
        </Flex>
      </Box>
    </PianosHotKeysProvider>
  );
};

export default Home;
