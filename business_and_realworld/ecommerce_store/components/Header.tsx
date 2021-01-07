import { Box, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

const Component: React.FC = () => {
  return (
    <Box bg="purple.600" p={3}>
      <Box maxW="1300px" mx="auto">
        <NextLink href="/">
          <Link display="block" _hover={{ opacity: 0.8 }}>
            <Heading size="xl">⚙GameStore</Heading>
          </Link>
        </NextLink>
      </Box>
    </Box>
  );
};

export const Header = Component;
