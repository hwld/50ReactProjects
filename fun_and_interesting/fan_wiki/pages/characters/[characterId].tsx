import React, { useEffect } from "react";
import { NextPage } from "next";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Image } from "../../components/Image";
import { CharacterStatusIcon } from "../../components/CharacterStatusIcon";
import { useCharacters } from "../../hooks/useCharacters";
import { useCharacter } from "../../hooks/useCharacter";
import { Character } from "../api/characters/[characterIds]";

type Props = {
  character: Character;
};

const CharacterPage: NextPage<Props> = ({}) => {
  const router = useRouter();
  const characterId = router.query.characterId as string | undefined;
  const { characters } = useCharacters();
  const cachedCharacter = characters.find((c) => c.id === characterId);

  const { character, refetch: refetchCharacter } = useCharacter(characterId, {
    initialCharacter: cachedCharacter,
  });

  // キャラクタ情報がなければキャラクタ情報を読み込む
  useEffect(() => {
    if (character) {
      return;
    }
    refetchCharacter();
  }, [character, characterId]);

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
            {character.episodes.map((episode) => (
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
