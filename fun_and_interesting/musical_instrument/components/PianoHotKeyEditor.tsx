import { Box, chakra, Flex } from "@chakra-ui/react";
import React from "react";
import { usePianoKeysLayout } from "../hooks/usePianoKeysLayout";
import { PianoKeys } from "../hooks/usePianos";
import { NoteName, NoteNumber } from "../lib/sound";
import { PianoHotkeyInput } from "./PianoHotKeyInput";
import { PianoKey } from "./PianoKey";

type Props = {
  className?: string;
  noteNumber: NoteNumber;
  hotKeys: PianoKeys;
  onChange?: (noteName: NoteName, key: string) => void;
  errorMessage?: string;
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
    <>
      <Box position="relative" className={className}>
        <Box>
          <Flex>
            {whiteKeys.map(
              ({ noteName, whiteKeyWidth, whiteKeyMarginRight }) => {
                return (
                  <PianoKey
                    key={noteName}
                    note={{ noteName, noteNumber }}
                    mr={whiteKeyMarginRight}
                    w={whiteKeyWidth}
                    h="250px"
                    bg="gray.100"
                  >
                    <PianoHotkeyInput
                      noteName={noteName}
                      hotKey={hotKeys[noteName]}
                      onChange={handleChange}
                    />
                  </PianoKey>
                );
              }
            )}
            {/* positionがabsoluteの要素の包含ブロックは、positionがstatic以外の要素になるので、Flexではなくその親のBoxになる */}
            {blackKeys.map(({ noteName, left, blackKeyWidth }) => {
              return (
                <PianoKey
                  key={noteName}
                  note={{ noteName, noteNumber }}
                  noteTextStyle={{ color: "gray.100" }}
                  position="absolute"
                  left={left}
                  w={blackKeyWidth}
                  h="160px"
                  bg="gray.800"
                >
                  <PianoHotkeyInput
                    noteName={noteName}
                    hotKey={hotKeys[noteName]}
                    onChange={handleChange}
                  />
                </PianoKey>
              );
            })}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export const PianoHotKeyEditor = chakra(Component);
