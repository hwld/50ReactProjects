import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useRef } from "react";
import { useMutation } from "react-query";
import { deleteArticle } from "../../lib/client/deleteArticle";
import { Article } from "../../types/article";
import { formatDate } from "../../util/formatDate";

type Props = { article: Article };

const Component: React.FC<Props> = ({ article }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const deleteMutation = useMutation(deleteArticle);

  const handleClick = async () => {
    deleteMutation.mutate(article.id);
    onClose();
  };

  return (
    <>
      <Tr>
        <Td>{article.title}</Td>
        <Td>{formatDate(new Date(article.publishedAt))}</Td>
        <Td>{formatDate(new Date(article.revisedAt))}</Td>
        <Td>
          <Link
            href={{
              pathname: "/admin/articles/edit",
              query: { id: article.id },
            }}
          >
            <Button colorScheme="blue">編集</Button>
          </Link>
          <Button colorScheme="red" ml={3} onClick={onOpen}>
            削除
          </Button>
        </Td>
      </Tr>

      <AlertDialog
        isCentered
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>記事の削除</AlertDialogHeader>

          <AlertDialogBody>
            復元することはできませんが、記事を削除しても良いですか？
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleClick} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const ArticleTableRow = Component;
