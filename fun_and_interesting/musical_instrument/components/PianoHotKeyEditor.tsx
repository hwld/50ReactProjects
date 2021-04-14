import { Alert, AlertIcon, Box, chakra, Flex } from "@chakra-ui/react";
import React from "react";
import { usePianoKeysLayout } from "../hooks/usePianoKeysLayout";
import { PianoKeys, extractKeyNames } from "../hooks/usePianos";
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
  hotKeys: PianoKeys;
  onChange?: (noteName: NoteName, key: string) => void;
  disabledHotKeys?: { isDisabled: (key: string) => boolean; message: string }[];
  validationRules?: ValidationRule[];
};

const Component: React.FC<Props> = ({
  className,
  noteNumber,
  hotKeys,
  onChange,
  validationRules = [],
}) => {
  const { whiteKeys, blackKeys } = usePianoKeysLayout();

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
            const allKeys = extractKeyNames(hotKeys);
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

export const PianoHotKeyEditor = chakra(Component);
