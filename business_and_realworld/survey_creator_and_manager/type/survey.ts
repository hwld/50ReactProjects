type Field =
  | {
      type: "Radio";
      choices: string[];
    }
  | {
      type: "Checkbox";
      choices: string[];
    }
  | {
      type: "TextInput";
    };

type SurveyItem = {
  id: string;
  question: string;
  description?: string;
} & Field;

export type Survey = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  items: SurveyItem[];
};

type SurveyAnswer = {
  surveyId: string;
  time: string;
  answers: { itemId: string; value: string | string[] }[];
};
