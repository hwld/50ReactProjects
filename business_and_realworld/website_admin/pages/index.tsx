import { VStack, Image } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import { ArticleOverview } from "../components/ArticleOverview";
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
        {articles.map((a) => (
          <ArticleOverview article={a} key={a.id} />
        ))}
      </VStack>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const articles = await fetchArticles();
  return { props: { articles } };
};
