import { NextApiHandler } from "next";
import { createSurvey } from "../../../lib/server/survey";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST": {
      const surveyId = await createSurvey();
      res.status(200).json({ surveyId });
      return;
    }
    default: {
      res.status(404).end();
      return;
    }
  }
};

export default handler;
