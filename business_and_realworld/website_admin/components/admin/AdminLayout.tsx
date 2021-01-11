import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { NavigationList, NavigationListProps } from "./NavigationList";

const Component: React.FC<{ current: NavigationListProps["current"] }> = ({
  current,
  children,
}) => {
  return (
    <Flex minH="100vh">
      <Box bg="gray.700" minW="300px" color="white">
        <Heading size="lg" ml={5} my={3}>
          📘Blog
        </Heading>
        <Divider mb={2} />
        <NavigationList current={current} />
      </Box>
      <Box flex="1">{children}</Box>
    </Flex>
  );
};

export const AdminLayout = Component;
