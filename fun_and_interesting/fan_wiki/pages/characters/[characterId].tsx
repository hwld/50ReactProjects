import React, { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Image } from "../../components/Image";
import { CharacterStatusIcon } from "../../components/CharacterStatusIcon";
import { useCharacters } from "../../hooks/useCharacters";
import { useCharacter } from "../../hooks/useCharacter";
import { useAnimation } from "framer-motion";
import { MotionBox } from "../../components/MotionBox";

type CharacterPageProps = {
  characterId: string;
};

const CharacterPage: NextPage<CharacterPageProps> = ({ characterId }) => {
  const { characters } = useCharacters();
  const cachedCharacter = characters.find((c) => c.id === characterId);

  const { character, fetchCharacter } = useCharacter(characterId, {
    initialCharacter: cachedCharacter,
  });

  const animationControls = useAnimation();

  const animate = async () => {
    await animationControls.start({
      scale: 1,
      rotate: 0,
      transition: { duration: 0.3 },
    });
    return animationControls.start({
      y: [0, -100, 0],
      transition: { repeat: Infinity },
    });
  };

  // キャラクタ情報がなければキャラクタ情報を読み込む
  useEffect(() => {
    if (character) {
      //キャラクタが読み込まれたときにアニメーションを開始する
      animate();
      return;
    }
    fetchCharacter();
  }, [character, characterId]);

  return (
    // marginの相殺でmargin-topが当たらないようにパディングを設定する
    <Box pt={1}>
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
        <MotionBox
          w="800px"
          maxW="100%"
          m="auto"
          mt="180px"
          animate={animationControls}
          initial={{ scale: 10, rotate: 360 }}
        >
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
        </MotionBox>
      )}
    </Box>
  );
};

export default CharacterPage;

export const getServerSideProps: GetServerSideProps<CharacterPageProps> = async ({
  params,
}) => {
  const characterId = params?.characterId;

  // ファイル名に中括弧がないときにundefined
  // ファイル名の中括弧に3点があるとき( [...slug].tsxなど )にstring[]
  if (typeof characterId !== "string") {
    throw new Error("ファイル名は[slug].tsxのような形式にしてください。");
  }

  return { props: { characterId } };
};
