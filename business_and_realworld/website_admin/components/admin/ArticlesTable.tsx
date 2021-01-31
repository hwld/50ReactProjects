import {
  Box,
  chakra,
  Flex,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { Article } from "../../types/article";
import { ArticleTableRow } from "./ArticleTableRow";

type Props = {
  articles: Article[];
  className?: string;
};

const Component: React.FC<Props> = ({ className, articles }) => {
  return (
    <Flex direction="column" className={className}>
      <Table>
        <Thead>
          <Tr bg="gray.400">
            <Th>タイトル</Th>
            <Th>作成日</Th>
            <Th>更新日</Th>
            <Th>操作</Th>
          </Tr>
        </Thead>
        <Tbody>
          {articles.map((a) => (
            <ArticleTableRow article={a} key={a.id} />
          ))}
        </Tbody>
      </Table>
      <Box bg="gray.400" h="50px"></Box>
    </Flex>
  );
};

export const ArticlesTable = chakra(Component);
