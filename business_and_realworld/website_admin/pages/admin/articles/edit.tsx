import { Box, Button, Flex, Input, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { auth0 } from "../../../lib/auth0";
import { postArticle } from "../../../lib/postArticle";
import { patchArticle } from "../../../lib/patchArticle";

export default function EditPage(): JSX.Element {
  const router = useRouter();
  const id = router.query.id;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleClick = async () => {
    if (typeof id === "string") {
      await patchArticle(id, {
        title: "p222222222atch",
        text: "p22222222222atch",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } else {
      await postArticle({
        title,
        text,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    router.push("/admin/articles");
  };

  return (
    <Box>
      <Box
        w="1300px"
        mt={10}
        mx="auto"
        p={10}
        bg="gray.100"
        boxShadow="xl"
        borderRadius="15px"
      >
        <Box>
          <Text>タイトル</Text>
          <Input
            mt={3}
            bg="gray.200"
            placeholder="タイトル"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Box>
        <Box mt={5}>
          <Text>記事</Text>
          <Textarea
            mt={3}
            h="30em"
            bg="gray.200"
            placeholder="記事"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
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
          <Button ml={2} colorScheme="green" onClick={handleClick}>
            {typeof id === "string" ? "更新" : "作成"}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await auth0.getSession(req);
  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/api/login?redirectTo=/admin/articles/edit",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
