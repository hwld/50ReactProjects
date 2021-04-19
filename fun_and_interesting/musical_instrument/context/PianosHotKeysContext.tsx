import { chakra } from "@chakra-ui/react";
import React, { createContext, useContext, useMemo } from "react";
import { Piano, NoteNameKeyMap } from "../hooks/usePianos";
import { isNoteName, Note, NoteNumber } from "../lib/sound";

type PianoKeyMap = { noteNumber: NoteNumber } & NoteNameKeyMap;

const PianosHotKeysContext = createContext<PianoKeyMap[]>([]);

type Props = {
  pianos: Piano[];
};

export const PianosHotKeysProvider = chakra<React.FC<Props>>(
  ({ children, pianos }) => {
    const pianosKeyMaps: PianoKeyMap[] = useMemo(() => {
      return pianos.map((piano) => ({
        noteNumber: piano.noteNumber,
        ...piano.keyMap,
      }));
    }, [pianos]);

    return (
      <PianosHotKeysContext.Provider value={pianosKeyMaps}>
        {children}
      </PianosHotKeysContext.Provider>
    );
  }
);

const usePianoKeyMaps = (): PianoKeyMap[] => useContext(PianosHotKeysContext);

export const usePianoHotKeyName = ({ noteName, noteNumber }: Note): string => {
  const keyMaps = usePianoKeyMaps();
  const targetKeyMap = keyMaps.find(
    (keyMap) => keyMap.noteNumber === noteNumber
  );
  if (!targetKeyMap) {
    return "";
  }
  return targetKeyMap[noteName].toUpperCase();
};

export const useAllPianoHotKeyName = (option?: {
  excludingNoteNumber: NoteNumber;
}): string[] => {
  const keyMaps = usePianoKeyMaps();

  const allKeyNames = keyMaps
    .filter((keyMap) => keyMap.noteNumber !== option?.excludingNoteNumber)
    .map((keyMap) => {
      const keyNames: string[] = [];
      for (const noteName in keyMap) {
        if (!isNoteName(noteName)) {
          continue;
        }
        const keyName = keyMap[noteName];
        if (keyName !== "") {
          keyNames.push(keyName);
        }
      }
      return keyNames;
    })
    .flat();

  return Array.from(new Set(allKeyNames));
};
