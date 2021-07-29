import { SurveyItemResult, SurveyResult } from "../../type/survey";
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

  const itemResults = dbSurvey.items.map((item): SurveyItemResult => {
    switch (item.type) {
      case "Radio": {
        const choices = item.choices.map((c) => c.choice);
        return {
          ...item,
          type: "Radio",
          description: item.description ?? undefined,
          choices,
          result: choices.map((choice) => {
            const count = item.answer.filter(
              (ans) => ans.value === choice
            ).length;
            return { choice, count };
          }),
        };
      }
      case "Checkbox": {
        const choices = item.choices.map((c) => c.choice);
        return {
          ...item,
          type: "Checkbox",
          description: item.description ?? undefined,
          choices,
          result: choices.map((choice) => {
            const count = item.answer.filter(
              (ans) => ans.value === choice
            ).length;
            return { choice, count };
          }),
        };
      }
      case "TextInput": {
        return {
          ...item,
          type: "TextInput",
          description: item.description ?? undefined,
          result: item.answer.map((ans) => ans.value),
        };
      }
      default: {
        assertNever(item.type);
      }
    }
  });

  return {
    surveyId: dbSurvey.id,
    surveyTitle: dbSurvey.title,
    surveyDescription: dbSurvey.description ?? undefined,
    itemResults,
  };
};
