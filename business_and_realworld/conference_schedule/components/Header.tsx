import { Box, Heading, HStack, Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export const Header: React.FC = () => {
  return (
    <Box
      as="header"
      bg="gray.900"
      borderTopWidth="6px"
      borderTopColor="yellow.300"
    >
      <HStack as="nav" maxW="1300px" mx="auto" p={1}>
        <NextLink href="./">
          <Box p="2" cursor="pointer">
            <Heading color="yellow.300">🍌BananConf</Heading>
          </Box>
        </NextLink>
        <Spacer />
      </HStack>
    </Box>
  );
};
