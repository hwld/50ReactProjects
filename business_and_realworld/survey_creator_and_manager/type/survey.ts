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
export type SurveyRadioAnswer = SurveyRadio & {
  value: string;
};
export type SurveyRadioResult = SurveyRadio & {
  result: { choice: string; count: number }[];
};

// Checkbox
export type SurveyCheckbox = SurveyItemBase & {
  type: "Checkbox";
  choices: string[];
};
export type SurveyCheckboxAnswer = SurveyCheckbox & {
  value: string[];
};
export type SurveyCheckboxResult = SurveyCheckbox & {
  result: { choice: string; count: number }[];
};

// TextInput
export type SurveyTextInput = SurveyItemBase & {
  type: "TextInput";
};
export type SurveyTextInputAnswer = SurveyTextInput & {
  value: string;
};
export type SurveyTextInputResult = SurveyTextInput & {
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
  itemAnswers: SurveyItemAnswer[];
};

export type SurveyResult = {
  surveyId: Survey["id"];
  surveyTitle: Survey["title"];
  surveyDescription: Survey["description"];
  itemResults: SurveyItemResult[];
};
