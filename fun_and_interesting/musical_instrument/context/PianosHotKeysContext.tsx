import { chakra } from "@chakra-ui/react";
import React, { createContext, Dispatch, useContext } from "react";
import { HotKeys, HotKeysProps, KeyMapOptions } from "react-hotkeys";
import { Piano, PianosAction } from "../hooks/usePianos";
import { Note, NoteName, NoteNumber } from "../lib/sound";

type PianosKeyMap = { [T in string]: KeyMapOptions };
type Handlers = NonNullable<HotKeysProps["handlers"]>;

const createPianoKeyMap = ({ noteNumber, keys }: Piano): PianosKeyMap => {
  const keyMaps: PianosKeyMap = {};
  for (const noteName in keys) {
    const key = keys[noteName as NoteName] as string;
    keyMaps[`${noteName}${noteNumber}_KEYDOWN`] = {
      sequence: key,
      action: "keydown",
    };
    keyMaps[`${noteName}${noteNumber}_KEYUP`] = {
      sequence: key,
      action: "keyup",
    };
  }

  return keyMaps;
};

const createPianoKeyHandlers = (
  { noteNumber, keys }: Piano,
  dispatchPianos: Dispatch<PianosAction>,
  playSound: (note: Note) => void
): Handlers => {
  let handlers: Handlers = {};
  for (const property in keys) {
    const noteName = property as NoteName;
    handlers = {
      ...handlers,
      [`${noteName}${noteNumber}_KEYDOWN`]: () => {
        playSound({ noteName, noteNumber });
        dispatchPianos({ type: "keyDown", noteNumber, key: noteName });
      },
      [`${noteName}${noteNumber}_KEYUP`]: () => {
        dispatchPianos({ type: "keyUp", noteNumber, key: noteName });
      },
    };
  }
  return handlers;
};

type PianoHotKeys = { noteNumber: Piano["noteNumber"]; keys: Piano["keys"] };
const PianosHotKeysContext = createContext<PianoHotKeys[]>([]);

type PianosHotKeysProviderProps = {
  className?: string;
  pianos: Piano[];
  dispatchToPianos: Dispatch<PianosAction>;
  playSound?: (note: Note) => void;
  role?: string;
};

const Provider: React.FC<PianosHotKeysProviderProps> = ({
  className,
  children,
  pianos,
  dispatchToPianos,
  playSound = () => {},
  role,
}) => {
  const { keyMap, handlers } = pianos.reduce<{
    keyMap: PianosKeyMap;
    handlers: Handlers;
  }>(
    ({ keyMap, handlers }, piano) => ({
      keyMap: { ...keyMap, ...createPianoKeyMap(piano) },
      handlers: {
        ...handlers,
        ...createPianoKeyHandlers(piano, dispatchToPianos, playSound),
      },
    }),
    { keyMap: {}, handlers: {} }
  );

  const handleBlur = () => {
    dispatchToPianos({ type: "resetPressed" });
  };

  return (
    <PianosHotKeysContext.Provider value={pianos}>
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
};
export const PianosHotKeysProvider = chakra(Provider);

export const usePianosHotKeys = (): PianoHotKeys[] =>
  useContext(PianosHotKeysContext);

export const usePianoHotKeyName = ({ noteName, noteNumber }: Note): string => {
  const pianos = usePianosHotKeys();
  const piano = pianos.find((piano) => piano.noteNumber === noteNumber);
  if (!piano) {
    return "";
  }
  return piano.keys[noteName].toUpperCase();
};

export const useAllPianoHotKeyName = (option?: {
  excludingNoteNumber: NoteNumber;
}): string[] => {
  const pianos = usePianosHotKeys();

  const allKeyNames = pianos
    .filter((piano) => piano.noteNumber !== option?.excludingNoteNumber)
    .map(({ keys }) => {
      const keyNames: string[] = [];
      for (const noteName in keys) {
        const keyName = keys[noteName as NoteName];
        if (keyName !== "") {
          keyNames.push(keyName);
        }
      }
      return keyNames;
    })
    .flat();

  return Array.from(new Set(allKeyNames));
};
