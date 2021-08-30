import { Flex, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  return (
    <Flex minH="100vh" bgColor="gray.200" justify="center" align="center">
      <Heading size="3xl">flash_cards</Heading>
    </Flex>
  );
};

export default Home;
