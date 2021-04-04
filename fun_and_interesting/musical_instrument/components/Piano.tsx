import { Box, chakra, ChakraProps, HStack } from "@chakra-ui/react";
import React from "react";
import { PianoBlackKey, PianoBlackKeyProps } from "./PianoBlackKey";
import { PianoWhiteKey, PianoWhiteKeyProps } from "./PianoWhiteKey";

type Props = { className?: string };
const Component: React.FC<Props> = ({ className }) => {
  const whiteKeyWidth = "50px";
  const whiteKeyMargin = "10px";
  const blackKeyWidth = "45px";

  const whiteKeys: { note: PianoWhiteKeyProps["note"] }[] = [
    { note: "C" },
    { note: "D" },
    { note: "E" },
    { note: "F" },
    { note: "G" },
    { note: "A" },
    { note: "B" },
  ];

  const blackKeys: {
    note: PianoBlackKeyProps["note"];
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
      note: "F#",
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
          <PianoBlackKey note={note} width={blackKeyWidth} left={left} />
        ))}
        <HStack spacing={whiteKeyMargin}>
          {whiteKeys.map(({ note }) => (
            <PianoWhiteKey note={note} width={whiteKeyWidth} />
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export const Piano = chakra(Component);
