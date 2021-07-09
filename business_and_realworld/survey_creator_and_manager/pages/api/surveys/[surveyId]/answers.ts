import { NextApiHandler } from "next";
import prisma from "../../../../lib/prisma";
import { SurveyItemAndAnswer } from "../../../../type/survey";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllAnswers(req, res);
      break;
    case "POST":
      await createAnswer(req, res);
      break;
    default:
      break;
  }
};

const getAllAnswers: NextApiHandler = async (req, res) => {
  const surveyId = req.query.surveyId as string;
  const allAnswers = await prisma.survey.findMany({
    where: { id: surveyId },
    include: { answers: true },
  });

  res.status(200).json(allAnswers);
};

const createAnswer: NextApiHandler = async (req, res) => {
  const surveyId = req.query.surveyId as string;
  const answers = JSON.parse(req.body) as SurveyItemAndAnswer[];

  // answer.valueがstring[]のものをstringに分割する
  const stringAnswers = answers
    .map((ans) => {
      if (ans.type !== "Checkbox") {
        return ans;
      }

      return ans.value.map((_, i) => ({ ...ans, value: ans.value[i] }));
    })
    .flat();

  const createdAnswers = await prisma.surveyItemAnswer.createMany({
    data: stringAnswers.map((ans) => {
      return { surveyId, itemId: ans.id, value: ans.value };
    }),
  });

  res.status(200).json(createdAnswers.count);
};

export default handler;
