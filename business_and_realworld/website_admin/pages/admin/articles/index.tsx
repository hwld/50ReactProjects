import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { AdminLayout } from "../../../components/admin/AdminLayout";
import { ArticlesTable } from "../../../components/admin/ArticlesTable";

export default function ArticlePage(): JSX.Element {
  return (
    <AdminLayout current="articles">
      <ArticlesTable w="1300px" mt={5} mx="auto" />
    </AdminLayout>
  );
}
