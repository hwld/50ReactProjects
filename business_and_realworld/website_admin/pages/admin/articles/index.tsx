import { GetServerSideProps } from "next";
import React from "react";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import { ArticlesTable } from "../../../components/admin/ArticlesTable";
import { auth0 } from "../../../lib/server/auth0";
import { fetchArticles } from "../../../lib/server/fetchArticles";
import { Article } from "../../../types/article";

type ArticlePageProps = { articles: Article[] };

export default function ArticlePage({
  articles,
}: ArticlePageProps): JSX.Element {
  return (
    <AdminLayout current="articles">
      <ArticlesTable articles={articles} w="1300px" mt={5} mx="auto" />
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

  const articles = await fetchArticles();
  return { props: { articles } };
};
