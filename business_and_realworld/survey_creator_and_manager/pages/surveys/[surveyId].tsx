import { Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import { Survey } from "../../components/survey/Survey";
import prisma from "../../lib/prisma";
import { Survey as SurveySpec } from "../../type/survey";
import { assertNever } from "../../utils/asertNever";

type Props = { survey: SurveySpec };

export default function Home({ survey }: Props) {
  return (
    <Box>
      <Survey survey={survey} />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const { surveyId } = query;

  if (typeof surveyId !== "string") {
    throw new Error();
  }

  const dbSurvey = await prisma.survey.findFirst({
    where: { id: surveyId },
    include: { items: { include: { choices: true } } },
  });

  if (!dbSurvey) {
    throw new Error();
  }

  const survey: SurveySpec = {
    id: dbSurvey.id,
    items: dbSurvey.items.map((item) => {
      switch (item.type) {
        case "Radio": {
          return {
            id: item.id,
            type: item.type,
            description: item.description ?? undefined,
            question: item.question,
            choices: item.choices.map((c) => c.choice),
          };
        }
        case "Checkbox": {
          return {
            id: item.id,
            type: item.type,
            description: item.description ?? undefined,
            question: item.question,
            choices: item.choices.map((c) => c.choice),
          };
        }
        case "TextInput": {
          return {
            id: item.id,
            type: item.type,
            description: item.description ?? undefined,
            question: item.question,
          };
        }
        default: {
          assertNever(item.type);
        }
      }
    }),
    title: dbSurvey.title,
  };

  console.log(survey.items[0]);

  // undefinedを含むとエラーが起こるので、stringifyをしてプロパティを消す
  return { props: { survey: JSON.parse(JSON.stringify(survey)) } };
};
