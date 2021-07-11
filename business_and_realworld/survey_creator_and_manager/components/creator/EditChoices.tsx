import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, chakra, Flex, IconButton, Input } from "@chakra-ui/react";
import React, { useState } from "react";

type Props = {
  className?: string;
  choices: string[];
  onChangeChoices: (choices: string[]) => void;
  setError: (isError: boolean) => void;
};

// 選択肢が文字列の配列でしかないため、選択肢を特定するのにインデックスを使用している。
// 問題があれば選択肢にidをつける。
const Component: React.FC<Props> = ({
  className,
  choices,
  onChangeChoices,
  setError,
}) => {
  const [defaultChoice, setDefaultChoice] = useState(1);

  const handleChangeChoice = (index: number, choice: string) => {
    const newChoices = choices.map((c, i) => {
      if (i === index) {
        return choice;
      }
      return c;
    });

    if (newChoices.every((choice, i) => newChoices.indexOf(choice) === i)) {
      setError(false);
    } else {
      setError(true);
    }

    onChangeChoices(newChoices);
  };

  const handleAddChoice = () => {
    let increment = 0;
    while (choices.includes(`選択肢${defaultChoice + increment}`)) {
      increment++;
    }

    onChangeChoices([...choices, `選択肢${defaultChoice + increment}`]);
    setDefaultChoice((c) => c + increment);
  };

  const handleDeleteChoice = (index: number) => {
    const newChoices = choices.filter((_, i) => i != index);

    if (newChoices.every((choice, i) => newChoices.indexOf(choice) === i)) {
      setError(false);
    } else {
      setError(true);
    }

    onChangeChoices(newChoices);
  };

  return (
    <Box className={className}>
      {choices.map((choice, index) => {
        return (
          <Flex mt={3} key={index}>
            <Input
              variant="flushed"
              value={choice}
              onChange={({ target: { value } }) =>
                handleChangeChoice(index, value)
              }
              isInvalid={choices.indexOf(choice) !== index}
            />
            <IconButton
              ml={3}
              aria-label="選択肢を削除"
              icon={<CloseIcon />}
              borderRadius="10px"
              onClick={() => handleDeleteChoice(index)}
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

export const EditChoices = chakra(Component);
