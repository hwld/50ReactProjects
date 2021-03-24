import { Box, Button, Center, Flex, Grid, Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import { CharacterCard } from "../components/CharacterCard";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useCharacters } from "../hooks/useCharacters";
import { useScrollY } from "../hooks/useScrollY";
import { fetchCharacter } from "../lib/server/fetchCharacter";

const Home: NextPage = () => {
  const [limit] = useState(10);
  const { characters, fetchNextPage, isFetching } = useCharacters(limit);
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
      <Grid
        my={8}
        gap={8}
        gridTemplateColumns="repeat(auto-fill, 500px)"
        justifyContent="center"
      >
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onBeforeNavigation={saveScrollY}
          />
        ))}
      </Grid>
      <Button
        mb={10}
        mx="auto"
        w="150px"
        bg="gray.500"
        display="flex"
        _hover={{ bg: "gray.400" }}
        onClick={() => fetchNextPage()}
        isLoading={isFetching}
      >
        もっと読み込む
      </Button>
    </Box>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery("characters", async () => {
    return fetchCharacter(
      [...Array(10)].map((_, index) => (index + 1).toString())
    );
  });

  return {
    props: {
      // https://github.com/tannerlinsley/react-query/issues/1458#issuecomment-747716357
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
