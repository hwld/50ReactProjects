import { Prisma } from "@prisma/client";
import { Survey } from "../../type/survey";
import { assertNever } from "../../utils/asertNever";
import prisma from "./prisma";

type DBSurvey = Prisma.SurveyGetPayload<{
  include: { items: { include: { choices: true } } };
}>;

const DBSurveyToSurvey = (dbSurvey: DBSurvey): Survey => {
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

export const getSurvey = async (
  surveyId: string
): Promise<Survey | undefined> => {
  const dbSurvey = await prisma.survey.findFirst({
    where: { id: surveyId },
    include: { items: { include: { choices: true } } },
  });

  if (!dbSurvey) {
    return;
  }

  return DBSurveyToSurvey(dbSurvey);
};

export const getAllSurvey = async (): Promise<Survey[]> => {
  const allDbSurveys = await prisma.survey.findMany({
    include: { items: { include: { choices: true } } },
  });

  return allDbSurveys.map((dbSurvey) => DBSurveyToSurvey(dbSurvey));
};
