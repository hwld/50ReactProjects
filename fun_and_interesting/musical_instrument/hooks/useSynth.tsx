import { useState } from "react";
import { Synth } from "tone";

export const useSynth = (): Synth | undefined => {
  const [synth] = useState(() => {
    if (typeof window !== "undefined") {
      return new Synth().toDestination();
    }
  });

  return synth;
};
