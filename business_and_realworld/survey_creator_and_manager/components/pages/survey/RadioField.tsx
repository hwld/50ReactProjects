import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React from "react";
import { SurveyRadioAnswer } from "../../../type/survey";

type Props = {
  radioItemAnswer: SurveyRadioAnswer;
  changeAnswer: (answer: SurveyRadioAnswer) => void;
};

const Component: React.VFC<Props> = ({ radioItemAnswer, changeAnswer }) => {
  const handleChange = (value: string) => {
    changeAnswer({ ...radioItemAnswer, value });
  };

  // next.jsを使ってるときに自動でnameとidをつけると 'id' did not match のエラーが出ちゃう
  return (
    <RadioGroup
      value={radioItemAnswer.value}
      onChange={handleChange}
      name={`${radioItemAnswer.question}-${radioItemAnswer.id}`}
    >
      <Stack>
        {radioItemAnswer.choices.map((choice, index) => {
          return (
            <Radio
              id={`${radioItemAnswer.id}-${index}`}
              key={choice}
              value={choice}
            >
              {choice}
            </Radio>
          );
        })}
      </Stack>
    </RadioGroup>
  );
};

export const RadioField = Component;
