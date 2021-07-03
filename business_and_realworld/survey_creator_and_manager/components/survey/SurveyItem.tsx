import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { SurveyItemAndAnswer, SurveyItemAnswer } from "../../type/survey";
import { CheckboxField } from "./CheckboxField";
import { RadioField } from "./RadioField";
import { TextInputField } from "./TextInputField";

type Props = {
  item: SurveyItemAndAnswer;
  setAnswer: (itemId: string, answer: SurveyItemAnswer) => void;
};

const Component: React.VFC<Props> = ({ item, setAnswer }) => {
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
    <Box key={item.id}>
      <Heading size="md">{item.question}</Heading>
      <Text>{item.description}</Text>
      {inputField}
    </Box>
  );
};

export const SurveyItem = Component;
