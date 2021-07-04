const allSurveyItemType = ["Radio", "Checkbox", "TextInput"] as const;
export type SurveyItemType = typeof allSurveyItemType[number];

export function isSurveyItemType(value: string): value is SurveyItemType {
  return allSurveyItemType.includes(value as any);
}

type SurveyItemBase = {
  id: string;
  type: SurveyItemType;
  question: string;
  description?: string;
};

export type SurveyRadioItem = Extract<
  {
    id: string;
    type: "Radio";
    question: string;
    description?: string;
    choices: string[];
  },
  SurveyItemBase
>;
export type SurveyRadioAnswer = {
  type: SurveyRadioItem["type"];
  value: string;
};

export type SurveyCheckboxItem = Extract<
  {
    id: string;
    type: "Checkbox";
    question: string;
    description?: string;
    choices: string[];
  },
  SurveyItemBase
>;
export type SurveyCheckboxAnswer = {
  type: SurveyCheckboxItem["type"];
  value: string[];
};

export type SurveyTextInputItem = Extract<
  { id: string; type: "TextInput"; question: string; description?: string },
  SurveyItemBase
>;
export type SurveyTextInputAnswer = {
  type: SurveyTextInputItem["type"];
  value: string;
};

export type SurveyItem =
  | SurveyRadioItem
  | SurveyCheckboxItem
  | SurveyTextInputItem;

export type SurveyItemAnswer =
  | SurveyRadioAnswer
  | SurveyCheckboxAnswer
  | SurveyTextInputAnswer;

export type SurveyItemAndAnswer = SurveyItem & SurveyItemAnswer;

export type Survey = {
  id: string;
  title: string;
  items: SurveyItem[];
};
