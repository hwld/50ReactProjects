import { Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { Response } from "../../components/survey/Response";
import { Survey } from "../../components/survey/Survey";
import { getSurveyFromPrisma } from "../../lib/prismaSurvey";
import { Survey as SurveySpec } from "../../type/survey";

type Props = { survey: SurveySpec };

export default function Home({ survey }: Props) {
  const [answered, setAnswered] = useState(false);
  return (
    <Box>
      {answered === false ? (
        <Survey survey={survey} setAnswered={setAnswered} />
      ) : (
        <Response survey={survey} setAnswered={setAnswered} />
      )}
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

  const survey = await getSurveyFromPrisma(surveyId);
  if (!survey) {
    throw new Error();
  }

  // undefinedを含むとエラーが起こるので、stringifyをしてプロパティを消す
  return { props: { survey: JSON.parse(JSON.stringify(survey)) } };
};
