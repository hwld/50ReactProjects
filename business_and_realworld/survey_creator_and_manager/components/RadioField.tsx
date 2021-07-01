import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { SurveyRadioItem } from "../type/survey";

type Props = {
  radioItem: SurveyRadioItem;
};

const Component: React.VFC<Props> = ({ radioItem }) => {
  const [value, setValue] = useState(radioItem.choices[0]);

  return (
    <RadioGroup value={value} onChange={setValue}>
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
