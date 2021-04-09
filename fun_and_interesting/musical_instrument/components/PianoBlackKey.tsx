import { Box, chakra, Kbd, Text } from "@chakra-ui/react";
import React from "react";
import { Note } from "../lib/sound";
import { usePianoHotKeyName } from "../context/PianosHotKeysContext";

type Props = {
  className?: string;
  note: Note;
  pressed: boolean;
  playSound: (note: Note) => void;
};

const Component: React.FC<Props> = ({
  className,
  note,
  pressed,
  playSound,
}) => {
  const keyName = usePianoHotKeyName(note);

  return (
    <Box
      className={className}
      as="button"
      tabIndex={-1}
      onMouseDown={() => {
        playSound(note);
      }}
      bg="gray.800"
      data-active={pressed ? true : undefined}
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
        backgroundColor={keyName ? "green.300" : "red.300"}
        borderColor={keyName ? "green.400" : "red.400"}
      >
        {keyName ?? "No"}
      </Kbd>
      <Text mb={3} color="gray.50">
        {`${note.noteName}${note.noteNumber}`}
      </Text>
    </Box>
  );
};

export const PianoBlackKey = chakra(Component);
