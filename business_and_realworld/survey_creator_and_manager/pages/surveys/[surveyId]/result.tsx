import { Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import { Header } from "../../../components/common/Header";

export default function SurveyResult() {
  return (
    <Box minH="100vh" bgColor="gray.600">
      <Header />
      Answers
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { surveyId } = query;
  if (typeof surveyId !== "string") {
    return { notFound: true };
  }
  return { props: {} };
};
