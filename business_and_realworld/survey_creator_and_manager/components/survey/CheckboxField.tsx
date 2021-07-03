import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import React from "react";
import { SurveyCheckboxAnswer, SurveyCheckboxItem } from "../../type/survey";

type Props = {
  checkBoxItem: SurveyCheckboxItem & SurveyCheckboxAnswer;
  setAnswer: (itemId: string, answer: SurveyCheckboxAnswer) => void;
};

const Component: React.VFC<Props> = ({ checkBoxItem, setAnswer }) => {
  const handleChange = (value: string[]) => {
    setAnswer(checkBoxItem.id, { type: "Checkbox", value });
  };

  return (
    <CheckboxGroup value={checkBoxItem.value} onChange={handleChange}>
      <Stack>
        {checkBoxItem.choices.map((choice) => {
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
