import { Box, Input } from "@chakra-ui/react";
import React, { ChangeEventHandler } from "react";

type Props = {
  title: string;
  description?: string;
  onChangeTitle: (title: string) => void;
  onChangeDescription: (description: string) => void;
};

const Component: React.FC<Props> = ({
  title,
  description,
  onChangeTitle,
  onChangeDescription,
}) => {
  const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    onChangeTitle(value);
  };

  const handleChangeDescription: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    onChangeDescription(value);
  };

  return (
    <Box bgColor="gray.700" p={10} borderRadius="10px" boxShadow="md">
      <Input
        placeholder="調査タイトル"
        variant="flushed"
        fontSize="3xl"
        h="50px"
        py={5}
        value={title}
        onChange={handleChangeTitle}
      />
      <Input
        mt={5}
        ml={3}
        placeholder="調査の説明"
        variant="flushed"
        fontSize="xl"
        w="80%"
        value={description}
        onChange={handleChangeDescription}
      />
    </Box>
  );
};

export const SurveyHeaderInput = Component;
