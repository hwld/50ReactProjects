import { Select } from "@chakra-ui/react";
import React, { ChangeEventHandler } from "react";
import { isSurveyItemType, SurveyItemType } from "../../type/survey";
import { SurveyItemTypeSelectOption } from "./SurveyItemTypeSelectOption";

type Props = {
  onChange: (type: SurveyItemType) => void;
};

const Component: React.FC<Props> = ({ onChange }) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    if (isSurveyItemType(value)) {
      onChange(value);
    }
  };

  return (
    <Select onChange={handleChange}>
      <SurveyItemTypeSelectOption value={"Radio"}>
        ラジオボタン
      </SurveyItemTypeSelectOption>
      <SurveyItemTypeSelectOption value={"Checkbox"}>
        チェックボックス
      </SurveyItemTypeSelectOption>
      <SurveyItemTypeSelectOption value={"TextInput"}>
        テキストフィールド
      </SurveyItemTypeSelectOption>
    </Select>
  );
};

export const SurveyItemTypeSelect = Component;
