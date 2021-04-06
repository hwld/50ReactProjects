import { Box, Text, chakra, ChakraProps, Flex, Kbd } from "@chakra-ui/react";
import React from "react";
import { Synth } from "tone";
import { useApplicationKeyMap } from "../hooks/useApplicationKeyMap";
import { getPianoKey, NoteName, NoteNumber, toNote } from "../utils";

type Props = {
  className?: string;
  noteNumber: NoteNumber;
  pressedNoteNames?: NoteName[];
};

const Component: React.FC<Props> = ({
  className,
  noteNumber,
  pressedNoteNames = [],
}) => {
  const keyMap = useApplicationKeyMap();

  const whiteKeyWidth = "50px";
  const whiteKeyMargin = "10px";
  const blackKeyWidth = "45px";

  const whiteKeys: { noteName: NoteName }[] = [
    { noteName: "C" },
    { noteName: "D" },
    { noteName: "E" },
    { noteName: "F" },
    { noteName: "G" },
    { noteName: "A" },
    { noteName: "B" },
  ];

  const blackKeys: {
    noteName: NoteName;
    left: ChakraProps["left"];
  }[] = [
    { noteName: "C#", left: `calc(${whiteKeyWidth} / 2)` },
    {
      noteName: "D#",
      left: `calc(((${whiteKeyWidth} + ${whiteKeyMargin}) * 2) + (${whiteKeyWidth} / 2) - ${blackKeyWidth})`,
    },
    {
      noteName: "E#",
      left: `calc(((${whiteKeyWidth} + ${whiteKeyMargin}) * 3) + (${whiteKeyWidth} / 2))`,
    },
    {
      noteName: "G#",
      left: `calc(((${whiteKeyWidth} + ${whiteKeyMargin}) * 4) + ((${whiteKeyWidth} + (${whiteKeyMargin}) / 2)) - (${blackKeyWidth} / 2))`,
    },
    {
      noteName: "A#",
      left: `calc(((${whiteKeyWidth} + ${whiteKeyMargin}) * 6) + (${whiteKeyWidth} / 2) - ${blackKeyWidth})`,
    },
  ];

  return (
    <Box position="relative" className={className}>
      {blackKeys.map(({ noteName, left }) => {
        const note = toNote(noteName, noteNumber);
        let key: string | undefined;
        if (keyMap) {
          key = getPianoKey(keyMap, note);
        }
        return (
          <Box
            key={note}
            as="button"
            tabIndex={-1}
            onMouseDown={() => {
              new Synth().toDestination().triggerAttackRelease(note, "8n");
            }}
            position="absolute"
            left={left}
            w={blackKeyWidth}
            h="160px"
            bg="gray.800"
            data-active={pressedNoteNames.includes(noteName) ? true : undefined}
            _active={{ bg: "red.500" }}
            _focus={{ outline: "none" }}
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            alignItems="center"
            userSelect="none"
          >
            <Kbd
              mb={1}
              backgroundColor={key ? "green.300" : "red.300"}
              borderColor={key ? "green.400" : "red.400"}
            >
              {key ?? "No"}
            </Kbd>
            <Text mb={3} color="gray.50">
              {note}
            </Text>
          </Box>
        );
      })}
      <Flex>
        {whiteKeys.map(({ noteName }) => {
          const note = toNote(noteName, noteNumber);
          let key: string | undefined;
          if (keyMap) {
            key = getPianoKey(keyMap, note);
          }
          return (
            <Box
              key={note}
              as="button"
              tabIndex={-1}
              onMouseDown={() => {
                new Synth().toDestination().triggerAttackRelease(note, "8n");
              }}
              mr={whiteKeyMargin}
              w={whiteKeyWidth}
              h="250px"
              bg="gray.50"
              data-active={
                pressedNoteNames.includes(noteName) ? true : undefined
              }
              _active={{ bg: "yellow.300" }}
              _focus={{ outline: "none" }}
              display="flex"
              flexDir="column"
              justifyContent="flex-end"
              alignItems="center"
              userSelect="none"
            >
              <Kbd
                mb={1}
                backgroundColor={key ? "green.300" : "red.300"}
                borderColor={key ? "green.400" : "red.400"}
              >
                {key ?? "No"}
              </Kbd>
              <Text mb={3}>{note}</Text>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

export const Piano = chakra(Component);
