import React, { Dispatch } from "react";
import { HotKeys, HotKeysProps, KeyMapOptions } from "react-hotkeys";
import { PianosHotKeysProvider } from "../context/PianosHotKeysContext";
import { PianoObj, PianosAction } from "../hooks/usePianos";
import { Note, NoteName } from "../lib/sound";

export type PianosKeyMap = { [T in string]: KeyMapOptions };
export type PianosKeyMapForRead = { [T in string]: KeyMapOptions | undefined };
type Handlers = NonNullable<HotKeysProps["handlers"]>;

const createPianoKeyMap = ({ noteNumber, keys }: PianoObj): PianosKeyMap => {
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
  { noteNumber, keys }: PianoObj,
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

type Props = {
  pianos: PianoObj[];
  dispatchToPianos: Dispatch<PianosAction>;
  playSound?: (note: Note) => void;
};

const Component: React.FC<Props> = ({
  children,
  pianos,
  dispatchToPianos,
  playSound = () => {},
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

  return (
    // HotKeysのkeyMapとhandlersを取得するのが面倒なので、コンテキストに入れ直す
    <PianosHotKeysProvider keyMap={keyMap}>
      <HotKeys keyMap={keyMap} handlers={handlers} allowChanges={true}>
        {children}
      </HotKeys>
    </PianosHotKeysProvider>
  );
};

export const PianoHotKeys = Component;
