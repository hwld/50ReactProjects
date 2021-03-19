import { Box, Button, Grid, Heading, Link, Text } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import NextImage from "next/image";
import React, { useEffect, useState } from "react";
import { useAppState } from "../context/AppContext";
import { useCharacters, useSetCharacters } from "../context/CharactersContext";
import { Character, fetchCharacters } from "../fetch";

type HomeProps = {
  initialCharacters: Character[];
};

const Home: NextPage<HomeProps> = ({ initialCharacters }) => {
  const [characters, setCharacters] = [useCharacters(), useSetCharacters()];
  const { scrollY, setScrollY } = useAppState();
  const [limit] = useState(21);

  const handleLinkClick = () => {
    setScrollY(window.scrollY);
  };

  const readMoreCharacters = async () => {
    const offset = characters.length + 1;
    const ids = [...Array(limit)].map((id, index) =>
      (offset + index).toString()
    );
    const fetchedCharacters = await fetchCharacters(ids);
    if (fetchedCharacters) {
      setCharacters((characters) => [...characters, ...fetchedCharacters]);
    }
  };

  // スクロール位置の復元
  useEffect(() => {
    window.scrollTo(0, scrollY);
  }, []);

  // 何も読み込まれていなければinitialCharactersをセット
  useEffect(() => {
    if (characters.length === 0) {
      setCharacters(initialCharacters);
    }
  }, []);

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
            <Link onClick={handleLinkClick}>
              <Box>
                <NextImage src={d.image} width={300} height={300} />
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
  if (!characters) {
    return { props: { initialCharacters: [] } };
  }

  return { props: { initialCharacters: characters } };
};
