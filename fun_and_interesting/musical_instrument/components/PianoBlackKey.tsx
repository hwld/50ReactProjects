import { Box, chakra } from "@chakra-ui/react";
import React from "react";

export type PianoBlackKeyProps = {
  className?: string;
  note: "A#" | "B#" | "C#" | "D#" | "E#" | "F#" | "G#";
};

const Component: React.FC<PianoBlackKeyProps> = ({ className, note }) => {
  return (
    <Box
      as="button"
      tabIndex={-1}
      className={className}
      position="absolute"
      bg="gray.800"
      w="45px"
      h="170px"
      zIndex="1"
      border="5px solid"
      borderColor="gray.700"
      _active={{ bg: "yellow.300" }}
      _focus={{ outline: "none" }}
    />
  );
};

export const PianoBlackKey = chakra(Component);
