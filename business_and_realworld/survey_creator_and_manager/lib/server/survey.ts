import { Prisma } from "@prisma/client";
import { Survey, SurveyItem } from "../../type/survey";
import { assertNever } from "../../utils/asertNever";
import prisma from "./prisma";

// DBSurveyはSurveyと違ってtypeとitemの関連がない。
// 例えば、Surveyではtypeが"TextInput"であればitemオブジェクトにchoicesプロパティは存在しないが、
// DBSurveyではtypeに関係なくitemオブジェクトにchoicesプロパティを含んでいる。
type DBSurvey = Prisma.SurveyGetPayload<{
  include: { items: { include: { choices: true } } };
}>;

const convertDBSurveyItemToSurveyItem = (
  dbSurveyItem: DBSurvey["items"][number]
): SurveyItem => {
  switch (dbSurveyItem.type) {
    case "Radio": {
      return {
        ...dbSurveyItem,
        type: dbSurveyItem.type,
        description: dbSurveyItem.description ?? undefined,
        choices: dbSurveyItem.choices.map((c) => c.choice),
      };
    }
    case "Checkbox": {
      return {
        ...dbSurveyItem,
        type: dbSurveyItem.type,
        description: dbSurveyItem.description ?? undefined,
        choices: dbSurveyItem.choices.map((c) => c.choice),
      };
    }
    case "TextInput": {
      return {
        ...dbSurveyItem,
        type: dbSurveyItem.type,
        description: dbSurveyItem.description ?? undefined,
      };
    }
    default: {
      assertNever(dbSurveyItem.type);
    }
  }
};

const convertDbSurveyToSurvey = (dbSurvey: DBSurvey): Survey => {
  const survey: Survey = {
    id: dbSurvey.id,
    description: dbSurvey.description ?? undefined,
    items: dbSurvey.items.map((item) => convertDBSurveyItemToSurveyItem(item)),
    title: dbSurvey.title,
  };
  return survey;
};

const fetchDbSurvey = async (
  surveyId: string
): Promise<DBSurvey | undefined> => {
  const dbSurve = await prisma.survey.findFirst({
    where: { id: surveyId },
    include: { items: { include: { choices: true } } },
  });

  return dbSurve ? dbSurve : undefined;
};

const fetchAllDbSurveys = async (): Promise<DBSurvey[]> => {
  return prisma.survey.findMany({
    include: { items: { include: { choices: true } } },
  });
};

export const fetchSurvey = async (
  surveyId: string
): Promise<Survey | undefined> => {
  const dbSurvey = await fetchDbSurvey(surveyId);
  if (!dbSurvey) {
    return;
  }

  return convertDbSurveyToSurvey(dbSurvey);
};

export const fetchAllSurvey = async (): Promise<Survey[]> => {
  const allDbSurveys = await fetchAllDbSurveys();
  return allDbSurveys.map((dbSurvey) => convertDbSurveyToSurvey(dbSurvey));
};

export const postSurvey = async (survey: Survey): Promise<Survey> => {
  const surveyItemsCreateObj: Prisma.SurveyItemCreateWithoutSurveyInput[] =
    survey.items.map((item) => {
      switch (item.type) {
        case "Radio":
        case "Checkbox":
          return {
            type: item.type,
            question: item.question,
            description: item.description,
            required: item.required,
            choices: {
              create: item.choices.map((choice) => ({ choice })),
            },
          };
        case "TextInput":
          return {
            type: item.type,
            question: item.question,
            description: item.description,
            required: item.required,
          };
        default:
          assertNever(item);
      }
    });

  await prisma.survey.create({
    data: {
      title: survey.title,
      description: survey.description,
      items: {
        create: surveyItemsCreateObj,
      },
    },
    include: { items: { include: { choices: true } } },
  });

  return survey;
};

export const deleteSurvey = async (surveyId: string) => {
  await prisma.survey.delete({ where: { id: surveyId } });
};
