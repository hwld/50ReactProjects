import { Box, Input } from "@chakra-ui/react";
import React from "react";
import { SurveyTextInputItem } from "../type/survey";

type Props = {
  textInputItem: SurveyTextInputItem;
};

const Component: React.VFC<Props> = ({}) => {
  return (
    <Box>
      <Input />
    </Box>
  );
};

export const TextInputField = Component;
