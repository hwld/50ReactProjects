import { Box, Button, Grid, Heading, Image, Text } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";

type Character = {
  id: number;
  name: string;
  image: string;
};

function fetchCharacters(
  ids: number[] = [...Array(9)].map((_, index) => index + 1)
) {
  return fetch(`https://rickandmortyapi.com/api/character/${[...ids]}`).then(
    async (res) => {
      return res.json();
    }
  );
}
type HomeProps = {
  initialCharacters: Character[];
};
const Home: NextPage<HomeProps> = ({ initialCharacters }) => {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [limit] = useState(21);

  const readMoreCharacters = async () => {
    const offset = characters.length + 1;
    const ids = [...Array(limit)].map((id, index) => offset + index);
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
          <Box key={d.id}>
            <Image src={d.image} boxSize="300px" />
            <Text>{d.name}</Text>
          </Box>
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
