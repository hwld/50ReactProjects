import React, { Dispatch, useMemo, useState } from "react";
import { HotKeys, HotKeysProps, KeyMap } from "react-hotkeys";
import { Synth } from "tone";
import { PianosAction } from "../hooks/usePianos";
import { NoteName, PianoObj } from "../utils";

type Handlers = HotKeysProps["handlers"];

type KeyMapAndHandlers = { keyMap: KeyMap; handlers: Handlers };

const createPianoKeyMap = ({ noteNumber, keys }: PianoObj): KeyMap => {
  const keyMaps: KeyMap = {};
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
  dispatchPianos: Dispatch<PianosAction>
): Handlers => {
  let handlers: Handlers = {};
  for (const property in keys) {
    const noteName = property as NoteName;
    handlers = {
      ...handlers,
      [`${noteName}${noteNumber}_KEYDOWN`]: () => {
        new Synth()
          .toDestination()
          .triggerAttackRelease(`${noteName}${noteNumber}`, "8n");

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
};

const Component: React.FC<Props> = ({ children, pianos, dispatchToPianos }) => {
  const { keyMap, handlers } = pianos.reduce<KeyMapAndHandlers>(
    ({ keyMap, handlers }, piano) => ({
      keyMap: { ...keyMap, ...createPianoKeyMap(piano) },
      handlers: {
        ...handlers,
        ...createPianoKeyHandlers(piano, dispatchToPianos),
      },
    }),
    { keyMap: {}, handlers: {} }
  );

  return (
    <HotKeys keyMap={keyMap} handlers={handlers} allowChanges={true}>
      {children}
    </HotKeys>
  );
};

export const PianoHotKeys = Component;
