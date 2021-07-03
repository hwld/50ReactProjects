import { Box, Input } from "@chakra-ui/react";
import React, { ChangeEventHandler } from "react";
import { SurveyTextInputAnswer, SurveyTextInputItem } from "../../type/survey";

type Props = {
  textInputItem: SurveyTextInputItem & SurveyTextInputAnswer;
  setAnswer: (itemId: string, answer: SurveyTextInputAnswer) => void;
};

const Component: React.VFC<Props> = ({ textInputItem, setAnswer }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setAnswer(textInputItem.id, { type: "TextInput", value });
  };

  return (
    <Box>
      <Input value={textInputItem.value} onChange={handleChange} />
    </Box>
  );
};

export const TextInputField = Component;
