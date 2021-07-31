import { GetServerSideProps } from "next";
import React from "react";
import { SurveyEditor } from "../../../components/pages/edit/SurveyEditor";
import { fetchSurvey } from "../../../lib/server/survey";
import { Survey } from "../../../type/survey";

type Props = { survey: Survey };

export default function Creator({ survey }: Props) {
  return <SurveyEditor initialSurvey={survey} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const { surveyId } = query;
  if (typeof surveyId !== "string") {
    return { notFound: true };
  }

  const survey = await fetchSurvey(surveyId);
  if (!survey) {
    return { notFound: true };
  }

  return { props: { survey: JSON.parse(JSON.stringify(survey)) } };
};
