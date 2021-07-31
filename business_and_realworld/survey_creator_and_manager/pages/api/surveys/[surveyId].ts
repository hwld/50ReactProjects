import { NextApiHandler } from "next";
import { deleteSurvey, updateSurvey } from "../../../lib/server/survey";
import { Survey } from "../../../type/survey";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "PUT": {
      const { surveyId } = req.query;
      if (typeof surveyId !== "string") {
        throw new Error();
      }

      const result = await updateSurvey(JSON.parse(req.body) as Survey);

      res.status(200).json(result);
      return;
    }
    case "DELETE": {
      const { surveyId } = req.query;
      if (typeof surveyId !== "string") {
        throw new Error();
      }

      await deleteSurvey(surveyId);
      res.status(200).end();
      return;
    }
    default: {
      res.status(404).end();
      return;
    }
  }
};

export default handler;
