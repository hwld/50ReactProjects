import { chakra, ChakraProps } from "@chakra-ui/react";
import React from "react";
import { Note, NoteName } from "../lib/sound";
import { PianoHotkeyInput } from "./PianoHotKeyInput";
import { PianoKey } from "./PianoKey";

type Props = {
  className?: string;
  note: Note;
  hotKey: string;
  onChange: (noteName: NoteName, hotKey: string) => void;
  noteTextStyle?: ChakraProps;
};

// HotKeyを編集するためのピアノのキー
const Component: React.FC<Props> = ({
  className,
  note,
  hotKey,
  onChange,
  noteTextStyle,
}) => {
  return (
    <PianoKey className={className} note={note} noteTextStyle={noteTextStyle}>
      <PianoHotkeyInput
        noteName={note.noteName}
        hotKey={hotKey}
        onChange={onChange}
      />
    </PianoKey>
  );
};

export const EditablePianoKey = chakra(Component);
