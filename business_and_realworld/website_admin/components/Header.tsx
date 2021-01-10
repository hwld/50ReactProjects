import { Center, Heading, Link, Flex, Box } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

const Component: React.FC = ({ children }) => {
  return (
    <Flex
      direction="column"
      justify="space-between"
      w="100%"
      h="350px"
      bg="red.500"
    >
      <Box w="100%" maxW="1300px" mx="auto" p={3}>
        <NextLink href="/">
          <Link display="inline-block" _hover={{ opacity: 0.5 }}>
            <Heading>📘Blog</Heading>
          </Link>
        </NextLink>
      </Box>
      <Center verticalAlign="bottom" overflow="hidden">
        {children}
      </Center>
    </Flex>
  );
};

export const Header = Component;
