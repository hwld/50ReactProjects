import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { useSurvey } from "../../hooks/useSurvey";
import { Survey as SurveySpec } from "../../type/survey";
import { SurveyItem } from "./SurveyItem";

const Component: React.VFC<{ survey: SurveySpec }> = ({ survey }) => {
  const { items, setAnswer } = useSurvey(survey);

  const handleSubmit = () => {
    console.log(items);
    fetch(`/api/surveys/${survey.id}/answers`, {
      method: "POST",
      body: JSON.stringify(items),
    });
  };

  return (
    <Box>
      <Heading size="xl">{survey.title}</Heading>
      <Stack>
        {items.map((item) => {
          return <SurveyItem key={item.id} item={item} setAnswer={setAnswer} />;
        })}
      </Stack>
      <Button colorScheme="green" onClick={handleSubmit}>
        送信
      </Button>
    </Box>
  );
};

export const Survey = Component;
