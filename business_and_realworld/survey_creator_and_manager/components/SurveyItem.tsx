import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { SurveyItem as SurveyItemSpec } from "../type/survey";
import { CheckboxField } from "./CheckboxField";
import { RadioField } from "./RadioField";
import { TextInputField } from "./TextInputField";

type Props = {
  item: SurveyItemSpec;
};

const Component: React.VFC<Props> = ({ item }) => {
  const inputField = useMemo(() => {
    switch (item.type) {
      case "Radio":
        return <RadioField radioItem={item} />;
      case "Checkbox":
        return <CheckboxField checkBoxItem={item} />;
      case "TextInput":
        return <TextInputField textInputItem={item} />;
    }
  }, [item]);

  return (
    <Box key={item.id}>
      <Heading size="md">{item.question}</Heading>
      <Text>{item.description}</Text>
      {inputField}
    </Box>
  );
};

export const SurveyItem = Component;
