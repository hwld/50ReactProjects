import { chakra } from "@chakra-ui/react";
import React, { createContext, useContext, useMemo } from "react";
import {
  Piano,
  NoteNameKeyMap,
  getDefaultNoteNameKeyMap,
} from "../hooks/usePianos";
import { isNoteName, Note, NoteNumber } from "../lib/sound";

type PianoKeyMap = { noteNumber: NoteNumber } & NoteNameKeyMap;

const PianoKeyMapsContext = createContext<PianoKeyMap[]>([]);

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
      <PianoKeyMapsContext.Provider value={pianosKeyMaps}>
        {children}
      </PianoKeyMapsContext.Provider>
    );
  }
);

const usePianoKeyMaps = (): PianoKeyMap[] => useContext(PianoKeyMapsContext);

export const useNoteNameKeyMap = (
  noteNumber: NoteNumber
): NoteNameKeyMap | undefined => {
  const allKeyMaps = usePianoKeyMaps();
  const pianoKeyMap = allKeyMaps.find(
    (map) => map["noteNumber"] === noteNumber
  );

  if (!pianoKeyMap) {
    return undefined;
  }

  const noteNameKeyMap = getDefaultNoteNameKeyMap();
  for (const prop in pianoKeyMap) {
    if (isNoteName(prop)) {
      noteNameKeyMap[prop] = pianoKeyMap[prop];
    }
  }
  return noteNameKeyMap;
};

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
