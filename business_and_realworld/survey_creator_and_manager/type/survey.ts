type SurveyItemBase = {
  id: string;
  type: string;
  question: string;
  description?: string;
};

type Radio = "Radio";
export type SurveyRadioItem = Extract<
  {
    id: string;
    type: Radio;
    question: string;
    description?: string;
    choices: string[];
  },
  SurveyItemBase
>;
export type SurveyRadioAnswer = { type: Radio; value: string };

type Checkbox = "Checkbox";
export type SurveyCheckboxItem = Extract<
  {
    id: string;
    type: Checkbox;
    question: string;
    description?: string;
    choices: string[];
  },
  SurveyItemBase
>;
export type SurveyCheckboxAnswer = { type: Checkbox; value: string[] };

type TextInput = "TextInput";
export type SurveyTextInputItem = Extract<
  { id: string; type: TextInput; question: string; description?: string },
  SurveyItemBase
>;
export type SurveyTextInputAnswer = { type: TextInput; value: string };

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
  startTime: string;
  endTime: string;
  items: SurveyItem[];
};
