import { Box, chakra } from "@chakra-ui/react";
import React from "react";

export type PianoWhiteKeyProps = {
  className?: string;
  note: string;
};

const Component: React.FC<PianoWhiteKeyProps> = ({ note, className }) => {
  return (
    <Box
      as="button"
      tabIndex={-1}
      className={className}
      bg="gray.50"
      w="50px"
      h="250px"
      _active={{ bg: "yellow.300" }}
      _focus={{ outline: "none" }}
    />
  );
};

export const PianoWhiteKey = chakra(Component);
