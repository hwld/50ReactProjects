import { Prisma } from "@prisma/client";
import { Survey, SurveyAnswer } from "../../type/survey";
import { assertNever } from "../../utils/asertNever";
import prisma from "./prisma";

type DBSurvey = Prisma.SurveyGetPayload<{
  include: { items: { include: { choices: true } } };
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

export const getSurveyAnswer = async (
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

export const getAllSurvey = async (): Promise<Survey[]> => {
  const allDbSurveys = await getAllDbSurveys();
  return allDbSurveys.map((dbSurvey) => convertDbSurveyToSurvey(dbSurvey));
};
