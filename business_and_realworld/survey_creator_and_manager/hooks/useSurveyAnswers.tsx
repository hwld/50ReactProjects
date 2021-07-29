import { useCallback, useEffect, useReducer, useRef, useState } from "react";
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

const createSurveyItemAndAnswer = (
  item: SurveyItemAndAnswer,
  answer: SurveyItemAnswer
): SurveyItemAndAnswer => {
  switch (item.type) {
    case "Radio": {
      if (answer.type === item.type) {
        return { ...item, value: answer.value };
      }
      return item;
    }
    case "Checkbox": {
      if (answer.type === item.type) {
        return { ...item, value: answer.value };
      }
      return item;
    }
    case "TextInput": {
      if (answer.type === item.type) {
        return { ...item, value: answer.value };
      }
      return item;
    }
    default: {
      assertNever(item);
    }
  }
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
        return createSurveyItemAndAnswer(item, action.answer);
      });
    }
    default:
      assertNever(action.type);
  }
};

export const useSurveyAnswers = (
  surveyItemAndAnswer: SurveyItemAndAnswer[]
) => {
  const [itemAndAnswers, dispatch] = useReducer(reducer, surveyItemAndAnswer);
  const [errors, setErrors] = useState<{ itemId: string; type: "required" }[]>(
    []
  );
  const isErrorCheckingEnabled = useRef(false);

  const setAnswer = useCallback((itemId: string, answer: SurveyItemAnswer) => {
    dispatch({ type: "setAnswer", itemId, answer });
  }, []);

  const enableErrorChecking = () => {
    isErrorCheckingEnabled.current = true;
  };

  const validateRequired = (itemAndAnswer: SurveyItemAndAnswer): boolean => {
    switch (itemAndAnswer.type) {
      case "Radio": {
        return itemAndAnswer.value !== "";
      }
      case "Checkbox": {
        return itemAndAnswer.value.length !== 0;
      }
      case "TextInput": {
        return itemAndAnswer.value !== "";
      }
    }
  };

  const validateAnswers = useCallback((): boolean => {
    let isError = false;
    itemAndAnswers.forEach((itemAndAnswer) => {
      if (itemAndAnswer.required && !validateRequired(itemAndAnswer)) {
        setErrors((errors) => [
          ...errors.filter((error) => error.itemId !== itemAndAnswer.id),
          { itemId: itemAndAnswer.id, type: "required" },
        ]);
        isError = true;
      } else {
        setErrors((errors) =>
          errors.filter((error) => error.itemId !== itemAndAnswer.id)
        );
      }
    });

    return !isError;
  }, [itemAndAnswers]);

  // 回答が変更された際にエラーをチェックする
  useEffect(() => {
    if (!isErrorCheckingEnabled.current) {
      return;
    }
    validateAnswers();
  }, [validateAnswers]);

  return {
    items: itemAndAnswers,
    setAnswer,
    enableErrorChecking,
    errors,
    validateAnswers,
  };
};
