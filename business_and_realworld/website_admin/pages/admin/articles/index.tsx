import { GetServerSideProps } from "next";
import React from "react";
import { useQuery } from "react-query";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import { ArticlesTable } from "../../../components/admin/ArticlesTable";
import { auth0 } from "../../../lib/server/auth0";
import { fetchArticles as fetchArticlesForServer } from "../../../lib/server/fetchArticles";
import { fetchArticles as fetchArticlesForClient } from "../../../lib/client/fetchArticles";
import { Article } from "../../../types/article";
import Link from "next/link";
import { Button, VStack } from "@chakra-ui/react";

type ArticlePageProps = { initialArticles: Article[] };

export default function ArticlePage({
  initialArticles,
}: ArticlePageProps): JSX.Element {
  const { data: articles = [] } = useQuery(
    "articles",
    () => fetchArticlesForClient("publishedAt"),
    { initialData: initialArticles }
  );

  return (
    <AdminLayout current="articles">
      <VStack w="80%" mt={10} mx="auto">
        <Link href="/admin/articles/edit">
          <Button colorScheme="green" color="white" w="150px" alignSelf="end">
            ブログを書く
          </Button>
        </Link>
        <ArticlesTable articles={articles} w="100%" />
      </VStack>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ArticlePageProps> = async ({
  req,
}) => {
  const session = await auth0.getSession(req);
  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/api/login?redirectTo=/admin/articles",
        permanent: false,
      },
    };
  }

  const articles = await fetchArticlesForServer("publishedAt");

  return {
    props: { initialArticles: articles },
  };
};
