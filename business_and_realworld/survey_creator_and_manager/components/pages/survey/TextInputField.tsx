import { Box, Input } from "@chakra-ui/react";
import React, { ChangeEventHandler } from "react";
import { SurveyTextInputAnswer } from "../../../type/survey";

type Props = {
  textInputItemAnswer: SurveyTextInputAnswer;
  changeAnswer: (itemAnswer: SurveyTextInputAnswer) => void;
};

const Component: React.VFC<Props> = ({ textInputItemAnswer, changeAnswer }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    changeAnswer({ ...textInputItemAnswer, value });
  };

  return (
    <Box>
      <Input value={textInputItemAnswer.value} onChange={handleChange} />
    </Box>
  );
};

export const TextInputField = Component;
