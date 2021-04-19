import { chakra } from "@chakra-ui/react";
import React, { Dispatch } from "react";
import { HotKeys, KeyMapOptions } from "react-hotkeys";
import { Piano, PianosAction } from "../hooks/usePianos";
import { isNoteName, Note, NoteName, NoteNumber } from "../lib/sound";

type PianoEventType = "KEYDOWN" | "KEYUP";
type PianoEvent = `${NoteName}${NoteNumber}_${PianoEventType}`;
type RejectOtherThanPianoEvent<T> = T &
  { [T in Exclude<string, PianoEvent>]: never };
type PianoEventKeyMap = RejectOtherThanPianoEvent<
  { [T in PianoEvent]?: KeyMapOptions }
>;
type PianoEventHandlers = RejectOtherThanPianoEvent<
  { [T in PianoEvent]?: (keyEvent?: KeyboardEvent) => void }
>;

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

type Props = {
  className?: string;
  pianos: Piano[];
  dispatchToPianos: Dispatch<PianosAction>;
  playSound?: (note: Note) => void;
  role?: string;
};

const Component: React.FC<Props> = ({
  children,
  className,
  pianos,
  dispatchToPianos,
  playSound = () => {},
  role,
}) => {
  const keyMap = pianos.reduce<PianoEventKeyMap>((keyMap, piano) => {
    return { ...keyMap, ...createPianoEventKeyMap(piano) };
  }, {});

  const handlers = pianos.reduce<PianoEventHandlers>((handlers, piano) => {
    return {
      ...handlers,
      ...createPianoEventHandlers(piano, dispatchToPianos, playSound),
    };
  }, {});

  const handleBlur = () => {
    dispatchToPianos({ type: "resetPressed" });
  };

  return (
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
  );
};

export const PianosHotkeys = chakra(Component);
