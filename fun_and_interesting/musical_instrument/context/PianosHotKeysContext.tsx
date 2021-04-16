import { chakra } from "@chakra-ui/react";
import React, { createContext, Dispatch, useContext } from "react";
import { HotKeys, HotKeysProps, KeyMapOptions } from "react-hotkeys";
import { KeyboardPiano, PianosAction } from "../hooks/useKeyboardPianos";
import { Note, NoteName } from "../lib/sound";

type PianosKeyMap = { [T in string]: KeyMapOptions };
type PianosKeyMapForRead = { [T in string]: KeyMapOptions | undefined };
type Handlers = NonNullable<HotKeysProps["handlers"]>;

const createPianoKeyMap = ({
  noteNumber,
  keys,
}: KeyboardPiano): PianosKeyMap => {
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
  { noteNumber, keys }: KeyboardPiano,
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

const KeyMapContext = createContext<PianosKeyMap>({});

type PianosHotKeysProviderProps = {
  className?: string;
  pianos: KeyboardPiano[];
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
    <KeyMapContext.Provider value={keyMap}>
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
    </KeyMapContext.Provider>
  );
};
export const PianosHotKeysProvider = chakra(Provider);

export const usePianosHotKeysKeyMap = (): PianosKeyMapForRead =>
  useContext(KeyMapContext);

export const usePianoHotKeyName = ({ noteName, noteNumber }: Note): string => {
  const keyMap = usePianosHotKeysKeyMap();
  const key = keyMap[`${noteName}${noteNumber}_KEYDOWN`]?.sequence;
  if (Array.isArray(key) || key === undefined) {
    return "";
  }

  return key.toUpperCase();
};

export const useAllPianoHotKeyName = (): string[] => {
  const keyMap = usePianosHotKeysKeyMap();

  const allKeyNames: string[] = [];
  for (const entry in keyMap) {
    const keyName = keyMap[entry]?.sequence;
    if (typeof keyName === "string") {
      allKeyNames.push(keyName);
    }
  }

  return Array.from(new Set(allKeyNames));
};
