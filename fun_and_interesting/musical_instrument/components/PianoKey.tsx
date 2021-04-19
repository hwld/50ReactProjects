import { Box, chakra, ChakraProps, Text } from "@chakra-ui/react";
import React from "react";
import { Note } from "../lib/sound";

type Props = {
  className?: string;
  note: Note;
  pressed?: boolean;
  noteTextStyle?: ChakraProps;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement> &
    React.MouseEventHandler<HTMLButtonElement>;
};

// 視覚要素としてのピアノのキー
const Component: React.FC<Props> = ({
  children,
  note,
  className,
  pressed = false,
  noteTextStyle,
  onMouseDown,
}) => {
  return (
    <Box
      className={className}
      as="button"
      type="button"
      tabIndex={-1}
      onMouseDown={onMouseDown}
      data-active={pressed ? true : undefined}
      _focus={{ outline: "none" }}
      display="flex"
      flexDir="column"
      justifyContent="flex-end"
      alignItems="center"
      userSelect="none"
    >
      {children}
      <Text
        mb={2}
        {...noteTextStyle}
      >{`${note.noteName}${note.noteNumber}`}</Text>
    </Box>
  );
};

export const PianoKey = chakra(Component);
