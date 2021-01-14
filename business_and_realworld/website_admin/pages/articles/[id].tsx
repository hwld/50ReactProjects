import { Box, Heading, Text, Image } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import { Header } from "../../components/Header";
import { fetchArticle } from "../../lib/fetchArticle";
import { Article } from "../api/articles/create";

type ArticlePageProps = { article: Article };

export default function ArticlePage({
  article,
}: ArticlePageProps): JSX.Element {
  return (
    <>
      <Header>
        <Image src="../chicken.png" w="200px" />
        <Image src="../chicken.png" w="200px" />
        <Image src="../chicken.png" w="200px" />
      </Header>

      <Box
        maxW="1000px"
        my={5}
        mx="auto"
        bg="yellow.400"
        p={6}
        borderRadius="15px"
        whiteSpace="pre-wrap"
      >
        <Heading>{article.title}</Heading>
        <Text mt={5}>{article.text}</Text>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ArticlePageProps> = async ({
  query,
}) => {
  const id = query.id;
  if (typeof id !== "string") {
    throw new Error("不正なパラメータ");
  }
  const article = await fetchArticle(id);
  return { props: { article } };
};
