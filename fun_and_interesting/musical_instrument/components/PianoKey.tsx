import { Box, chakra, ChakraProps, Text } from "@chakra-ui/react";
import React from "react";
import { Note, NoteName, NoteNumber } from "../lib/sound";

type Props = {
  className?: string;
  noteName: NoteName;
  noteNumber: NoteNumber;
  pressed?: boolean;
  noteTextStyle?: ChakraProps;
  onPressNote?: (note: Note) => void;
};

// 視覚要素としてのピアノのキー
const Component: React.FC<Props> = React.memo(
  ({
    children,
    noteName,
    noteNumber,
    className,
    pressed = false,
    noteTextStyle,
    onPressNote = () => {},
  }) => {
    const handleMouseDown = () => {
      onPressNote({ noteName, noteNumber });
    };

    return (
      <Box
        className={className}
        as="button"
        type="button"
        tabIndex={-1}
        onMouseDown={handleMouseDown}
        data-active={pressed ? true : undefined}
        _focus={{ outline: "none" }}
        display="flex"
        flexDir="column"
        justifyContent="flex-end"
        alignItems="center"
        userSelect="none"
      >
        {children}
        <Text mb={2} {...noteTextStyle}>{`${noteName}${noteNumber}`}</Text>
      </Box>
    );
  }
);

export const PianoKey = chakra(Component);
