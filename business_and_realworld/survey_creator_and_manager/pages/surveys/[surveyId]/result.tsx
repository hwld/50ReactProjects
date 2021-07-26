import { GetServerSideProps } from "next";
import React from "react";
import { Result } from "../../../components/pages/result/Result";
import { aggregateBySurvey } from "../../../lib/server/surveyResult";
import { SurveyResult } from "../../../type/survey";

type Props = {
  surveyResult: SurveyResult;
};

export default function ResultPage({ surveyResult }: Props) {
  return <Result surveyResult={surveyResult} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const { surveyId } = query;
  if (typeof surveyId !== "string") {
    return { notFound: true };
  }

  const surveyResult = await aggregateBySurvey(surveyId);
  if (!surveyResult) {
    return { notFound: true };
  }

  return { props: { surveyResult: JSON.parse(JSON.stringify(surveyResult)) } };
};
