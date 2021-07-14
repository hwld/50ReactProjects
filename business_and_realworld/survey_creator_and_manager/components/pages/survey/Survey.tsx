import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useSurveyAnswers } from "../../../hooks/useSurveyAnswers";
import { Survey as SurveySpec } from "../../../type/survey";
import { Header } from "../../common/Header";
import { SurveyItem } from "./SurveyItem";

const Component: React.VFC<{
  survey: SurveySpec;
  setAnswered: (value: boolean) => void;
}> = ({ survey, setAnswered }) => {
  const { items, setAnswer } = useSurveyAnswers(survey);

  const handleSubmit = async () => {
    await fetch(`/api/surveys/${survey.id}/answers`, {
      method: "POST",
      body: JSON.stringify(items),
    });
    setAnswered(true);
  };

  return (
    <Box minH="100vh" bgColor="gray.600">
      <Header />
      <Box w="800px" mt={5} mx="auto">
        <Box p={5} bgColor="gray.700" rounded="10px" boxShadow="md">
          <Heading size="xl">{survey.title}</Heading>
          <Text>{survey.description}</Text>
        </Box>
        {items.map((item) => {
          return (
            <SurveyItem
              my={3}
              bgColor="gray.700"
              rounded="xl"
              boxShadow="md"
              key={item.id}
              item={item}
              setAnswer={setAnswer}
            />
          );
        })}
        <Button colorScheme="green" onClick={handleSubmit}>
          送信
        </Button>
      </Box>
    </Box>
  );
};

export const Survey = Component;
