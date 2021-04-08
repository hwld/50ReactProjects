import { Center } from "@chakra-ui/layout";
import { Box, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useEffect, useRef } from "react";
import { AddPianoForm } from "../components/AddPianoForm";
import { DeletePianoForm } from "../components/DeletePianoForm";
import { Piano } from "../components/Piano";
import { PianoHotKeys } from "../components/PianoHotKeys";
import { usePianos } from "../hooks/usePianos";
import { NoteNumber, PianoKeys } from "../utils";

const Home: NextPage = () => {
  const pianoRef = useRef<HTMLDivElement | null>(null);
  const [allPianos, dispatchToAllPianos] = usePianos([
    {
      noteNumber: 3,
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

  const addPiano = (noteNumber: NoteNumber, keys: PianoKeys) => {
    const isDuplicated = Boolean(
      allPianos.find((piano) => piano.noteNumber === noteNumber)
    );

    if (!isDuplicated) {
      dispatchToAllPianos({ type: "addPiano", noteNumber, keys });
    }
  };

  const deletePiano = (noteNumber: NoteNumber) => {
    dispatchToAllPianos({ type: "deletePiano", noteNumber });
  };

  useEffect(() => {
    pianoRef.current?.focus();
  }, []);

  return (
    <Box>
      <Center mt={10}>
        <PianoHotKeys pianos={allPianos} dispatchToPianos={dispatchToAllPianos}>
          <Flex
            ref={pianoRef}
            tabIndex={0}
            flexWrap="wrap"
            minW="1000px"
            maxW="1500px"
            justify="center"
            bg="gray.800"
            p={10}
          >
            {allPianos.map(({ noteNumber, pressedNoteNames }) => (
              <Piano
                mt={5}
                key={noteNumber}
                noteNumber={noteNumber}
                pressedNoteNames={pressedNoteNames}
              />
            ))}
          </Flex>
        </PianoHotKeys>
      </Center>

      <Flex p={10}>
        <AddPianoForm
          addPiano={addPiano}
          flexGrow={1}
          p={5}
          bg="gray.400"
          borderRight="1px solid"
          borderColor="gray.500"
        />
        <DeletePianoForm
          deletePiano={deletePiano}
          flexGrow={1}
          p={5}
          bg="gray.400"
        />
      </Flex>
    </Box>
  );
};

export default Home;
