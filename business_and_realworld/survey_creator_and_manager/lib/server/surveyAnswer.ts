import { SurveyAnswer, SurveyItemAnswer } from "../../type/survey";
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
    itemAnswers: survey.items.map((item) => {
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

export const postAnswer = async (
  surveyId: string,
  itemAnswers: SurveyItemAnswer[]
) => {
  // answer.valueがstring[]のものをstringに分割する
  const stringAnswers = itemAnswers
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
