import { chakra, ChakraProps } from "@chakra-ui/react";
import React from "react";
import { Note } from "../lib/sound";
import { usePianoHotKeyName } from "../context/PianosHotKeysContext";
import { PianoKey } from "./PianoKey";
import { PianoHotKeyIcon } from "./PianoHotKeyIcon";

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

  const handleMouseDown = () => {
    playSound(note);
  };

  return (
    <PianoKey
      className={className}
      onMouseDown={handleMouseDown}
      pressed={pressed}
      note={note}
      noteTextStyle={noteTextStyle}
    >
      <PianoHotKeyIcon keyName={hotKeyName} />
    </PianoKey>
  );
};

export const PlayablePianoKey = chakra(Component);
