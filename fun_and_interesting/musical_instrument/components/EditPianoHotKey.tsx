import { Box, chakra, Flex } from "@chakra-ui/react";
import React from "react";
import { usePianoKeysLayout } from "../hooks/usePianoKeysLayout";
import { PianoKeys } from "../hooks/usePianos";
import { NoteName, NoteNumber } from "../lib/sound";
import { EditablePianoBlackKey } from "./EditablePianoBlackKey";
import { EditablePianoWhiteKey } from "./EditablePianoWhiteKey";

type Props = {
  className?: string;
  noteNumber: NoteNumber;
  hotKeys: PianoKeys;
  onChange?: (noteName: NoteName, key: string) => void;
};

const Component: React.FC<Props> = ({
  className,
  noteNumber,
  hotKeys,
  onChange,
}) => {
  const { whiteKeys, blackKeys } = usePianoKeysLayout();

  const handleChange = (noteName: NoteName, key: string) => {
    if (onChange) {
      onChange(noteName, key);
    }
  };

  return (
    <Box position="relative" className={className}>
      {blackKeys.map(({ noteName, left, blackKeyWidth }) => {
        return (
          <EditablePianoBlackKey
            key={`${noteName}${noteNumber}`}
            note={{ noteName, noteNumber }}
            position="absolute"
            left={left}
            w={blackKeyWidth}
            h="160px"
            hotKey={hotKeys[noteName]}
            onChange={handleChange}
          />
        );
      })}
      <Flex>
        {whiteKeys.map(({ noteName, whiteKeyWidth, whiteKeyMarginRight }) => {
          return (
            <EditablePianoWhiteKey
              key={`${noteName}${noteNumber}`}
              note={{ noteName, noteNumber }}
              mr={whiteKeyMarginRight}
              w={whiteKeyWidth}
              h="250px"
              hotKey={hotKeys[noteName]}
              onChange={handleChange}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export const EditPianoHotKey = chakra(Component);
