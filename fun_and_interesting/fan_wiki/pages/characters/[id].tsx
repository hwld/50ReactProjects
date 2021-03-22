import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Character, Episode, fetchCharacter, fetchEpisodes } from "../../fetch";
import { useRouter } from "next/router";
import { Image } from "../../components/Image";
import { CharacterStatusIcon } from "../../components/CharacterStatusIcon";
import { useInfiniteQuery } from "react-query";

type Props = {
  character: Character;
};

const CharacterPage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useInfiniteQuery<Character[]>("characters");
  const characters = data?.pages.flat() ?? [];
  const [character, setCharacter] = useState<Character | undefined>(
    characters.find((c) => c.id === id)
  );
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  // グローバルステートにキャラクタ情報がなければキャラクタ情報を読み込む
  useEffect(() => {
    if (character || typeof id !== "string") {
      return;
    }
    fetchCharacter(id).then((c) => setCharacter(c));
  }, [character, id]);

  // キャラクターが登場したエピソードを読み込む
  useEffect(() => {
    if (episodes.length !== 0 || !character) {
      return;
    }
    const episodeIds = character.episode.map((episodeUrl) => {
      const paths = episodeUrl.split("/").filter((s) => Boolean(s));
      return paths[paths.length - 1];
    });

    fetchEpisodes(episodeIds).then((episodes) => {
      if (!episodes) {
        return;
      }
      setEpisodes(episodes);
    });
  }, [character]);

  return (
    <Box overflow="auto">
      <Box
        bg="gray.500"
        h="30vh"
        w="100%"
        pos="absolute"
        top={0}
        left={0}
        zIndex={-1}
      />
      {character && (
        <Box w="800px" maxW="100%" m="auto" mt="180px">
          <Flex align="center">
            <Image
              src={character.image}
              imageWidth={300}
              imageHeight={300}
              borderRadius="50%"
              flexShrink={0}
              alignSelf="flex-start"
            />
            <Box ml={10} minW={0}>
              <Heading size="3xl">{character.name}</Heading>
              <Flex align="center" ml={3} mt={3}>
                <CharacterStatusIcon
                  boxSize="0.8rem"
                  status={character.status}
                  flexShrink={0}
                  mr={1}
                />
                <Text minW={0} fontWeight="bold" fontSize="xl">
                  {character.status} - {character.species}
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Box mt={5}>
            <Heading>Origin location</Heading>
            <Text ml={3} fontSize="xl">
              {character.origin.name}
            </Text>

            <Heading mt={3}>Last known location</Heading>
            <Text ml={3} fontSize="xl">
              {character.location.name}
            </Text>

            <Heading mt={3}>Episodes that appeared</Heading>
            {episodes.map((episode) => (
              <Text
                key={episode.id}
                ml={3}
                fontSize="xl"
              >{`Episode${episode.id} - ${episode.name}`}</Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CharacterPage;
