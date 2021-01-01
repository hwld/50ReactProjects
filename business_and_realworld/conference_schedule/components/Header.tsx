import { Box, Heading, HStack, Spacer, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export const Header: React.FC = () => {
  return (
    <Box as="header" color="yellow.300">
      <HStack as="nav" maxW="1100px" mx="auto">
        <Box p="2">
          <NextLink href="./">
            <Heading>Conference Schedule</Heading>
          </NextLink>
        </Box>
        <Spacer />

        <NextLink href="./location">
          <Link>
            <Text fontSize="xl" fontWeight="bold" mr="4">
              Location
            </Text>
          </Link>
        </NextLink>

        <NextLink href="./food">
          <Link>
            <Text fontSize="xl" fontWeight="bold" mr="4">
              Food
            </Text>
          </Link>
        </NextLink>
      </HStack>
    </Box>
  );
};
