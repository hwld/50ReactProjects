import { NextApiHandler } from "next";
import { fetchAllSurvey, postSurvey } from "../../lib/server/survey";
import { Survey } from "../../type/survey";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET": {
      const allSurveys = await fetchAllSurvey();
      res.status(200).json(allSurveys);
      return;
    }
    case "POST": {
      const result = await postSurvey(JSON.parse(req.body) as Survey);
      res.status(200).json(result);
      return;
    }
    default: {
      res.status(404).end();
      return;
    }
  }
};

export default handler;
