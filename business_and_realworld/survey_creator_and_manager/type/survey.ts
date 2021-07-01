export type ItemType = "Radio" | "Checkbox" | "TextInput";
type SurveyItemBase = {
  id: string;
  question: string;
  description?: string;
  type: ItemType;
};

type SurveyRadioAnswer = { type: "Radio"; value: string };
export type SurveyRadioItem = SurveyItemBase &
  SurveyRadioAnswer & {
    choices: string[];
  };

type SurveyCheckboxAnswer = { type: "Checkbox"; value: string[] };
export type SurveyCheckboxItem = SurveyItemBase &
  SurveyCheckboxAnswer & {
    choices: string[];
  };

type SurveyTextInputAnswer = { type: "TextInput"; value: string };
export type SurveyTextInputItem = SurveyItemBase & SurveyTextInputAnswer;

export type SurveyItemAnswer =
  | SurveyRadioAnswer
  | SurveyCheckboxAnswer
  | SurveyTextInputAnswer;

export type SurveyItem =
  | SurveyRadioItem
  | SurveyCheckboxItem
  | SurveyTextInputItem;

export type Survey = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  items: SurveyItem[];
};
