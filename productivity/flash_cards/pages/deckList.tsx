import { Box, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { DeckListItem } from "../components/DeckListItem";
import { Header } from "../components/Header";
import { useDeckListContext } from "../contexts/DeckListContext";

const DeckListPage: NextPage = () => {
  const { deckList } = useDeckListContext();

  return (
    <Box h="100vh" variant="line">
      <Header />
      <Button ml={5} colorScheme="green">
        デッキ追加
      </Button>
      {deckList.map((deck) => {
        return <DeckListItem key={deck.id} deck={deck} m={5} />;
      })}
    </Box>
  );
};

export default DeckListPage;
