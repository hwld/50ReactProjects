import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { useAppState } from "../context/AppContext";
import { useCharacters, useSetCharacters } from "../context/CharactersContext";
import { fetchCharacters } from "../fetch";

const Home: NextPage = () => {
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

  useEffect(() => {
    window.scrollTo(0, scrollY);
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
