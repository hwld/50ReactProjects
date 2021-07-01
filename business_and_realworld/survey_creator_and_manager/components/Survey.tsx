import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { Survey as SurveySpec } from "../type/survey";
import { SurveyItem } from "./SurveyItem";

const Component: React.VFC<{ survey: SurveySpec }> = ({ survey }) => {
  return (
    <Box>
      <Heading size="xl">{survey.title}</Heading>
      <Stack>
        {survey.items.map((item) => {
          return <SurveyItem key={item.id} item={item} />;
        })}
      </Stack>
      <Button colorScheme="green">送信</Button>
    </Box>
  );
};

export const Survey = Component;
