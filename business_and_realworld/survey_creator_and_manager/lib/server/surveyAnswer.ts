import { SurveyAnswer, SurveyItemAndAnswer } from "../../type/survey";
import { assertNever } from "../../utils/asertNever";
import prisma from "./prisma";
import { fetchSurvey } from "./survey";

export const createSurveyAnswerObj = async (
  surveyId: string
): Promise<SurveyAnswer | undefined> => {
  const survey = await fetchSurvey(surveyId);

  if (!survey) {
    return;
  }

  return {
    surveyId: survey.id,
    surveyTitle: survey.title,
    surveyDescription: survey.description,
    itemAndAnswers: survey.items.map((item) => {
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

export const fetchAnswers = async (surveyId: string) => {
  const allAnswers = await prisma.survey.findMany({
    where: { id: surveyId },
    include: { answers: true },
  });

  return allAnswers;
};

export const postAnswer = async (
  surveyId: string,
  answers: SurveyItemAndAnswer[]
) => {
  // answer.valueがstring[]のものをstringに分割する
  const stringAnswers = answers
    .map((ans) => {
      if (ans.type !== "Checkbox") {
        return ans;
      }

      return ans.value.map((str) => ({ ...ans, value: str }));
    })
    .flat();

  const createdAnswers = await prisma.surveyItemAnswer.createMany({
    data: stringAnswers.map((ans) => {
      return { surveyId, itemId: ans.id, value: ans.value };
    }),
  });

  return createdAnswers.count;
};
