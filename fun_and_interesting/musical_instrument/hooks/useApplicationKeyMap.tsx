import { useEffect, useState } from "react";
import { ApplicationKeyMap, getApplicationKeyMap } from "react-hotkeys";

export const useApplicationKeyMap = (): ApplicationKeyMap | undefined => {
  const [keyMap, setKeyMap] = useState<ApplicationKeyMap>();
  useEffect(() => {
    setKeyMap(getApplicationKeyMap());
  }, []);

  return keyMap;
};
