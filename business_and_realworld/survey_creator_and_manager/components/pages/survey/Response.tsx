import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { SurveyAnswer } from "../../../type/survey";

type Props = {
  surveyAnswer: SurveyAnswer;
  setAnswered: (value: boolean) => void;
};

const Component: React.FC<Props> = ({ surveyAnswer, setAnswered }) => {
  const handleClick = () => {
    setAnswered(false);
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
      <Box mt={5} w="800px" mx="auto">
        <Box p={5} bgColor="gray.700" rounded="10px" boxShadow="md">
          <Heading>{surveyAnswer.surveyTitle}</Heading>
          <Box ml={3}>
            <Text mt={5}>回答が送信されました</Text>

            <Button
              mt={5}
              as="a"
              variant="link"
              colorScheme="blue"
              onClick={handleClick}
            >
              別の回答を送信する
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const Response = Component;
