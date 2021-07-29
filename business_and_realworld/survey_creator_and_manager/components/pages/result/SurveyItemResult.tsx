import { Box, Heading } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { SurveyItemResult as SurveyItemResultSpec } from "../../../type/survey";
import { assertNever } from "../../../utils/asertNever";
import { SurveyPercentageChart } from "./PercentageChart";
import { TextListChart } from "./TextListChart";

type Props = { itemResult: SurveyItemResultSpec };

const Component: React.FC<Props> = ({ itemResult }) => {
  const result = useMemo(() => {
    switch (itemResult.type) {
      case "Radio": {
        return <SurveyPercentageChart data={itemResult.result} />;
      }
      case "Checkbox": {
        return <SurveyPercentageChart data={itemResult.result} />;
      }
      case "TextInput": {
        return <TextListChart texts={itemResult.result} />;
      }
      default: {
        assertNever(itemResult);
      }
    }
  }, [itemResult]);

  return (
    <Box
      key={itemResult.id}
      p={5}
      mt={3}
      bgColor="gray.700"
      rounded="xl"
      boxShadow="md"
    >
      <Heading size="md" mb={3}>
        {itemResult.question}
      </Heading>
      {result}
    </Box>
  );
};

export const SurveyItemResult = Component;
