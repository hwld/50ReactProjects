import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { Response } from "../../components/pages/survey/Response";
import { Survey } from "../../components/pages/survey/Survey";
import { getSurveyAnswer } from "../../lib/server/survey";
import { SurveyAnswer } from "../../type/survey";

type Props = { surveyAnswer: SurveyAnswer };

export default function Home({ surveyAnswer }: Props) {
  const [answered, setAnswered] = useState(false);
  return (
    <>
      {answered === false ? (
        <Survey surveyAnswer={surveyAnswer} setAnswered={setAnswered} />
      ) : (
        <Response survey={surveyAnswer} setAnswered={setAnswered} />
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

  const surveyAnswer = await getSurveyAnswer(surveyId);
  if (!surveyAnswer) {
    return { notFound: true };
  }

  // undefinedを含むとエラーが起こるので、stringifyをしてプロパティを消す
  return { props: { surveyAnswer: JSON.parse(JSON.stringify(surveyAnswer)) } };
};
