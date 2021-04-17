import { chakra } from "@chakra-ui/react";
import React, { createContext, Dispatch, useContext } from "react";
import { HotKeys, HotKeysProps, KeyMapOptions } from "react-hotkeys";
import { Piano, NoteNameKeyMap, PianosAction } from "../hooks/usePianos";
import { isNoteName, Note, NoteName, NoteNumber } from "../lib/sound";

type PianoKeyMap = { noteNumber: NoteNumber } & NoteNameKeyMap;

type EventKeyMap = { [T in string]: KeyMapOptions };
type EventHandlers = NonNullable<HotKeysProps["handlers"]>;

const createPianoEventKeyMap = ({ noteNumber, keyMap }: Piano): EventKeyMap => {
  const keyMaps: EventKeyMap = {};
  for (const noteName in keyMap) {
    const key = keyMap[noteName as NoteName];
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

const createPianoEventHandlers = (
  { noteNumber, keyMap }: Piano,
  dispatchPianos: Dispatch<PianosAction>,
  playSound: (note: Note) => void
): EventHandlers => {
  let handlers: EventHandlers = {};
  for (const property in keyMap) {
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
      keyMap: EventKeyMap;
      handlers: EventHandlers;
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
