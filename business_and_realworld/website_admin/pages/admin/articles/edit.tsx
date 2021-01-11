import { Box, Button, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

export default function EditPage(): JSX.Element {
  return (
    <Box>
      <Box w="1300px" mt={10} mx="auto" p={10} bg="gray.100" boxShadow="xl">
        <Box>
          <Text>タイトル</Text>
          <Input mt={3} bg="gray.200" placeholder="タイトル" />
        </Box>
        <Box mt={5}>
          <Text>記事</Text>
          <Textarea mt={3} h="30em" bg="gray.200" placeholder="記事" />
        </Box>
        <Flex mt={10} justify="flex-end">
          <Link href="/admin/articles">
            <Button
              bg="gray.300"
              _hover={{ bg: "gray.400" }}
              _active={{ bg: "gray.500" }}
            >
              中止
            </Button>
          </Link>
          <Link href="/admin/articles">
            <Button ml={2} colorScheme="green">
              公開
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}
