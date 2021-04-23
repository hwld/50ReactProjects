import { Alert, AlertIcon, Box, chakra, Flex } from "@chakra-ui/react";
import React from "react";
import { useNoteNameKeyMapLayout } from "../hooks/usePianoKeysLayout";
import { NoteNameKeyMap, extractKeyNames } from "../hooks/usePianos";
import { NoteName, NoteNumber } from "../lib/sound";
import { PianoHotkeyInput } from "./PianoHotKeyInput";
import { PianoKey } from "./PianoKey";

export type ValidationRule = {
  validate: (value: string) => boolean;
  errorMessage: string;
};

type Props = {
  className?: string;
  noteNumber: NoteNumber;
  keyMap: NoteNameKeyMap;
  onChange?: (noteName: NoteName, key: string) => void;
  disabledKeyMap?: { isDisabled: (key: string) => boolean; message: string }[];
  validationRules?: ValidationRule[];
};

const Component: React.FC<Props> = ({
  className,
  noteNumber,
  keyMap,
  onChange,
  validationRules = [],
}) => {
  const { whiteKeys, blackKeys } = useNoteNameKeyMapLayout();

  const handleChange = (noteName: NoteName, key: string) => {
    if (onChange) {
      onChange(noteName, key);
    }
  };

  return (
    <Box position="relative" className={className}>
      <Box>
        {validationRules
          .filter(({ validate }) => {
            const allKeys = extractKeyNames(keyMap);
            return !allKeys.every((key) => validate(key));
          })
          .map(({ errorMessage }, index) => (
            <Alert key={index} mb={2} status="error" variant="left-accent">
              <AlertIcon />
              {errorMessage}
            </Alert>
          ))}
        <Flex>
          {whiteKeys.map(({ noteName, whiteKeyWidth, whiteKeyMarginRight }) => {
            return (
              <PianoKey
                key={noteName}
                noteName={noteName}
                noteNumber={noteNumber}
                mr={whiteKeyMarginRight}
                w={whiteKeyWidth}
                h="250px"
                bg="gray.100"
              >
                <PianoHotkeyInput
                  noteName={noteName}
                  hotKey={keyMap[noteName]}
                  onChange={handleChange}
                  bg="green.300"
                  validate={validationRules.map(({ validate }) => validate)}
                  _invalid={{ bg: "red.300" }}
                />
              </PianoKey>
            );
          })}
          {/* positionがabsoluteの要素の包含ブロックは、positionがstatic以外の要素になる */}
          {blackKeys.map(({ noteName, left, blackKeyWidth }) => {
            return (
              <PianoKey
                key={noteName}
                noteName={noteName}
                noteNumber={noteNumber}
                noteTextStyle={{ color: "gray.100" }}
                position="absolute"
                left={left}
                w={blackKeyWidth}
                h="160px"
                bg="gray.800"
              >
                <PianoHotkeyInput
                  noteName={noteName}
                  hotKey={keyMap[noteName]}
                  onChange={handleChange}
                  bg="green.300"
                  validate={validationRules.map(({ validate }) => validate)}
                  _invalid={{ bg: "red.300" }}
                />
              </PianoKey>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
};

export const PianoKeyMapEditor = chakra(Component);
