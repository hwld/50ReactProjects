import { Box, Heading } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { SurveyItemAndResult } from "../../../type/survey";
import { assertNever } from "../../../utils/asertNever";
import { CheckboxItemResult } from "./CheckboxItemResult";
import { RadioItemResult } from "./RadioItemResult";
import { TextInputItemResult } from "./TextInputItemResult";

type Props = { item: SurveyItemAndResult };

const Component: React.FC<Props> = ({ item }) => {
  const result = useMemo(() => {
    switch (item.type) {
      case "Radio": {
        return <RadioItemResult results={item.results} />;
      }
      case "Checkbox": {
        return <CheckboxItemResult results={item.results} />;
      }
      case "TextInput": {
        return <TextInputItemResult texts={item.texts} />;
      }
      default: {
        assertNever(item);
      }
    }
  }, [item]);

  return (
    <Box
      key={item.id}
      p={5}
      mt={3}
      bgColor="gray.700"
      rounded="xl"
      boxShadow="md"
    >
      <Heading size="md" mb={3}>
        {item.question}
      </Heading>
      {result}
    </Box>
  );
};

export const SurveyItemResult = Component;
