import { chakra, Input } from "@chakra-ui/react";
import React, { ChangeEventHandler } from "react";
import { NoteName } from "../lib/sound";

type Props = {
  className?: string;
  noteName: NoteName;
  hotKey: string;
  onChange: (noteName: NoteName, hotKey: string) => void;
};

const Component: React.FC<Props> = ({
  className,
  noteName,
  hotKey,
  onChange,
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    onChange(noteName, target.value);
  };

  return (
    <Input
      className={className}
      bg={hotKey?.length === 1 ? "green.300" : "red.300"}
      border="none"
      boxSize="30px"
      padding="9px"
      maxLength={1}
      value={hotKey}
      onChange={handleChange}
    />
  );
};

export const PianoHotkeyInput = chakra(Component);
