import { Center } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useState } from "react";
import { GlobalHotKeys, KeyMap } from "react-hotkeys";
import { Piano } from "../components/Piano";
import { createPianoKeyMap, PianoObj } from "../utils";

const Home: NextPage = () => {
  const [pianos] = useState<PianoObj[]>([
    {
      noteNumber: 2,
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
    },
    {
      noteNumber: 3,
      keys: {
        C: "q",
        D: "w",
        E: "e",
        F: "r",
        G: "t",
        A: "y",
        B: "u",
        "C#": "i",
        "D#": "o",
        "E#": "p",
        "G#": "@",
        "A#": "[",
      },
    },
    {
      noteNumber: 4,
      keys: {
        C: "1",
        D: "2",
        E: "3",
        F: "4",
        G: "5",
        A: "6",
        B: "7",
        "C#": "8",
        "D#": "9",
        "E#": "0",
        "G#": "-",
        "A#": "^",
      },
    },
  ]);
  let keyMap: KeyMap = {};
  for (const piano of pianos) {
    keyMap = { ...keyMap, ...createPianoKeyMap(piano) };
  }

  // const [noteNumberToAdd, setNoteNumberToAdd] = useState<NoteNumber>(0);
  // const [hotKeysToAdd, setHotKeysToAdd] = useState<PianoKeys>({});
  // const [noteNumberToDelete, setNoteNumberToDelete] = useState<NoteNumber>(0);

  // const changeHotKeys = (noteName: NoteName, key: string) => {
  //   setHotKeysToAdd((keys) => {
  //     return { ...keys, [noteName]: key };
  //   });
  // };

  // const addPiano = (noteNumber: NoteNumber) => {
  //   const isDuplicated = Boolean(
  //     pianos.find((piano) => piano.noteNumber === noteNumber)
  //   );

  //   if (!isDuplicated) {
  //     setPianos((pianos) => [
  //       ...pianos,
  //       {
  //         noteNumber,
  //         keys: hotKeysToAdd,
  //       },
  //     ]);
  //   }
  // };

  // const deletePiano = (noteNumber: NoteNumber) => {
  //   setPianos((pianos) =>
  //     pianos.filter((piano) => piano.noteNumber !== noteNumber)
  //   );
  // };

  return (
    <GlobalHotKeys keyMap={keyMap} allowChanges={true}>
      <Center mt={10}>
        <Flex minW="1000px" justify="center" bg="gray.800" p={10}>
          {pianos.map(({ noteNumber }) => (
            <Piano key={noteNumber} noteNumber={noteNumber} />
          ))}
        </Flex>
      </Center>

      {/* <Flex p={10}>
        <Flex
          w="50%"
          flexGrow={1}
          flexDir="column"
          align="center"
          bg="gray.400"
          borderRight="1px solid"
          borderColor="gray.500"
          p={5}
        >
          <Heading size="md">Hot Keys</Heading>
          <PianoHotKeyEdit mt={1} onChange={changeHotKeys} />
          <Heading mt={5} size="md">
            Note Number
          </Heading>
          <NumberInput
            mt={1}
            bg="gray.100"
            w="100px"
            value={noteNumberToAdd}
            onChange={(value) => {
              const noteNumber = stringToNoteNumber(value);
              if (noteNumber !== undefined) {
                setNoteNumberToAdd(noteNumber);
              }
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button
            mt={10}
            onClick={() => {
              addPiano(noteNumberToAdd);
            }}
          >
            キーボードを追加
          </Button>
        </Flex>

        <Flex
          w="50%"
          flexGrow={1}
          flexDir="column"
          align="center"
          bg="gray.400"
          p={5}
        >
          <Heading mt={5} size="md">
            Note Number
          </Heading>
          <NumberInput
            mt={1}
            bg="gray.100"
            w="100px"
            value={noteNumberToDelete}
            onChange={(value) => {
              const noteNumber = stringToNoteNumber(value);
              if (noteNumber !== undefined) {
                setNoteNumberToDelete(noteNumber);
              }
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button
            mt={10}
            onClick={() => {
              deletePiano(noteNumberToDelete);
            }}
          >
            キーボードを削除
          </Button>
        </Flex>
      </Flex> */}
    </GlobalHotKeys>
  );
};

export default Home;
