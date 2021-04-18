import { chakra } from "@chakra-ui/react";
import React, { createContext, Dispatch, useContext } from "react";
import { HotKeys, KeyMapOptions } from "react-hotkeys";
import { Piano, NoteNameKeyMap, PianosAction } from "../hooks/usePianos";
import { isNoteName, Note, NoteName, NoteNumber } from "../lib/sound";

type PianoKeyMap = { noteNumber: NoteNumber } & NoteNameKeyMap;

type PianoEventType = "KEYDOWN" | "KEYUP";
type PianoEvent = `${NoteName}${NoteNumber}_${PianoEventType}`;
type RejectOtherThanPianoEvent = { [T in Exclude<string, PianoEvent>]: never };
type PianoEventKeyMap = { [T in PianoEvent]?: KeyMapOptions } &
  RejectOtherThanPianoEvent;
type PianoEventHandlers = {
  [T in PianoEvent]?: (keyEvent?: KeyboardEvent) => void;
} &
  RejectOtherThanPianoEvent;

const buildPianoEvent = (arg: {
  noteName: NoteName;
  noteNumber: NoteNumber;
  type: PianoEventType;
}): PianoEvent => {
  return `${arg.noteName}${arg.noteNumber}_${arg.type}` as PianoEvent;
};

const createPianoEventKeyMap = ({
  noteNumber,
  keyMap,
}: Piano): PianoEventKeyMap => {
  const keyMaps: PianoEventKeyMap = {};
  for (const noteName in keyMap) {
    if (!isNoteName(noteName)) {
      continue;
    }

    const key = keyMap[noteName];

    keyMaps[
      buildPianoEvent({
        noteName,
        noteNumber,
        type: "KEYDOWN",
      })
    ] = {
      sequence: key,
      action: "keydown",
    };

    keyMaps[
      buildPianoEvent({
        noteName,
        noteNumber,
        type: "KEYUP",
      })
    ] = {
      sequence: key,
      action: "keyup",
    };
  }

  return keyMaps;
};

const createPianoEventHandlers = (
  { noteNumber, keyMap }: Piano,
  dispatchPianos: Dispatch<PianosAction>,
  playSound: (note: Note) => void
): PianoEventHandlers => {
  const handlers: PianoEventHandlers = {};
  for (const noteName in keyMap) {
    if (!isNoteName(noteName)) {
      continue;
    }

    handlers[
      buildPianoEvent({
        noteName,
        noteNumber,
        type: "KEYDOWN",
      })
    ] = () => {
      playSound({ noteName, noteNumber });
      dispatchPianos({ type: "keyDown", noteNumber, key: noteName });
    };

    handlers[
      buildPianoEvent({
        noteName,
        noteNumber,
        type: "KEYUP",
      })
    ] = () => {
      dispatchPianos({ type: "keyUp", noteNumber, key: noteName });
    };
  }
  return handlers;
};

const PianosHotKeysContext = createContext<PianoKeyMap[]>([]);

type PianosHotKeysProviderProps = {
  className?: string;
  pianos: Piano[];
  dispatchToPianos: Dispatch<PianosAction>;
  playSound?: (note: Note) => void;
  role?: string;
};

export const PianosHotKeysProvider = chakra<
  React.FC<PianosHotKeysProviderProps>
>(
  ({
    className,
    children,
    pianos,
    dispatchToPianos,
    playSound = () => {},
    role,
  }) => {
    const pianosKeyMaps: PianoKeyMap[] = pianos.map((piano) => ({
      noteNumber: piano.noteNumber,
      ...piano.keyMap,
    }));

    const { keyMap, handlers } = pianos.reduce<{
      keyMap: PianoEventKeyMap;
      handlers: PianoEventHandlers;
    }>(
      ({ keyMap, handlers }, piano) => ({
        keyMap: { ...keyMap, ...createPianoEventKeyMap(piano) },
        handlers: {
          ...handlers,
          ...createPianoEventHandlers(piano, dispatchToPianos, playSound),
        },
      }),
      { keyMap: {}, handlers: {} }
    );

    const handleBlur = () => {
      dispatchToPianos({ type: "resetPressed" });
    };

    return (
      <PianosHotKeysContext.Provider value={pianosKeyMaps}>
        <HotKeys
          className={className}
          keyMap={keyMap}
          handlers={handlers}
          allowChanges={true}
          tabIndex={-1}
          onBlur={handleBlur}
          role={role}
        >
          {children}
        </HotKeys>
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
        const keyName = keyMap[noteName as NoteName];
        if (keyName !== "") {
          keyNames.push(keyName);
        }
      }
      return keyNames;
    })
    .flat();

  return Array.from(new Set(allKeyNames));
};
