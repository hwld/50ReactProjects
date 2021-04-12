import { chakra, ChakraProps, Kbd } from "@chakra-ui/react";
import React from "react";
import { Note } from "../lib/sound";
import { usePianoHotKeyName } from "../context/PianosHotKeysContext";
import { PianoKey } from "./PianoKey";

type Props = {
  className?: string;
  note: Note;
  pressed: boolean;
  hotKeyStyle?: ChakraProps;
  noteTextStyle?: ChakraProps;
  playSound: (note: Note) => void;
};

// 実際に音を鳴らす楽器としてのピアノのキー
const Component: React.FC<Props> = ({
  className,
  note,
  pressed,
  noteTextStyle,
  playSound,
}) => {
  const hotKeyName = usePianoHotKeyName(note);

  return (
    <PianoKey
      className={className}
      onMouseDown={() => playSound(note)}
      pressed={pressed}
      note={note}
      noteTextStyle={noteTextStyle}
    >
      <Kbd
        mb={1}
        bgColor={hotKeyName ? "green.300" : "red.300"}
        borderColor={hotKeyName ? "green.400" : "red.400"}
      >
        {hotKeyName || "No"}
      </Kbd>
    </PianoKey>
  );
};

export const PlayablePianoKey = chakra(Component);
