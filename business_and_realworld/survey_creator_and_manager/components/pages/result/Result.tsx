import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { SurveyResult } from "../../../type/survey";
import { Header } from "../../common/Header";
import { SurveyItemResult } from "./SurveyItemResult";

type Props = { surveyResult: SurveyResult };

const Component: React.FC<Props> = ({ surveyResult }) => {
  return (
    <Box minH="100vh" bgColor="gray.600">
      <Header />
      <Box w="800px" mt={5} mx="auto">
        <Box p={5} bgColor="gray.700" rounded="10px" boxShadow="md">
          <Heading size="xl" mb={3}>
            {surveyResult.surveyTitle}
          </Heading>
          <Text ml={3}>{surveyResult.surveyDescription}</Text>
        </Box>
        <Box>
          {surveyResult.itemResults.map((item) => {
            return <SurveyItemResult key={item.id} itemResult={item} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export const Result = Component;
