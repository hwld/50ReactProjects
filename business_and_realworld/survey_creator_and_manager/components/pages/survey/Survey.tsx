import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useSurveyAnswers } from "../../../hooks/useSurveyAnswers";
import { SurveyAnswer } from "../../../type/survey";
import { Header } from "../../common/Header";
import { SurveyItem } from "./SurveyItem";

const Component: React.VFC<{
  surveyAnswer: SurveyAnswer;
  setAnswered: (value: boolean) => void;
}> = ({ surveyAnswer, setAnswered }) => {
  const { items, setAnswer, enableErrorChecking, validateAnswers, errors } =
    useSurveyAnswers(surveyAnswer.itemAndAnswers);

  const requiredExists: boolean = useMemo(() => {
    return items.some((item) => item.required);
  }, [items]);

  const handleSubmit = async () => {
    enableErrorChecking();
    if (!validateAnswers()) {
      return;
    }

    await fetch(`/api/surveys/${surveyAnswer.surveyId}/answers`, {
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
          <Heading size="xl">{surveyAnswer.surveyTitle}</Heading>
          <Text>{surveyAnswer.surveyDescription}</Text>
          {requiredExists && (
            <Text color="red.400" mt={3}>
              * 必須
            </Text>
          )}
        </Box>
        {items.map((item) => {
          return (
            <SurveyItem
              mt={3}
              bgColor="gray.700"
              rounded="xl"
              boxShadow="md"
              key={item.id}
              item={item}
              error={errors.find((e) => e.itemId === item.id)}
              setAnswer={setAnswer}
            />
          );
        })}
        <Button
          mt={5}
          colorScheme="green"
          onClick={handleSubmit}
          isDisabled={errors.length !== 0}
        >
          送信
        </Button>
      </Box>
    </Box>
  );
};

export const Survey = Component;
