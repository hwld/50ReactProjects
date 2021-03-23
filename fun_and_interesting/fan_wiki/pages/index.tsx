import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import { CharacterCard } from "../components/CharacterCard";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { fetchCharacters, useCharacters } from "../hooks/useCharacters";
import { useScrollY } from "../hooks/useScrollY";

const Home: NextPage = () => {
  const [limit] = useState(20);
  const { characters, fetchNextPage } = useCharacters(limit);
  const { scrollY, saveScrollY } = useScrollY();

  // スクロール位置の復元
  useEffect(() => {
    window.scrollTo(0, scrollY ?? 0);
  }, []);

  return (
    <Box w="100%">
      <Center bg="gray.300" h="30vh">
        <Heading size="4xl" textAlign="center" color="gray.700">
          The Rick and Morty Characters
        </Heading>
      </Center>
      <Flex justify="center" wrap="wrap" py={5}>
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onBeforeNavigation={saveScrollY}
          />
        ))}
      </Flex>
      <Button
        mb={10}
        mx="auto"
        display="block"
        bg="gray.500"
        _hover={{ bg: "gray.400" }}
        onClick={() => fetchNextPage()}
      >
        もっと読み込む
      </Button>
    </Box>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery("characters", fetchCharacters);

  return {
    props: {
      // https://github.com/tannerlinsley/react-query/issues/1458#issuecomment-747716357
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
