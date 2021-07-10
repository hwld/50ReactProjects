import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "GET": {
      getSurvey(req, res);
      break;
    }
    case "PUT": {
      updateSurvey(req, res);
      break;
    }
    case "DELETE": {
      deleteSurvey(req, res);
      break;
    }
    default: {
      break;
    }
  }
};

const getSurvey: NextApiHandler = (req, res) => {};

const updateSurvey: NextApiHandler = (req, res) => {};

const deleteSurvey: NextApiHandler = (req, res) => {};

export default handler;
