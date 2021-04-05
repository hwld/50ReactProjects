import { Box, chakra, ChakraProps, HStack } from "@chakra-ui/react";
import React from "react";
import { PianoKey, PianoKeyProps } from "./PianoKey";

type Props = { className?: string };
const Component: React.FC<Props> = ({ className }) => {
  const whiteKeyWidth = "50px";
  const whiteKeyMargin = "10px";
  const blackKeyWidth = "45px";

  const whiteKeys: { note: PianoKeyProps["note"] }[] = [
    { note: "C" },
    { note: "D" },
    { note: "E" },
    { note: "F" },
    { note: "G" },
    { note: "A" },
    { note: "B" },
  ];

  const blackKeys: {
    note: PianoKeyProps["note"];
    left: ChakraProps["left"];
  }[] = [
    { note: "C#", left: `calc(${whiteKeyWidth} / 2)` },
    {
      note: "D#",
      left: `calc(((${whiteKeyWidth} + ${whiteKeyMargin}) * 2) + (${whiteKeyWidth} / 2) - ${blackKeyWidth})`,
    },
    {
      note: "E#",
      left: `calc(((${whiteKeyWidth} + ${whiteKeyMargin}) * 3) + (${whiteKeyWidth} / 2))`,
    },
    {
      note: "G#",
      left: `calc(((${whiteKeyWidth} + ${whiteKeyMargin}) * 4) + ((${whiteKeyWidth} + (${whiteKeyMargin}) / 2)) - (${blackKeyWidth} / 2))`,
    },
    {
      note: "A#",
      left: `calc(((${whiteKeyWidth} + ${whiteKeyMargin}) * 6) + (${whiteKeyWidth} / 2) - ${blackKeyWidth})`,
    },
  ];

  return (
    <Box className={className} bg="gray.800" p={10}>
      <Box position="relative">
        {blackKeys.map(({ note, left }) => (
          <PianoKey
            key={note}
            note={note}
            position="absolute"
            left={left}
            w={blackKeyWidth}
            h="160px"
            bg="gray.800"
            _pressed={{ bg: "yellow.300", borderColor: "yellow.400" }}
            borderRight="2px solid"
            borderLeft="2px solid"
            borderBottom="2px solid"
          />
        ))}
        <HStack spacing={whiteKeyMargin}>
          {whiteKeys.map(({ note }) => (
            <PianoKey
              key={note}
              note={note}
              w={whiteKeyWidth}
              h="250px"
              bg="gray.50"
              _pressed={{ bg: "yellow.300" }}
            />
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export const Piano = chakra(Component);
