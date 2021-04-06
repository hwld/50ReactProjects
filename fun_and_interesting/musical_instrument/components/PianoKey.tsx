import { Box, chakra } from "@chakra-ui/react";
import React, { useState } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import { useSynth } from "../hooks/useSynth";
import { Note } from "../utils";

export type PianoKeyProps = {
  className?: string;
  note: Note;
};

const Component: React.FC<PianoKeyProps> = ({ children, className, note }) => {
  const [isPressed, setIsPressed] = useState(false);
  const synth = useSynth();

  const press = () => {
    setIsPressed(true);
    synth?.triggerAttackRelease(note, "8n");
  };

  const release = () => {
    setIsPressed(false);
  };

  const handlers = {
    [`${note}_KEYDOWN`]: () => press(),
    [`${note}_KEYUP`]: () => release(),
  };

  return (
    <GlobalHotKeys handlers={handlers} allowChanges={true}>
      <Box
        as="button"
        tabIndex={-1}
        className={className}
        onMouseDown={press}
        onMouseUp={release}
        onMouseLeave={release}
        _focus={{ outline: "none" }}
        data-pressed={isPressed ? true : undefined}
      >
        {children}
      </Box>
    </GlobalHotKeys>
  );
};

export const PianoKey = chakra(Component);
