import { chakra, Kbd, Text } from "@chakra-ui/react";
import React from "react";
import { Note } from "../lib/sound";
import { usePianoHotKeyName } from "../context/PianosHotKeysContext";
import { PianoKey } from "./PianoKey";

type Props = {
  className?: string;
  note: Note;
  pressed: boolean;
  playSound: (note: Note) => void;
};

// 実際に音を鳴らす楽器としての黒鍵
const Component: React.FC<Props> = ({
  className,
  note,
  pressed,
  playSound,
}) => {
  const keyName = usePianoHotKeyName(note);

  return (
    <PianoKey
      className={className}
      bg="gray.800"
      onMouseDown={() => playSound(note)}
      pressed={pressed}
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
    </PianoKey>
  );
};

export const PianoBlackKey = chakra(Component);
