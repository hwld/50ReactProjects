import { Box, Heading, VStack, Text, Image } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import React from "react";
import { Header } from "../components/Header";
import { fetchArticles } from "../lib/server/fetchArticles";
import { Article } from "../types/article";

type HomeProps = { articles: Article[] };

export default function Home({ articles }: HomeProps): JSX.Element {
  return (
    <>
      <Header>
        <Image src="egg.png" w="200px" />
        <Image src="egg.png" w="200px" />
        <Image src="egg.png" w="200px" />
      </Header>
      <VStack maxW="1000px" mt={5} mx="auto" spacing={6}>
        {articles.map((a) => {
          return (
            <NextLink href={`/articles/${a.id}`} key={a.id}>
              <Box
                p={5}
                bg="yellow.400"
                w="100%"
                _hover={{ bg: "yellow.300" }}
                borderRadius="15px"
              >
                <Heading>{`${a.title}`}</Heading>
                <Text mt={3} whiteSpace="pre-wrap">{`${a.text}`}</Text>
              </Box>
            </NextLink>
          );
        })}
      </VStack>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const articles = await fetchArticles();
  return { props: { articles } };
};
