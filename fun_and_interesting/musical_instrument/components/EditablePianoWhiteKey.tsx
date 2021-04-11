import { chakra, Text } from "@chakra-ui/react";
import React from "react";
import { Note, NoteName } from "../lib/sound";
import { PianoHotkeyInput } from "./PianoHotKeyInput";
import { PianoKey } from "./PianoKey";

type Props = {
  className?: string;
  note: Note;
  hotKey?: string;
  onChange: (noteName: NoteName, hotKey: string) => void;
};

// HotKeyを編集するための白鍵
const Component: React.FC<Props> = ({ className, note, hotKey, onChange }) => {
  return (
    <PianoKey className={className} bg="gray.100" note={note}>
      <PianoHotkeyInput
        noteName={note.noteName}
        hotKey={hotKey}
        onChange={onChange}
      />
      <Text mb={3}>{`${note.noteName}${note.noteNumber}`}</Text>
    </PianoKey>
  );
};

export const EditablePianoWhiteKey = chakra(Component);
