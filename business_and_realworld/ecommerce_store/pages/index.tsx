import { Box, Grid, Heading, Link, Image, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { GetStaticProps, NextPage } from "next";
import React from "react";
import { Header } from "../components/Header";
import Game from "./games/[id]";
import { fetchAllGames } from "../lib/fetchAllGames";

export type Game = {
  id: string;
  name: string;
  price: number;
  aboutThisGame: string;
  moreDetails: string;
};

type HomeProps = { games: Game[] };

const Home: NextPage<HomeProps> = ({ games }) => {
  return (
    <>
      <Header />
      <Box mx="auto" maxW="1300px">
        <Image my={14} src="/banner.jpg" w="100%" h="40%" />
        <Heading textAlign="center">Games</Heading>
        <Grid
          justifyContent="center"
          templateColumns="repeat(auto-fill, 300px)"
          autoRows="250px"
          mt={5}
          gap={3}
        >
          {games.map((game) => (
            <Box key={game.id} _hover={{ opacity: 0.6 }}>
              <NextLink href={`/games/${game.id}`}>
                <Link>
                  <Image src="/game.jpg" h="200px" w="100%" fit="cover" />
                </Link>
              </NextLink>
              <Text textAlign="center">{game.name}</Text>
            </Box>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const games = await fetchAllGames();
  return { props: { games } };
};
