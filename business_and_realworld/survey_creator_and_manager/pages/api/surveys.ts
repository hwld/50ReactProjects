import { NextApiHandler } from "next";
import prisma from "../../lib/prisma";
import { Survey } from "../../type/survey";
import { assertNever } from "../../utils/asertNever";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET": {
      await getAllSurveys(req, res);
      break;
    }
    case "POST": {
      await createSurvey(req, res);
      break;
    }
    default: {
      break;
    }
  }
};

const getAllSurveys: NextApiHandler = async (req, res) => {
  const allSurveys = await prisma.survey.findMany({
    include: { items: { include: { choices: true } } },
  });
  res.status(200).json(allSurveys);
};

const createSurvey: NextApiHandler = async (req, res) => {
  const survey = JSON.parse(req.body) as Survey;

  const result = await prisma.survey.create({
    data: {
      title: survey.title,
      description: survey.description,
      items: {
        create: survey.items.map((item) => {
          switch (item.type) {
            case "Radio":
            case "Checkbox":
              return {
                type: item.type,
                question: item.question,
                description: item.description,
                choices: {
                  create: item.choices.map((choice) => ({ choice })),
                },
              };
            case "TextInput":
              return {
                type: item.type,
                question: item.question,
                description: item.description,
              };
            default:
              assertNever(item);
          }
        }),
      },
    },
    include: { items: { include: { choices: true } } },
  });

  res.status(200).json(result);
};

export default handler;
