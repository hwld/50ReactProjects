import { Box, Grid, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { NextPage } from "next";
import React from "react";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Box mx="auto" maxW="1300px">
        <Box my={14} bg="blue.500" height="300px"></Box>
        <Grid
          justifyContent="center"
          templateColumns="repeat(auto-fill, 300px)"
          autoRows="200px"
          gap={3}
        >
          {[...Array(30)].map((_, i) => (
            <NextLink key={i} href="/games/1">
              <Link>
                <Box boxSize="100%" bg="blue.500" />
              </Link>
            </NextLink>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
