import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import React from "react";
import { SurveyCheckboxAnswer } from "../../../type/survey";

type Props = {
  checkBoxItemAnswer: SurveyCheckboxAnswer;
  changeAnswer: (itemAnswer: SurveyCheckboxAnswer) => void;
};

const Component: React.VFC<Props> = ({ checkBoxItemAnswer, changeAnswer }) => {
  const handleChange = (value: string[]) => {
    changeAnswer({ ...checkBoxItemAnswer, value });
  };

  return (
    <CheckboxGroup value={checkBoxItemAnswer.value} onChange={handleChange}>
      <Stack>
        {checkBoxItemAnswer.choices.map((choice) => {
          return (
            <Checkbox key={choice} value={choice}>
              {choice}
            </Checkbox>
          );
        })}
      </Stack>
    </CheckboxGroup>
  );
};

export const CheckboxField = Component;
