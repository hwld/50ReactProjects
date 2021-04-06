import { Center, Heading } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { HotKeys, HotKeysProps, KeyMap } from "react-hotkeys";
import { Piano } from "../components/Piano";
import { PianoHotKeyEdit } from "../components/PianoHotKeyEdit";
import {
  createPianoKeyHandlers,
  createPianoKeyMap,
  NoteName,
  NoteNumber,
  PianoKeys,
  PianoObj,
  stringToNoteNumber,
} from "../utils";

const Home: NextPage = () => {
  const pianoRef = useRef<HTMLDivElement | null>(null);
  const [pianos, setPianos] = useState<PianoObj[]>([
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
      pressedNoteNames: [],
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
      pressedNoteNames: [],
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
      pressedNoteNames: [],
    },
  ]);
  const [noteNumberToAdd, setNoteNumberToAdd] = useState<NoteNumber>(0);
  const [hotKeysToAdd, setHotKeysToAdd] = useState<PianoKeys>({});
  const [noteNumberToDelete, setNoteNumberToDelete] = useState<NoteNumber>(0);

  const changeHotKeys = (noteName: NoteName, key: string) => {
    setHotKeysToAdd((keys) => {
      if (key === "") {
        const tmp = { ...keys };
        delete tmp[noteName];
        return tmp;
      }
      return { ...keys, [noteName]: key };
    });
  };

  const addPiano = (noteNumber: NoteNumber) => {
    const isDuplicated = Boolean(
      pianos.find((piano) => piano.noteNumber === noteNumber)
    );

    if (!isDuplicated) {
      setPianos((pianos) => [
        ...pianos,
        {
          noteNumber,
          keys: hotKeysToAdd,
          pressedNoteNames: [],
        },
      ]);
    }
  };

  const deletePiano = (noteNumber: NoteNumber) => {
    setPianos((pianos) =>
      pianos.filter((piano) => piano.noteNumber !== noteNumber)
    );
  };

  let keyMap: KeyMap = {};
  let handlers: HotKeysProps["handlers"] = {};
  for (const piano of pianos) {
    keyMap = { ...keyMap, ...createPianoKeyMap(piano) };
    handlers = { ...handlers, ...createPianoKeyHandlers(piano, setPianos) };
  }

  useEffect(() => {
    pianoRef.current?.focus();
  }, []);

  return (
    <Box>
      <Center mt={10}>
        <HotKeys keyMap={keyMap} handlers={handlers} allowChanges={true}>
          <Flex
            ref={pianoRef}
            tabIndex={0}
            minW="1000px"
            justify="center"
            bg="gray.800"
            p={10}
          >
            {pianos.map(({ noteNumber, pressedNoteNames }) => (
              <Piano
                key={noteNumber}
                noteNumber={noteNumber}
                pressedNoteNames={pressedNoteNames}
              />
            ))}
          </Flex>
        </HotKeys>
      </Center>

      <Flex p={10}>
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
      </Flex>
    </Box>
  );
};

export default Home;
