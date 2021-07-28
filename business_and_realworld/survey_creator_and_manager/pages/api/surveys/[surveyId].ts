import { NextApiHandler } from "next";
import { deleteSurvey } from "../../../lib/server/survey";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "DELETE": {
      const { surveyId } = req.query;
      if (typeof surveyId !== "string") {
        throw new Error();
      }

      await deleteSurvey(surveyId);
      res.status(200).json({});
      return;
    }
    default: {
      break;
    }
  }
};

export default handler;
