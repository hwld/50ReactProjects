import { createContext, useContext } from "react";
import { PianosKeyMap, PianosKeyMapForRead } from "../components/PianoHotKeys";
import { Note } from "../lib/sound";

const KeyMapContext = createContext<PianosKeyMap>({});

export const PianosHotKeysProvider: React.FC<{
  keyMap: PianosKeyMap;
}> = ({ children, keyMap }) => {
  // HotKeysにはgetApplicationKeyMap()が用意されているが、
  // keyMapが変更されたときにいちいち呼び出さなくてはいけないため、Contextに独自にkeyMapをもたせる
  return (
    <KeyMapContext.Provider value={keyMap}>{children}</KeyMapContext.Provider>
  );
};

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
