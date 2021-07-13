import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import React from "react";
import { getSurveyFromPrisma } from "../../../lib/prismaSurvey";
import { Survey } from "../../../type/survey";

type Props = {
  survey: Survey;
};

export default function Response({ survey }: Props) {
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
      <Box mt={5} w="800px" mx="auto">
        <Box p={5} bgColor="gray.700" rounded="10px" boxShadow="md">
          <Heading>{survey.title}</Heading>
          <Box ml={3}>
            <Text mt={5}>回答が送信されました</Text>

            <NextLink href={`/surveys/${survey.id}`}>
              <Button mt={5} as="a" variant="link" colorScheme="blue">
                別の回答を送信する
              </Button>
            </NextLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const surveyId = query.surveyId;
  if (typeof surveyId !== "string") {
    throw new Error();
  }

  const survey = await getSurveyFromPrisma(surveyId);
  if (!survey) {
    throw new Error();
  }

  return { props: { survey: JSON.parse(JSON.stringify(survey)) } };
};
