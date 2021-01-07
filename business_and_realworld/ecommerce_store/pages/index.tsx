import { Box, Grid, Heading, Link, Image, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { NextPage } from "next";
import React from "react";
import { Header } from "../components/Header";

const Home: NextPage = () => {
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
          {[...Array(30)].map((_, i) => (
            <Box _hover={{ opacity: 0.6 }}>
              <NextLink key={i} href="/games/1">
                <Link>
                  <Image src="/game.jpg" h="200px" w="100%" fit="cover" />
                </Link>
              </NextLink>
              <Text textAlign="center">GameName</Text>
            </Box>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
