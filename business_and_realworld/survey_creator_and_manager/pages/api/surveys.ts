import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      getAllSurveys(req, res);
      break;
    case "POST":
      createSurvey(req, res);
      break;
    default:
      break;
  }
};

const getAllSurveys: NextApiHandler = (req, res) => {};

const createSurvey: NextApiHandler = (req, res) => {};

export default handler;
