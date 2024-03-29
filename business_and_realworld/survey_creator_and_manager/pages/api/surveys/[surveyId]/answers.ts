import { NextApiHandler } from "next";
import { postAnswer } from "../../../../lib/server/surveyAnswer";
import { SurveyItemAnswer } from "../../../../type/survey";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const { surveyId } = req.query;
      const answers = JSON.parse(req.body) as SurveyItemAnswer[];

      if (typeof surveyId !== "string") {
        throw new Error();
      }

      const result = await postAnswer(surveyId, answers);
      res.status(200).json(result);
      return;
    default:
      res.status(404).end();
      return;
  }
};

export default handler;
