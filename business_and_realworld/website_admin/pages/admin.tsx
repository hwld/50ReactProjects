import { Box, Flex } from "@chakra-ui/react";

export default function AdminPage(): JSX.Element {
  return (
    <Flex h="100vh">
      <Box bg="blue.500" w="400px" />
      <Box flex="1" bg="red.500" />
    </Flex>
  );
}
