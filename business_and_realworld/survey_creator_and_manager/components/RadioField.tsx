import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React from "react";
import { SurveyRadioAnswer, SurveyRadioItem } from "../type/survey";

type Props = {
  radioItem: SurveyRadioItem & SurveyRadioAnswer;
  setAnswer: (itemId: string, answer: SurveyRadioAnswer) => void;
};

const Component: React.VFC<Props> = ({ radioItem, setAnswer }) => {
  const handleChange = (value: string) => {
    setAnswer(radioItem.id, { type: "Radio", value });
  };

  return (
    <RadioGroup value={radioItem.value} onChange={handleChange}>
      <Stack>
        {radioItem.choices.map((choice) => {
          return (
            <Radio key={choice} value={choice}>
              {choice}
            </Radio>
          );
        })}
      </Stack>
    </RadioGroup>
  );
};

export const RadioField = Component;
