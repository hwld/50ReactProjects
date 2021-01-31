import React from "react";
import NextLink from "next/link";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Article } from "../types/article";
import { formatDate } from "../util/formatDate";

type Props = { article: Article };

const Component: React.FC<Props> = ({ article }) => {
  return (
    <NextLink href={`/articles/${article.id}`}>
      <Box
        p={5}
        bg="yellow.400"
        w="100%"
        _hover={{ bg: "yellow.300" }}
        borderRadius="15px"
      >
        <Heading>{article.title}</Heading>
        <Text mt={1} ml={2}>
          <b>公開日:</b> {` ${formatDate(new Date(article.publishedAt))}`}
        </Text>
        <Text mt={1} ml={2}>
          <b>更新日:</b> {` ${formatDate(new Date(article.revisedAt))}`}
        </Text>
      </Box>
    </NextLink>
  );
};

export const ArticleOverview = Component;
