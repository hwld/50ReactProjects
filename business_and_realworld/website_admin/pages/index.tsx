import { Box, Heading, VStack, Text, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { Header } from "../components/Header";

export default function Home(): JSX.Element {
  return (
    <>
      <Header>
        <Image src="egg.png" w="200px" />
        <Image src="egg.png" w="200px" />
        <Image src="egg.png" w="200px" />
      </Header>
      <VStack maxW="1000px" mt={5} mx="auto" spacing={6}>
        {[...Array(10)].map((_, i) => {
          return (
            <NextLink href="/articles/1" key={i}>
              <Box
                p={5}
                bg="yellow.400"
                _hover={{ bg: "yellow.300" }}
                borderRadius="15px"
              >
                <Heading>{`記事${i + 1}`}</Heading>
                <Text
                  mt={3}
                >{`テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト`}</Text>
              </Box>
            </NextLink>
          );
        })}
      </VStack>
    </>
  );
}
