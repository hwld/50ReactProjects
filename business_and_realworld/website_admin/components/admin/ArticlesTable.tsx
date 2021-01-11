import {
  Box,
  Button,
  chakra,
  Flex,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { ArticleTableRow } from "./ArticleTableRow";

type Article = {
  title: string;
  text: string;
};

type Props = {
  articles?: Article[];
  className?: string;
};

const Component: React.FC<Props> = ({ className }) => {
  return (
    <Flex direction="column" className={className}>
      <Link href="/admin/articles/edit">
        <Button
          colorScheme="green"
          color="white"
          w="150px"
          alignSelf="flex-end"
          my={2}
        >
          ブログを書く
        </Button>
      </Link>
      <Table>
        <Thead>
          <Tr bg="gray.400">
            <Th w="700px">タイトル</Th>
            <Th>作成日</Th>
            <Th>更新日</Th>
            <Th>操作</Th>
          </Tr>
        </Thead>
        <Tbody>
          {[...Array(10)].map((_, i) => (
            <ArticleTableRow key={i} />
          ))}
        </Tbody>
      </Table>
      <Box bg="gray.400" h="50px"></Box>
    </Flex>
  );
};

export const ArticlesTable = chakra(Component);
