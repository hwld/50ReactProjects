import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      getAllAnswers(req, res);
      break;
    case "POST":
      createAnswer(req, res);
      break;
    default:
      break;
  }
};

const getAllAnswers: NextApiHandler = (req, res) => {};

const createAnswer: NextApiHandler = (req, res) => {};

export default handler;
