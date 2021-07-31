import { Select, SelectProps } from "@chakra-ui/react";
import React, { ChangeEventHandler } from "react";
import { isSurveyItemType, SurveyItemType } from "../../../type/survey";
import { SurveyItemTypeSelectOption } from "./SurveyItemTypeSelectOption";

type Props = {
  className?: string;
  onChange: (type: SurveyItemType) => void;
} & Omit<SelectProps, "onChange">;

const Component: React.FC<Props> = ({
  className,
  onChange,
  ...selectProps
}) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    if (isSurveyItemType(value)) {
      onChange(value);
    }
  };

  return (
    <Select variant="outline" {...selectProps} onChange={handleChange}>
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
