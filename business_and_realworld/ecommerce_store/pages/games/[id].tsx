import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { Header } from "../../components/Header";

const Game: NextPage = () => {
  return (
    <>
      <Header />
      <Box maxW="1300px" mt={10} mx="auto">
        <Flex w="100%" wrap="wrap">
          <Box ml={10} boxSize="400px" bg="blue.500" />
          <Box maxW="50%" mx={10} whiteSpace="pre-wrap">
            <Heading mt={10}>GameTitle</Heading>
            <Text
              mt={6}
            >{`SampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSample`}</Text>
            <Button
              mt={6}
              pb={1}
              borderRadius="0"
              bg="blue.500"
              _hover={{ bg: "blue.400" }}
              _active={{ bg: "blue.300" }}
            >
              Buy Now
            </Button>
          </Box>
        </Flex>
        <Box mt={10} mx={10}>
          <Heading size="lg">More Details</Heading>
          <Text>{`SampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleleSampleSampleSample`}</Text>
        </Box>
        <Box mt={10} mx={10}>
          <Heading size="lg">Reviews</Heading>
          <Text>{`SampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSampleSample`}</Text>
        </Box>
      </Box>
    </>
  );
};

export default Game;
