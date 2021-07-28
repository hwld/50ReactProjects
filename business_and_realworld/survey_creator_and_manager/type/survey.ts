const allSurveyItemType = ["Radio", "Checkbox", "TextInput"] as const;
export type SurveyItemType = typeof allSurveyItemType[number];

export function isSurveyItemType(value: string): value is SurveyItemType {
  return allSurveyItemType.includes(value as SurveyItemType);
}

type SurveyItemBase = {
  id: string;
  type: SurveyItemType;
  question: string;
  description?: string;
  required: boolean;
};

// Radio
export type SurveyRadio = SurveyItemBase & {
  type: "Radio";
  choices: string[];
};
export type SurveyRadioAnswer = {
  type: SurveyRadio["type"];
  value: string;
};
export type SurveyRadioResult = {
  type: SurveyRadio["type"];
  result: { choice: string; count: number }[];
};

// Checkbox
export type SurveyCheckbox = SurveyItemBase & {
  type: "Checkbox";
  choices: string[];
};
export type SurveyCheckboxAnswer = {
  type: SurveyCheckbox["type"];
  value: string[];
};
export type SurveyCheckboxResult = {
  type: SurveyCheckbox["type"];
  result: { choice: string; count: number }[];
};

// TextInput
export type SurveyTextInput = SurveyItemBase & {
  type: "TextInput";
};
export type SurveyTextInputAnswer = {
  type: SurveyTextInput["type"];
  value: string;
};
export type SurveyTextInputResult = {
  type: SurveyTextInput["type"];
  result: string[];
};

export type SurveyItem = SurveyRadio | SurveyCheckbox | SurveyTextInput;

export type SurveyItemAnswer =
  | SurveyRadioAnswer
  | SurveyCheckboxAnswer
  | SurveyTextInputAnswer;

export type SurveyItemResult =
  | SurveyRadioResult
  | SurveyCheckboxResult
  | SurveyTextInputResult;

export type SurveyItemAndAnswer = SurveyItem & SurveyItemAnswer;
export type SurveyItemAndResult = SurveyItem & SurveyItemResult;

export type Survey = {
  id: string;
  title: string;
  description?: string;
  items: SurveyItem[];
};

export type SurveyAnswer = {
  surveyId: Survey["id"];
  surveyTitle: Survey["title"];
  surveyDescription: Survey["description"];
  itemAndAnswers: SurveyItemAndAnswer[];
};

export type SurveyResult = {
  surveyId: Survey["id"];
  surveyTitle: Survey["title"];
  surveyDescription: Survey["description"];
  itemAndResults: SurveyItemAndResult[];
};
