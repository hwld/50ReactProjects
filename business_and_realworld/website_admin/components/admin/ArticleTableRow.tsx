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

const Component: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Tr>
        <Td>記事1</Td>
        <Td>2020/01/10 00:00</Td>
        <Td>2020/01/10 00:00</Td>
        <Td>
          <Link href={{ pathname: "/admin/articles/edit", query: { id: "1" } }}>
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
            <Button colorScheme="red" onClick={onClose} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const ArticleTableRow = Component;
