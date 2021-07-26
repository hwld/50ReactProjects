import { NextApiHandler } from "next";
import { postAnswer } from "../../../../lib/server/surveyAnswer";
import { SurveyItemAndAnswer } from "../../../../type/survey";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const { surveyId } = req.query;
      const answers = JSON.parse(req.body) as SurveyItemAndAnswer[];

      if (typeof surveyId !== "string") {
        throw new Error();
      }

      const result = await postAnswer(surveyId, answers);
      res.status(200).json(result);
      return;
    default:
      return;
  }
};

export default handler;
