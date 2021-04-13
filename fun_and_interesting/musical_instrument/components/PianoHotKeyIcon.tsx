import { Kbd } from "@chakra-ui/react";
import React from "react";

type Props = {
  keyName: string;
};

const Component: React.FC<Props> = ({ keyName }) => {
  return (
    <Kbd
      mb={1}
      bgColor={keyName !== "" ? "green.300" : "red.300"}
      borderColor={keyName !== "" ? "green.400" : "red.400"}
    >
      {keyName || "No"}
    </Kbd>
  );
};

export const PianoHotKeyIcon = Component;
