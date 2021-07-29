import { Box, BoxProps, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { SurveyItemAnswer } from "../../../type/survey";
import { CheckboxField } from "./CheckboxField";
import { RadioField } from "./RadioField";
import { TextInputField } from "./TextInputField";

type Props = {
  itemAnswer: SurveyItemAnswer;
  error?: { itemId: string; type: "required" };
  changeAnswer: (itemAnswer: SurveyItemAnswer) => void;
} & BoxProps;

const Component: React.VFC<Props> = ({
  itemAnswer,
  error,
  changeAnswer,
  ...boxProps
}) => {
  const inputField = useMemo(() => {
    switch (itemAnswer.type) {
      case "Radio":
        return (
          <RadioField
            radioItemAnswer={itemAnswer}
            changeAnswer={changeAnswer}
          />
        );
      case "Checkbox":
        return (
          <CheckboxField
            checkBoxItemAnswer={itemAnswer}
            changeAnswer={changeAnswer}
          />
        );
      case "TextInput":
        return (
          <TextInputField
            textInputItemAnswer={itemAnswer}
            changeAnswer={changeAnswer}
          />
        );
    }
  }, [itemAnswer, changeAnswer]);

  const errorText = (type: "required") => {
    switch (type) {
      case "required": {
        return "この質問は必須です";
      }
    }
  };

  return (
    <Box
      {...boxProps}
      key={itemAnswer.id}
      p={5}
      borderWidth="1px"
      borderColor={error && "red.400"}
    >
      <Box mb={3}>
        <Flex align="center">
          <Heading size="md">{itemAnswer.question}</Heading>
          {itemAnswer.required && (
            <Text ml={1} color="red.400">
              *
            </Text>
          )}
        </Flex>
        <Text>{itemAnswer.description}</Text>
      </Box>
      <Box ml={3}>{inputField}</Box>
      {error && (
        <Text mt={3} color="red.400">
          {errorText(error.type)}
        </Text>
      )}
    </Box>
  );
};

export const SurveyItem = Component;
