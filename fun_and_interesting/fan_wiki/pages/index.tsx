import { Box, Button, Center, Grid, Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useRef } from "react";
import { CharacterCard } from "../components/CharacterCard";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useCharacters } from "../hooks/useCharacters";
import { useScrollY } from "../hooks/useScrollY";
import { fetchCharacter } from "../lib/server/fetchCharacter";
import { Variants } from "framer-motion";

const Home: NextPage = () => {
  const { characters, fetchNextCharacters, isFetching } = useCharacters(10);
  const { scrollY, saveScrollY } = useScrollY();
  const numOfCharactersBeforeLoadMore = useRef(characters.length);

  const animation: Variants = {
    enter: () => {
      return {
        scale: 1,
        transition: {
          duration: 0.5,
          type: "spring",
        },
      };
    },
    shake: () => {
      return {
        y: [10, -10, 10],
        transition: {
          repeat: Infinity,
          delay: Math.random(),
        },
      };
    },
    hover: {
      rotate: 360,
      scale: 1.5,
      transition: {
        duration: 0.3,
      },
      transitionEnd: {
        rotate: 0,
      },
    },
    tap: {
      scale: 10,
      rotate: 360,
      transition: { duration: 0.3 },
    },
  };

  const handleBeforeNavigation = async () => {
    saveScrollY();
  };

  const loadMoreCharacters = () => {
    numOfCharactersBeforeLoadMore.current = characters.length;
    fetchNextCharacters();
  };

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
        {characters.map((character, index) => {
          const doEnter = index >= numOfCharactersBeforeLoadMore.current;
          return (
            <CharacterCard
              key={character.id}
              character={character}
              onBeforeNavigation={handleBeforeNavigation}
              variants={animation}
              style={{ scale: doEnter ? 0 : 1 }}
              animate={doEnter ? ["enter", "shake"] : "shake"}
              whileHover="hover"
              whileTap="tap"
            />
          );
        })}
      </Grid>
      <Button
        mb={10}
        mx="auto"
        w="150px"
        bg="gray.500"
        display="flex"
        _hover={{ bg: "gray.400" }}
        onClick={loadMoreCharacters}
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
      prefetchedQueryClient: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
