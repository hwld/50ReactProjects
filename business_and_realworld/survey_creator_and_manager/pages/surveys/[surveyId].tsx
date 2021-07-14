import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { Response } from "../../components/pages/survey/Response";
import { Survey } from "../../components/pages/survey/Survey";
import { getSurvey } from "../../lib/server/survey";
import { Survey as SurveySpec } from "../../type/survey";

type Props = { survey: SurveySpec };

export default function Home({ survey }: Props) {
  const [answered, setAnswered] = useState(false);
  return (
    <>
      {answered === false ? (
        <Survey survey={survey} setAnswered={setAnswered} />
      ) : (
        <Response survey={survey} setAnswered={setAnswered} />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const { surveyId } = query;
  if (typeof surveyId !== "string") {
    return { notFound: true };
  }

  const survey = await getSurvey(surveyId);
  if (!survey) {
    return { notFound: true };
  }

  // undefinedを含むとエラーが起こるので、stringifyをしてプロパティを消す
  return { props: { survey: JSON.parse(JSON.stringify(survey)) } };
};
