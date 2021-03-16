import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import React, { useState } from "react";
import { Character, fetchCharacters } from "../fetch";

type HomeProps = {
  initialCharacters: Character[];
};

const Home: NextPage<HomeProps> = ({ initialCharacters }) => {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [limit] = useState(21);

  const readMoreCharacters = async () => {
    const offset = characters.length + 1;
    const ids = [...Array(limit)].map((id, index) =>
      (offset + index).toString()
    );
    const fetchedCharacters = await fetchCharacters(ids);
    setCharacters((characters) => [...characters, ...fetchedCharacters]);
  };

  return (
    <Box>
      <Heading textAlign="center" my={3}>
        Character Wiki
      </Heading>
      <Grid
        justifyContent="center"
        templateColumns="repeat(auto-fill, 300px)"
        gap={5}
      >
        {characters.map((d) => (
          <NextLink href={`/characters/${d.id}`} key={d.id}>
            <Link>
              <Box>
                <Image src={d.image} boxSize="300px" />
                <Text>{d.name}</Text>
              </Box>
            </Link>
          </NextLink>
        ))}
      </Grid>
      <Button
        my={3}
        mx="auto"
        display="block"
        bg="gray.500"
        _hover={{ bg: "gray.400" }}
        onClick={readMoreCharacters}
      >
        もっと読み込む
      </Button>
    </Box>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const characters = await fetchCharacters();

  return { props: { initialCharacters: characters } };
};
