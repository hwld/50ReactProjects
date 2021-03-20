import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useAppState } from "../context/AppContext";
import { useCharacters, useSetCharacters } from "../context/CharactersContext";
import { Character, fetchCharacters } from "../fetch";
import { CharacterCard } from "../components/CharacterCard";

type HomeProps = {
  initialCharacters: Character[];
};

const Home: NextPage<HomeProps> = ({ initialCharacters }) => {
  const [characters, setCharacters] = [useCharacters(), useSetCharacters()];
  const { scrollY, setScrollY } = useAppState();
  const [limit] = useState(21);

  const saveScrollY = () => {
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
    <Box w="100%">
      <Center bg="gray.300" h="30vh">
        <Heading size="4xl" textAlign="center" color="gray.700">
          The Rick and Morty Characters
        </Heading>
      </Center>
      <Flex justify="center" wrap="wrap" py={5}>
        {characters.map((c) => (
          <CharacterCard
            key={c.id}
            character={c}
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
