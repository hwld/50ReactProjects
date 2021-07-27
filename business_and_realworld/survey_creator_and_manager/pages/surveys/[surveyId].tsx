import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { Response } from "../../components/pages/survey/Response";
import { Survey } from "../../components/pages/survey/Survey";
import { createSurveyAnswerObj } from "../../lib/server/surveyAnswer";
import { SurveyAnswer } from "../../type/survey";

type Props = { surveyAnswer: SurveyAnswer };

export default function Home({ surveyAnswer }: Props) {
  const [answered, setAnswered] = useState(false);

  return (
    <>
      {answered === false ? (
        <Survey surveyAnswer={surveyAnswer} setAnswered={setAnswered} />
      ) : (
        <Response surveyAnswer={surveyAnswer} setAnswered={setAnswered} />
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

  const surveyAnswer = await createSurveyAnswerObj(surveyId);
  if (!surveyAnswer) {
    return { notFound: true };
  }

  // undefinedを含むとエラーが起こるので、stringifyをしてプロパティを消す
  return { props: { surveyAnswer: JSON.parse(JSON.stringify(surveyAnswer)) } };
};
