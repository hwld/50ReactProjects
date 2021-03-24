import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "./Link";
import { Image } from "./Image";
import { CharacterStatusIcon } from "./CharacterStatusIcon";
import { Character } from "../pages/api/characters/[characterIds]";

type Props = {
  character: Character;
  onBeforeNavigation?: () => void;
};

const Component: React.FC<Props> = ({ character, onBeforeNavigation }) => {
  return (
    <Link href={`/characters/${character.id}`} onClick={onBeforeNavigation}>
      <Flex w="500px" h="200px" _hover={{ opacity: 0.7 }}>
        <Image
          flexShrink={0}
          alignSelf="center"
          w={200}
          h={200}
          borderLeftRadius="50%"
          bg="gray.400"
          src={character.image}
          imageWidth={200}
          imageHeight={200}
          layout="fixed"
        />
        <Box
          p={3}
          minW={0}
          overflow="auto"
          flexGrow={1}
          bg="blue.500"
          borderRightRadius="20px"
        >
          <Heading size="lg">{character.name}</Heading>
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
    </Link>
  );
};

export const CharacterCard = Component;
