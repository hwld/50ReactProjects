import { Box, Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";

export default function SurveyAnswers() {
  return (
    <Box minH="100vh" bgColor="gray.600">
      <Box h="70px">
        <Flex
          position="fixed"
          bgColor="gray.300"
          top={0}
          left={0}
          right={0}
          h="70px"
          zIndex="1"
          justifyContent="flex-end"
        />
      </Box>
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
