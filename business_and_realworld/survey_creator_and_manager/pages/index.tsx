import { GetServerSideProps } from "next";
import React from "react";
import { Surveys } from "../components/pages/surveys/Surveys";
import { fetchAllSurvey } from "../lib/server/survey";
import { Survey } from "../type/survey";

type Props = {
  surveys: Survey[];
};

export default function SurveysPage({ surveys }: Props) {
  return <Surveys surveys={surveys} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const surveys = await fetchAllSurvey();

  return { props: { surveys: JSON.parse(JSON.stringify(surveys)) } };
};
