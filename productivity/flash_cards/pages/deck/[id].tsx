import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { FlashCard } from "../../components/FlashCard";
import { Header } from "../../components/Header";
import { OperationBar } from "../../components/OperationBar";

const DeckPlayPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  return (
    <Box h="100vh" variant="line">
      <Header />
      <FlashCard />
      <OperationBar mt={5} />
    </Box>
  );
};

export default DeckPlayPage;
