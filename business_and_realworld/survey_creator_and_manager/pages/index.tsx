import { GetServerSideProps } from "next";
import React from "react";
import { Surveys } from "../components/surveys/Surveys";
import { getAllSurveyFromPrisma } from "../lib/prismaSurvey";
import { Survey } from "../type/survey";

type Props = {
  surveys: Survey[];
};

export default function SurveysPage({ surveys }: Props) {
  return <Surveys surveys={surveys} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const surveys = await getAllSurveyFromPrisma();

  return { props: { surveys: JSON.parse(JSON.stringify(surveys)) } };
};
