import { AddIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { Survey } from "../../type/survey";

type Props = { surveys: Survey[] };

const Component: React.FC<Props> = ({ surveys: surveysProp }) => {
  const [surveys, setSurveys] = useState(surveysProp);
  const router = useRouter();
  const toast = useToast();

  const writeClipboard = async (value: string) => {
    await navigator.clipboard.writeText(value);
    toast({ description: "URLをコピーしました", duration: 1000 });
  };

  const deleteSurvey = async (survey: Survey) => {
    await fetch(`/api/surveys/${survey.id}`, { method: "DELETE" });
    const data = await fetch("/api/surveys");
    const surveys = await data.json();
    setSurveys(surveys);
  };

  const toCreator = async () => {
    await router.push("/creator");
  };

  return (
    <Box minH="100vh" bgColor="gray.600">
      <Box bg="cyan.200" h="250px"></Box>
      <Grid
        py={10}
        templateColumns="repeat(auto-fill, 400px)"
        autoRows="150px"
        gap={5}
        justifyContent="center"
      >
        <IconButton
          aria-label="新しい調査の作成"
          icon={<AddIcon boxSize="70px" color="gray.800" />}
          borderRadius="20px"
          height="100%"
          bgColor="gray.400"
          _hover={{ bgColor: "gray.500" }}
          _active={{ bgColor: "gray.600" }}
          opacity="0.7"
          boxShadow="lg"
          onClick={toCreator}
        />
        {surveys.map((survey) => {
          return (
            <Flex
              key={survey.id}
              flexDir="column"
              bgColor="gray.700"
              justifyContent="space-between"
              pt={3}
              px={5}
              pb={2}
              boxShadow="lg"
              borderRadius="20px"
            >
              <Heading whiteSpace="nowrap" overflow="hidden" size="md" m={3}>
                {survey.title}
              </Heading>

              <HStack justifyContent="space-between">
                <HStack>
                  <Button>変更</Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      deleteSurvey(survey);
                    }}
                  >
                    削除
                  </Button>
                </HStack>

                <IconButton
                  aria-label="調査ページのURLをコピーする"
                  colorScheme="cyan"
                  icon={<CopyIcon />}
                  size="lg"
                  borderRadius="50%"
                  alignSelf="flex-end"
                  onClick={() =>
                    writeClipboard(`http://localhost:3000/surveys/${survey.id}`)
                  }
                />
              </HStack>
            </Flex>
          );
        })}
      </Grid>
    </Box>
  );
};

export const Surveys = Component;
