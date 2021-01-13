import { GetServerSideProps } from "next";
import React from "react";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import { ArticlesTable } from "../../../components/admin/ArticlesTable";
import { auth0 } from "../../../lib/auth0";

export default function ArticlePage(): JSX.Element {
  return (
    <AdminLayout current="articles">
      <ArticlesTable w="1300px" mt={5} mx="auto" />
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await auth0.getSession(req);
  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/api/login?redirectTo=/admin/articles",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
