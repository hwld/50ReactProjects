import { Box, chakra, Select } from "@chakra-ui/react";
import React, { ChangeEventHandler } from "react";
import { isSurveyItemType, SurveyItemType } from "../../type/survey";
import { SurveyItemTypeSelectOption } from "./SurveyItemTypeSelectOption";

type Props = {
  className?: string;
  onChange: (type: SurveyItemType) => void;
};

const Component: React.FC<Props> = ({ className, onChange }) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    if (isSurveyItemType(value)) {
      onChange(value);
    }
  };

  return (
    // SelectにclassNameを渡すと、select_wrapperではなくその内側のselectにスタイルがあたって、
    // marginが思ったとおりに設定できないのでBoxでラップする
    <Box className={className}>
      <Select variant="outline" onChange={handleChange}>
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
    </Box>
  );
};

export const SurveyItemTypeSelect = chakra(Component);
