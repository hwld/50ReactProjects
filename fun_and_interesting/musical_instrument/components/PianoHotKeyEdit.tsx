import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Center, Grid } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/react";
import React from "react";
import { NoteName } from "../utils";

type Props = {
  className?: string;
  onChange?: (noteName: NoteName, key: string) => void;
};

const Component: React.FC<Props> = ({ className, onChange }) => {
  const noteNames: NoteName[] = [
    "C",
    "D",
    "E",
    "F",
    "G",
    "A",
    "B",
    "C#",
    "D#",
    "E#",
    "G#",
    "A#",
  ];

  const handleChange = (noteName: NoteName, key: string) => {
    if (onChange) {
      onChange(noteName, key);
    }
  };

  return (
    <Grid
      className={className}
      w="100%"
      templateColumns="repeat(3, 80px)"
      gap={3}
      justifyContent="center"
    >
      {noteNames.map((noteName) => (
        <InputGroup w="80px" key={noteName}>
          <InputLeftElement
            children={
              <Center boxSize="30px" borderRadius="30%" bg="blue.300">
                {noteName}
              </Center>
            }
          />
          <Input
            bg="gray.100"
            w="80px"
            maxLength={1}
            onChange={({ target }) => handleChange(noteName, target.value)}
          />
        </InputGroup>
      ))}
    </Grid>
  );
};

export const PianoHotKeyEdit = chakra(Component);
