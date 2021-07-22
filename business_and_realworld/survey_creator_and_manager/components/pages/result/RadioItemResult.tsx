import { Box } from "@chakra-ui/react";
import React from "react";
import { SurveyRadioResults } from "../../../type/survey";

type Props = { results: SurveyRadioResults["results"] };

const Component: React.FC<Props> = ({ results }) => {
  return (
    <Box>
      {results.map((result) => {
        return (
          <Box key={result.choice}>
            {result.choice}: {result.count}
          </Box>
        );
      })}
    </Box>
  );
};

export const RadioItemResult = Component;
