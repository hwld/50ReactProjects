import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      getAnswer(req, res);
      break;
    case "PUT":
      updateAnswer(req, res);
      break;
    default:
      break;
  }
};

const getAnswer: NextApiHandler = (req, res) => {};

const updateAnswer: NextApiHandler = (req, res) => {};

export default handler;
