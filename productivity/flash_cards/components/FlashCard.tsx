import { Flex, Text } from "@chakra-ui/react";
import React from "react";

type Props = {};

const Component: React.FC<Props> = ({}) => {
  return (
    <Flex
      w="800px"
      h="500px"
      bgColor="gray.200"
      justify="center"
      align="center"
      padding={7}
      borderRadius="10px"
    >
      <Text fontSize="4xl" fontWeight="bold">
        どうして空は青いの？
      </Text>
    </Flex>
  );
};

export const FlashCard = Component;
