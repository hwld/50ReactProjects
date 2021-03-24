import { Box, chakra } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Character } from "../pages/api/characters/[characterIds]";

type Props = {
  className?: string;
  status: Character["status"];
};

const Component: React.FC<Props> = ({ className, status }) => {
  const color = useMemo(() => {
    if (status === "Alive") return "green.500";
    if (status === "Dead") return "red.500";
    if (status === "unknown") return "yellow.500";
  }, [status]);

  return (
    <Box
      className={className}
      bg={color}
      boxSize="0.7rem"
      borderRadius="50%"
      border="1px"
      borderColor="gray.900"
    />
  );
};

export const CharacterStatusIcon = chakra(Component);
