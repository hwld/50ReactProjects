import { Box, Button, Center, Divider, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { AdminLayout } from "../../components/admin/AdminLayout";

export default function AdminPage(): JSX.Element {
  return (
    <AdminLayout current="home">
      <Center mt={5}>
        <Link href="/">
          <Button colorScheme="yellow">ブログに移動する</Button>
        </Link>
      </Center>
    </AdminLayout>
  );
}
