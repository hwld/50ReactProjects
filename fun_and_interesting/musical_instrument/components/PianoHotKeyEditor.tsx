import { Box, chakra, Flex } from "@chakra-ui/react";
import React from "react";
import { usePianoKeysLayout } from "../hooks/usePianoKeysLayout";
import { PianoKeys } from "../hooks/usePianos";
import { NoteName, NoteNumber } from "../lib/sound";
import { EditablePianoKey } from "./EditablePianoKey";

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
      <Flex>
        {whiteKeys.map(({ noteName, whiteKeyWidth, whiteKeyMarginRight }) => {
          return (
            <EditablePianoKey
              key={`${noteName}${noteNumber}`}
              note={{ noteName, noteNumber }}
              hotKey={hotKeys[noteName]}
              onChange={handleChange}
              mr={whiteKeyMarginRight}
              w={whiteKeyWidth}
              h="250px"
              bg="gray.100"
            />
          );
        })}
        {/* positionがabsoluteの要素の包含ブロックは、positionがstatic以外の要素になるので、Flexではなくその親のBoxになる */}
        {blackKeys.map(({ noteName, left, blackKeyWidth }) => {
          return (
            <EditablePianoKey
              key={`${noteName}${noteNumber}`}
              note={{ noteName, noteNumber }}
              hotKey={hotKeys[noteName]}
              noteTextStyle={{ color: "gray.100" }}
              onChange={handleChange}
              position="absolute"
              left={left}
              w={blackKeyWidth}
              h="160px"
              bg="gray.800"
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export const PianoHotKeyEditor = chakra(Component);
