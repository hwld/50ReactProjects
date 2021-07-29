import { Box, BoxProps, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { SurveyItemAndAnswer, SurveyItemAnswer } from "../../../type/survey";
import { CheckboxField } from "./CheckboxField";
import { RadioField } from "./RadioField";
import { TextInputField } from "./TextInputField";

type Props = {
  item: SurveyItemAndAnswer;
  error?: { itemId: string; type: "required" };
  setAnswer: (itemId: string, answer: SurveyItemAnswer) => void;
} & BoxProps;

const Component: React.VFC<Props> = ({
  item,
  error,
  setAnswer,
  ...boxProps
}) => {
  const inputField = useMemo(() => {
    switch (item.type) {
      case "Radio":
        return <RadioField radioItem={item} setAnswer={setAnswer} />;
      case "Checkbox":
        return <CheckboxField checkBoxItem={item} setAnswer={setAnswer} />;
      case "TextInput":
        return <TextInputField textInputItem={item} setAnswer={setAnswer} />;
    }
  }, [item, setAnswer]);

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
      key={item.id}
      p={5}
      borderWidth="1px"
      borderColor={error && "red.400"}
    >
      <Box mb={3}>
        <Flex align="center">
          <Heading size="md">{item.question}</Heading>
          {item.required && (
            <Text ml={1} color="red.400">
              *
            </Text>
          )}
        </Flex>
        <Text>{item.description}</Text>
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
