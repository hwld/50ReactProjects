import { Checkbox, Stack } from "@chakra-ui/react";
import React from "react";
import { SurveyCheckboxItem } from "../type/survey";

type Props = {
  checkBoxItem: SurveyCheckboxItem;
};

const Component: React.VFC<Props> = ({ checkBoxItem }) => {
  return (
    <Stack>
      {checkBoxItem.choices.map((choice) => {
        return (
          <Checkbox key={choice} value={choice}>
            {choice}
          </Checkbox>
        );
      })}
    </Stack>
  );
};

export const CheckboxField = Component;
