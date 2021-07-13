import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useSurvey } from "../../hooks/useSurvey";
import { Survey as SurveySpec } from "../../type/survey";
import { SurveyItem } from "./SurveyItem";

const Component: React.VFC<{ survey: SurveySpec }> = ({ survey }) => {
  const router = useRouter();
  const { items, setAnswer } = useSurvey(survey);

  const handleSubmit = async () => {
    await fetch(`/api/surveys/${survey.id}/answers`, {
      method: "POST",
      body: JSON.stringify(items),
    });

    router.push(`/surveys/${survey.id}/response`);
  };

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
