import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { SurveyTextInputResult } from "../../../type/survey";

type Props = { texts: SurveyTextInputResult["result"] };

const Component: React.FC<Props> = ({ texts }) => {
  return (
    <Box>
      <Text ml={3}>{texts.length}件の回答</Text>
      <Stack mt={5} ml={5}>
        {texts.map((text, index) => {
          return (
            <Box p={3} key={index} bgColor="gray.800" rounded="md">
              {text}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export const TextListChart = Component;
