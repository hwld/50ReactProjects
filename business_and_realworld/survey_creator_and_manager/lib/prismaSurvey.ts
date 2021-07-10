import { Choice, Survey as PrismaSurvey, SurveyItem } from "@prisma/client";
import { Survey } from "../type/survey";
import { assertNever } from "../utils/asertNever";
import prisma from "./prisma";

type DBSurvey = PrismaSurvey & {
  items: (SurveyItem & {
    choices: Choice[];
  })[];
};

const DBSurveyToSurvey = (dbSurvey: DBSurvey): Survey => {
  const survey: Survey = {
    id: dbSurvey.id,
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

export const getSurveyFromPrisma = async (
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

export const getAllSurveyFromPrisma = async (): Promise<Survey[]> => {
  const allDbSurveys = await prisma.survey.findMany({
    include: { items: { include: { choices: true } } },
  });

  return allDbSurveys.map((dbSurvey) => DBSurveyToSurvey(dbSurvey));
};
