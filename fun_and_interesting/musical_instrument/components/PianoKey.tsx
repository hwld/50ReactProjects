import { Box, chakra } from "@chakra-ui/react";
import React from "react";

type Props = {
  className?: string;
  pressed?: boolean;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement> &
    React.MouseEventHandler<HTMLButtonElement>;
};

// 視覚要素としてのピアノのキー
const Component: React.FC<Props> = ({
  children,
  className,
  pressed = false,
  onMouseDown,
}) => {
  return (
    <Box
      className={className}
      as="button"
      tabIndex={-1}
      onMouseDown={onMouseDown}
      data-active={pressed ? true : undefined}
      _focus={{ outline: "none" }}
      display="flex"
      flexDir="column"
      justifyContent="flex-end"
      alignItems="center"
      userSelect="none"
    >
      {children}
    </Box>
  );
};

export const PianoKey = chakra(Component);
