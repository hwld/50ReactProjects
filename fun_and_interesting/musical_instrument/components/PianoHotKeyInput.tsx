import { chakra, Input } from "@chakra-ui/react";
import React, { ChangeEventHandler, useMemo } from "react";
import { NoteName } from "../lib/sound";

type Props = {
  className?: string;
  noteName: NoteName;
  hotKey: string;
  validate?: ((value: string) => boolean)[];
  onChange: (noteName: NoteName, hotKey: string) => void;
};

const Component: React.FC<Props> = ({
  className,
  noteName,
  hotKey,
  validate = [() => true],
  onChange,
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    onChange(noteName, target.value);
  };

  const isValid = useMemo(() => {
    return validate.every((v) => v(hotKey));
  }, [hotKey, validate]);

  return (
    <Input
      className={className}
      border="none"
      boxSize="30px"
      padding="9px"
      maxLength={1}
      value={hotKey}
      onChange={handleChange}
      data-invalid={isValid ? undefined : "true"}
    />
  );
};

export const PianoHotkeyInput = chakra(Component);
