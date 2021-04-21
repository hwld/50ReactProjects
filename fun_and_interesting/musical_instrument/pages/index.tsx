import { Box, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useCallback, useMemo } from "react";
import { OpenAddPianoFormButton } from "../components/OpenAddPianoFormButton";
import { PianoContainer } from "../components/PianoContainer";
import { PianosHotkeys } from "../components/PianosHotkeys";
import { PianosHotKeysProvider } from "../context/PianosHotKeysContext";
import { NoteNameKeyMap, usePianos } from "../hooks/usePianos";
import { ALL_NOTE_NUMBERS, NoteNumber, playSound } from "../lib/sound";

const Home: NextPage = () => {
  const [allPianos, dispatchToAllPianos] = usePianos([
    {
      noteNumber: "3",
      keyMap: {
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

  const nonExistentNoteNumber = useMemo(() => {
    return ALL_NOTE_NUMBERS.filter(
      (number) =>
        !allPianos.map(({ noteNumber }) => noteNumber).includes(number)
    );
  }, [allPianos]);

  const addPiano = useCallback(
    (noteNumber: NoteNumber, keyMap: NoteNameKeyMap) => {
      const isDuplicated = Boolean(
        allPianos.find((piano) => piano.noteNumber === noteNumber)
      );

      if (!isDuplicated) {
        dispatchToAllPianos({ type: "addPiano", noteNumber, keyMap });
      }
    },
    [allPianos]
  );

  return (
    <PianosHotKeysProvider pianos={allPianos}>
      <Flex h="100vh">
        <Box p={5} minH="100%" bg="red.800">
          <OpenAddPianoFormButton
            addPiano={addPiano}
            nonExistentNoteNumbers={nonExistentNoteNumber}
          />
        </Box>

        <PianosHotkeys
          pianos={allPianos}
          dispatchToPianos={dispatchToAllPianos}
          playSound={playSound}
          _focus={{ outline: "none" }}
          flexGrow={1}
          overflow="auto"
        >
          <Flex
            justify="center"
            align="start"
            flexWrap="wrap"
            bg="gray.800"
            p={5}
            tabIndex={0}
            _focus={{ outline: "none" }}
          >
            <PianoContainer
              pianos={allPianos}
              dispatchToPianos={dispatchToAllPianos}
              playSound={playSound}
            />
          </Flex>
        </PianosHotkeys>
      </Flex>
    </PianosHotKeysProvider>
  );
};

export default Home;
