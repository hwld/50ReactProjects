import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React from "react";
import { SurveyRadio, SurveyRadioAnswer } from "../../../type/survey";

type Props = {
  radioItem: SurveyRadio & SurveyRadioAnswer;
  setAnswer: (itemId: string, answer: SurveyRadioAnswer) => void;
};

const Component: React.VFC<Props> = ({ radioItem, setAnswer }) => {
  const handleChange = (value: string) => {
    setAnswer(radioItem.id, { type: "Radio", value });
  };

  // next.jsを使ってるときに自動でnameとidをつけると 'id' did not match のエラーが出ちゃう
  return (
    <RadioGroup
      value={radioItem.value}
      onChange={handleChange}
      name={`${radioItem.question}-${radioItem.id}`}
    >
      <Stack>
        {radioItem.choices.map((choice, index) => {
          return (
            <Radio id={`${radioItem.id}-${index}`} key={choice} value={choice}>
              {choice}
            </Radio>
          );
        })}
      </Stack>
    </RadioGroup>
  );
};

export const RadioField = Component;
