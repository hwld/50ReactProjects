import { Prisma, SurveyItemAnswer } from "@prisma/client";
import {
  Survey,
  SurveyAnswer,
  SurveyCheckboxResults,
  SurveyItemAndResults,
  SurveyRadioResults,
  SurveyResult,
  SurveyTextInputResults,
} from "../../type/survey";
import { assertNever } from "../../utils/asertNever";
import prisma from "./prisma";

type DBSurvey = Prisma.SurveyGetPayload<{
  include: { items: { include: { choices: true } } };
}>;
type DBSurveyItemAnswer = Prisma.SurveyItemAnswerGetPayload<{
  include: { surveyItem: true };
}>;

const convertDbSurveyToSurvey = (dbSurvey: DBSurvey): Survey => {
  const survey: Survey = {
    id: dbSurvey.id,
    description: dbSurvey.description ?? undefined,
    items: dbSurvey.items.map((item) => {
      switch (item.type) {
        case "Radio": {
          return {
            id: item.id,
            type: item.type,
            description: item.description ?? undefined,
            question: item.question,
            choices: item.choices.map((c) => c.choice),
          };
        }
        case "Checkbox": {
          return {
            id: item.id,
            type: item.type,
            description: item.description ?? undefined,
            question: item.question,
            choices: item.choices.map((c) => c.choice),
          };
        }
        case "TextInput": {
          return {
            id: item.id,
            type: item.type,
            description: item.description ?? undefined,
            question: item.question,
          };
        }
        default: {
          assertNever(item.type);
        }
      }
    }),
    title: dbSurvey.title,
  };

  return survey;
};

const getDbSurvey = async (surveyId: string): Promise<DBSurvey | undefined> => {
  const dbSurve = await prisma.survey.findFirst({
    where: { id: surveyId },
    include: { items: { include: { choices: true } } },
  });

  return dbSurve ? dbSurve : undefined;
};

const getAllDbSurveys = async (): Promise<DBSurvey[]> => {
  return prisma.survey.findMany({
    include: { items: { include: { choices: true } } },
  });
};

export const getSurvey = async (
  surveyId: string
): Promise<Survey | undefined> => {
  const dbSurvey = await getDbSurvey(surveyId);
  if (!dbSurvey) {
    return;
  }

  return convertDbSurveyToSurvey(dbSurvey);
};

export const getAllSurvey = async (): Promise<Survey[]> => {
  const allDbSurveys = await getAllDbSurveys();
  return allDbSurveys.map((dbSurvey) => convertDbSurveyToSurvey(dbSurvey));
};

export const createSurveyAnswer = async (
  surveyId: string
): Promise<SurveyAnswer | undefined> => {
  const dbSurvey = await getDbSurvey(surveyId);
  if (!dbSurvey) {
    return;
  }

  const survey = convertDbSurveyToSurvey(dbSurvey);

  return {
    ...survey,
    items: survey.items.map((item) => {
      switch (item.type) {
        case "Radio":
        case "TextInput": {
          return { ...item, value: "" };
        }
        case "Checkbox": {
          return { ...item, value: [] };
        }
        default: {
          assertNever(item);
        }
      }
    }),
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

export const aggregateBySurvey = async (
  surveyId: string
): Promise<SurveyResult | undefined> => {
  const survey = await prisma.survey.findFirst({
    where: { id: surveyId },
    include: { items: { include: { choices: true, answer: true } } },
  });
  if (!survey) {
    return;
  }

  const items = survey.items.map((item): SurveyItemAndResults => {
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
    id: survey.id,
    title: survey.title,
    description: survey.description ?? undefined,
    items,
  };
};
