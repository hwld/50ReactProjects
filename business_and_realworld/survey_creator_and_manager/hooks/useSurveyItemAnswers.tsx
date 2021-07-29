import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { SurveyItemAnswer } from "../type/survey";
import { assertNever } from "../utils/asertNever";

type SurveyAction = {
  type: "changeAnswer";
  itemAnswer: SurveyItemAnswer;
};

const reducer = (
  itemAnswers: SurveyItemAnswer[],
  action: SurveyAction
): SurveyItemAnswer[] => {
  switch (action.type) {
    case "changeAnswer": {
      return itemAnswers.map((itemAnswer) => {
        if (itemAnswer.id !== action.itemAnswer.id) {
          return itemAnswer;
        }
        return action.itemAnswer;
      });
    }
    default:
      assertNever(action.type);
  }
};

export const useSurveyItemAnswers = (surveyItemAnswers: SurveyItemAnswer[]) => {
  const [itemAnswers, dispatch] = useReducer(reducer, surveyItemAnswers);
  const [errors, setErrors] = useState<{ itemId: string; type: "required" }[]>(
    []
  );
  const isErrorCheckingEnabled = useRef(false);

  const changeAnswer = useCallback((itemAnswer: SurveyItemAnswer) => {
    dispatch({ type: "changeAnswer", itemAnswer });
  }, []);

  const enableErrorChecking = () => {
    isErrorCheckingEnabled.current = true;
  };

  const validateRequired = (itemAnswer: SurveyItemAnswer): boolean => {
    switch (itemAnswer.type) {
      case "Radio": {
        return itemAnswer.value !== "";
      }
      case "Checkbox": {
        return itemAnswer.value.length !== 0;
      }
      case "TextInput": {
        return itemAnswer.value !== "";
      }
    }
  };

  const validateAnswers = useCallback((): boolean => {
    let isCorrect = true;
    itemAnswers.forEach((itemAnswer) => {
      if (itemAnswer.required && !validateRequired(itemAnswer)) {
        setErrors((errors) => [
          ...errors.filter((error) => error.itemId !== itemAnswer.id),
          { itemId: itemAnswer.id, type: "required" },
        ]);
        isCorrect = false;
      } else {
        setErrors((errors) =>
          errors.filter((error) => error.itemId !== itemAnswer.id)
        );
      }
    });

    return isCorrect;
  }, [itemAnswers]);

  // 回答が変更された際にエラーをチェックする
  useEffect(() => {
    if (!isErrorCheckingEnabled.current) {
      return;
    }
    validateAnswers();
  }, [validateAnswers]);

  return {
    itemAnswers,
    changeAnswer,
    enableErrorChecking,
    errors,
    validateAnswers,
  };
};
