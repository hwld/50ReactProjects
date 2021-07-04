import React, { ReactNode } from "react";
import { SurveyItemType } from "../../type/survey";

type Props = {
  children: ReactNode;
  value: SurveyItemType;
};

const Component: React.VFC<Props> = ({ children, value }) => {
  return <option value={value}>{children}</option>;
};

export const SurveyItemTypeSelectOption = Component;
