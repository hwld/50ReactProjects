import { Button, Center, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { GetServerSideProps } from "next";
import { auth0 } from "../../lib/server/auth0";

export default function AdminPage(): JSX.Element {
  return (
    <AdminLayout current="home">
      <Center mt={5}>
        <NextLink href="/">
          <Link>
            <Button colorScheme="yellow">ブログに移動する</Button>
          </Link>
        </NextLink>
        <NextLink href="/api/logout">
          <Link ml={3}>
            <Button>ログアウト</Button>
          </Link>
        </NextLink>
      </Center>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await auth0.getSession(req);
  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/api/login?redirectTo=/admin",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
