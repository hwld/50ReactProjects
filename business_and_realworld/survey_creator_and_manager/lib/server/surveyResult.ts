import { SurveyItemAnswer } from "@prisma/client";
import {
  SurveyCheckboxResults,
  SurveyItemAndResult,
  SurveyRadioResults,
  SurveyResult,
  SurveyTextInputResults,
} from "../../type/survey";
import { assertNever } from "../../utils/asertNever";
import prisma from "./prisma";

export const aggregateBySurvey = async (
  surveyId: string
): Promise<SurveyResult | undefined> => {
  const dbSurvey = await prisma.survey.findFirst({
    where: { id: surveyId },
    include: { items: { include: { choices: true, answer: true } } },
  });
  if (!dbSurvey) {
    return;
  }

  const items = dbSurvey.items.map((item): SurveyItemAndResult => {
    switch (item.type) {
      case "Radio": {
        const choices = item.choices.map((c) => c.choice);
        const radioResults = aggregateRadioAnswers(choices, item.answer);
        return {
          id: item.id,
          question: item.question,
          description: item.description ?? undefined,
          choices,
          ...radioResults,
        };
      }
      case "Checkbox": {
        const choices = item.choices.map((c) => c.choice);
        const checkboxResults = aggregateCheckBoxAnswers(choices, item.answer);
        return {
          id: item.id,
          question: item.question,
          description: item.description ?? undefined,
          choices,
          ...checkboxResults,
        };
      }
      case "TextInput": {
        const textInputResults = aggregateTextInputAnswers(item.answer);
        return {
          id: item.id,
          question: item.question,
          description: item.description ?? undefined,
          ...textInputResults,
        };
      }
      default: {
        assertNever(item.type);
      }
    }
  });

  return {
    id: dbSurvey.id,
    title: dbSurvey.title,
    description: dbSurvey.description ?? undefined,
    items,
  };
};

const aggregateRadioAnswers = (
  choices: string[],
  answers: SurveyItemAnswer[]
): SurveyRadioResults => {
  return {
    type: "Radio",
    results: choices.map((choice) => {
      const count = answers.filter((ans) => ans.value === choice).length;
      return { choice, count };
    }),
  };
};

const aggregateCheckBoxAnswers = (
  choices: string[],
  answers: SurveyItemAnswer[]
): SurveyCheckboxResults => {
  return {
    type: "Checkbox",
    results: choices.map((choice) => {
      const count = answers.filter((ans) => ans.value === choice).length;
      return { choice, count };
    }),
  };
};

const aggregateTextInputAnswers = (
  answers: SurveyItemAnswer[]
): SurveyTextInputResults => {
  return { type: "TextInput", texts: answers.map((ans) => ans.value) };
};
