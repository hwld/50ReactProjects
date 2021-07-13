import { Box, BoxProps, Heading, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { SurveyItemAndAnswer, SurveyItemAnswer } from "../../type/survey";
import { CheckboxField } from "./CheckboxField";
import { RadioField } from "./RadioField";
import { TextInputField } from "./TextInputField";

type Props = {
  item: SurveyItemAndAnswer;
  setAnswer: (itemId: string, answer: SurveyItemAnswer) => void;
} & BoxProps;

const Component: React.VFC<Props> = ({ item, setAnswer, ...boxProps }) => {
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

  return (
    <Box {...boxProps} key={item.id} p={5}>
      <Box mb={3}>
        <Heading size="md">{item.question}</Heading>
        <Text>{item.description}</Text>
      </Box>
      <Box ml={3}>{inputField}</Box>
    </Box>
  );
};

export const SurveyItem = Component;
