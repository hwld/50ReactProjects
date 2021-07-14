import { NextApiHandler } from "next";
import prisma from "../../../lib/server/prisma";

const handler: NextApiHandler = async (req, res) => {
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
      await deleteSurvey(req, res);
      break;
    }
    default: {
      break;
    }
  }
};

const getSurvey: NextApiHandler = (req, res) => {};

const updateSurvey: NextApiHandler = (req, res) => {};

const deleteSurvey: NextApiHandler = async (req, res) => {
  const { surveyId } = req.query;
  if (typeof surveyId !== "string") {
    throw new Error();
  }

  await prisma.survey.delete({ where: { id: surveyId } });
  res.status(200).json({});
};

export default handler;
