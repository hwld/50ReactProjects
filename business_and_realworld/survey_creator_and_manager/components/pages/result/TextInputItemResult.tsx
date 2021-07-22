import { Box } from "@chakra-ui/react";
import React from "react";
import { SurveyTextInputResults } from "../../../type/survey";

type Props = { texts: SurveyTextInputResults["texts"] };

const Component: React.FC<Props> = ({ texts }) => {
  return (
    <Box>
      {texts.map((text) => {
        return <Box key={text}>{text}</Box>;
      })}
    </Box>
  );
};

export const TextInputItemResult = Component;
