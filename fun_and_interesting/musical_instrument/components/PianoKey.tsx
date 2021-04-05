import { Box, chakra } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { now, Synth } from "tone";

export type PianoKeyProps = {
  className?: string;
  note:
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "A#"
    | "C#"
    | "D#"
    | "E#"
    | "G#";
};

const Component: React.FC<PianoKeyProps> = ({ note, className }) => {
  const synthRef = useRef<Synth>();
  useEffect(() => {
    synthRef.current = new Synth().toDestination();
  }, []);

  const [isPressed, setIsPressed] = useState(false);

  const attack = () => {
    setIsPressed(true);
    synthRef.current?.triggerAttack(`${note}3`);
  };

  const release = () => {
    setIsPressed(false);
    synthRef.current?.triggerRelease();
  };

  return (
    <Box
      as="button"
      tabIndex={-1}
      className={className}
      onMouseDown={attack}
      onMouseUp={release}
      onMouseLeave={release}
      _focus={{ outline: "none" }}
      data-pressed={isPressed ? true : undefined}
    />
  );
};

export const PianoKey = chakra(Component);
