import { CloseIcon, WarningTwoIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  Button,
  Center,
  Flex,
  IconButton,
  Input,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  type: "Radio" | "Checkbox";
  choices: string[];
  onChangeChoices: (choices: string[]) => void;
  setError: (isError: boolean) => void;
} & BoxProps;

// 選択肢が文字列の配列でしかないため、選択肢を特定するのにインデックスを使用している。
// 問題があれば選択肢にidをつける。
const Component: React.FC<Props> = ({
  type,
  choices,
  onChangeChoices,
  setError,
  ...boxProps
}) => {
  const isError = (choices: string[]) => {
    return choices.some((choice, i) => choices.indexOf(choice) !== i);
  };

  const changeChoice = (index: number, choice: string) => {
    const newChoices = choices.map((c, i) => {
      if (i === index) {
        return choice;
      }
      return c;
    });

    if (isError(newChoices)) {
      setError(true);
    } else {
      setError(false);
    }

    onChangeChoices(newChoices);
  };

  const handleAddChoice = () => {
    let increment = 1;
    while (choices.includes(`選択肢${increment}`)) {
      increment++;
    }

    onChangeChoices([...choices, `選択肢${increment}`]);
  };

  const deleteChoice = (index: number) => {
    const newChoices = choices.filter((_, i) => i != index);

    if (isError(choices)) {
      setError(true);
    } else {
      setError(false);
    }

    onChangeChoices(newChoices);
  };

  return (
    <Box {...boxProps}>
      {choices.map((choice, index) => {
        const isInvalid = choices.indexOf(choice) !== index;

        return (
          <Flex mt={3} key={index}>
            <Center>
              <Box
                rounded={type === "Radio" ? "full" : "sm"}
                boxSize="16px"
                bgColor="gray.50"
                borderWidth="2px"
                borderColor="gray.400"
              />
            </Center>
            <Input
              ml={2}
              borderColor="transparent"
              isInvalid={isInvalid}
              _hover={{
                borderColor: "gray.300",
                _focus: { borderColor: "blue.400" },
              }}
              variant="flushed"
              value={choice}
              onChange={({ target: { value } }) =>
                changeChoice(index, value)
              }
            />
            <Center ml={1} w="30px">
              {isInvalid && <WarningTwoIcon mt={2} color="red.400" />}
            </Center>
            <IconButton
              ml={1}
              bgColor="transparent"
              aria-label="選択肢を削除"
              icon={<CloseIcon />}
              onClick={() => deleteChoice(index)}
            />
          </Flex>
        );
      })}

      <Button
        mt={3}
        color="blue.400"
        variant="outline"
        onClick={handleAddChoice}
      >
        新しい項目を追加する
      </Button>
    </Box>
  );
};

export const EditChoices = Component;
