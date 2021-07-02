import { useCallback, useReducer } from "react";
import { Survey, SurveyItemAndAnswer, SurveyItemAnswer } from "../type/survey";
import { assertNever } from "../utils/asertNever";

const generateSurveyItemAndAnswers = (
  survey: Survey
): SurveyItemAndAnswer[] => {
  return survey.items.map((item) => {
    switch (item.type) {
      case "Radio":
        return { ...item, value: "" };
      case "Checkbox":
        return { ...item, value: [] };
      case "TextInput":
        return { ...item, value: "" };
      default:
        assertNever(item);
    }
  });
};

type SurveyAction = {
  type: "setAnswer";
  itemId: string;
  answer: SurveyItemAnswer;
};

const reducer = (
  items: SurveyItemAndAnswer[],
  action: SurveyAction
): SurveyItemAndAnswer[] => {
  switch (action.type) {
    case "setAnswer": {
      return items.map((item) => {
        if (item.id !== action.itemId) {
          return item;
        }

        switch (item.type) {
          case "Radio": {
            if (action.answer.type === item.type) {
              return { ...item, value: action.answer.value };
            }
            return item;
          }
          case "Checkbox": {
            if (action.answer.type === item.type) {
              return { ...item, value: action.answer.value };
            }
            return item;
          }
          case "TextInput": {
            if (action.answer.type === item.type) {
              return { ...item, value: action.answer.value };
            }
            return item;
          }
          default: {
            assertNever(item);
          }
        }
      });
    }
    default:
      assertNever(action.type);
  }
};

export const useSurvey = (surveySpec: Survey) => {
  const [itemAndAnswers, dispatch] = useReducer(
    reducer,
    generateSurveyItemAndAnswers(surveySpec)
  );

  const setAnswer = useCallback((itemId: string, answer: SurveyItemAnswer) => {
    dispatch({ type: "setAnswer", itemId, answer });
  }, []);

  return { items: itemAndAnswers, setAnswer };
};
