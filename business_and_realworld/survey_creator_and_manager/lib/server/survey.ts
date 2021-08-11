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

export const createSurvey = async (): Promise<string> => {
  const survey = await prisma.survey.create({ data: { title: "無題の調査" } });
  return survey.id;
};

type SurveyItemCreateAndUpdateInput =
  Prisma.SurveyItemUpdateWithoutSurveyInput &
    Prisma.SurveyItemCreateWithoutSurveyInput;

export const updateSurvey = async (survey: Survey): Promise<Survey> => {
  const buildSurveyItemUpdate = (
    item: SurveyItem
  ): Prisma.SurveyItemUpdateArgs => {
    switch (item.type) {
      case "Radio":
      case "Checkbox": {
        return {
          where: { id: item.id },
          data: {
            type: item.type,
            question: item.question,
            description: item.description,
            choices: {
              deleteMany: {},
              create: item.choices.map((choice) => ({ choice })),
            },
            required: item.required,
          },
        };
      }
      case "TextInput": {
        return {
          where: { id: item.id },
          data: {
            type: item.type,
            question: item.question,
            description: item.description,
            required: item.required,
          },
        };
      }
      default: {
        assertNever(item);
      }
    }
  };

  const buildSurveyItemUpdates = (
    items: SurveyItem[]
  ): Prisma.SurveyItemUpdateArgs[] => {
    return items.map((item) => buildSurveyItemUpdate(item));
  };

  const buildSurveyItemCreate = (
    surveyId: string,
    item: SurveyItem
  ): Prisma.SurveyItemCreateArgs => {
    switch (item.type) {
      case "Radio":
      case "Checkbox": {
        return {
          data: {
            type: item.type,
            question: item.question,
            description: item.description,
            choices: {
              create: item.choices.map((choice) => ({ choice })),
            },
            required: item.required,
            survey: { connect: { id: surveyId } },
          },
        };
      }
      case "TextInput": {
        return {
          data: {
            type: item.type,
            question: item.question,
            description: item.description,
            required: item.required,
            survey: { connect: { id: surveyId } },
          },
        };
      }
      default: {
        assertNever(item);
      }
    }
  };

  prisma.$transaction(async (prisma) => {
    const existing = await prisma.survey.findFirst({
      where: { id: survey.id },
      include: { items: true },
    });

    if (!existing) {
      throw new Error("存在しないsurveyの更新");
    }

    // 渡されたsurveyItemのうち、idがdbに存在するものは更新する
    const itemsToUpdate = survey.items.filter((item) =>
      existing.items.map(({ id }) => id).includes(item.id)
    );
    // 渡されたsurveyItemのうち、更新しないものは作成する
    const itemsToCreate = survey.items.filter(
      (item) => !itemsToUpdate.map(({ id }) => id).includes(item.id)
    );

    await prisma.survey.update({
      where: { id: survey.id },
      data: {
        items: {
          update: buildSurveyItemUpdates(itemsToUpdate),
        },
      },
    });

    // 作成するsurveyItemはクライアント側で仮のidがつけられているため、削除するsurveyItemを決めるために
    // 作成後のidを取得する
    let createdIds: string[] = [];
    for (const item of itemsToCreate) {
      const createdItem = await prisma.surveyItem.create(
        buildSurveyItemCreate(survey.id, item)
      );
      createdIds.push(createdItem.id);
    }

    // 渡されたsurveyItemの最終的なidのリスト
    const ids = [...itemsToUpdate.map(({ id }) => id), ...createdIds];
    await prisma.surveyItem.deleteMany({ where: { id: { notIn: ids } } });
  });

  return survey;
};

export const deleteSurvey = async (surveyId: string) => {
  await prisma.survey.delete({ where: { id: surveyId } });
};
