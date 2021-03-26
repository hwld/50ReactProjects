import React, { forwardRef, PropsWithChildren } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "./Link";
import { Image } from "./Image";
import { CharacterStatusIcon } from "./CharacterStatusIcon";
import { Character } from "../pages/api/characters/[characterIds]";
import { motion } from "framer-motion";

type Props = {
  character: Character;
  onBeforeNavigation?: () => void;
};

const Component = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  ({ character, onBeforeNavigation }, ref) => {
    return (
      <Link
        role="group"
        href={`/characters/${character.id}`}
        onClick={onBeforeNavigation}
        _focus={{ boxShadow: "none", zIndex: 1 }}
      >
        <Flex
          ref={ref}
          w="500px"
          h="200px"
          _groupFocus={{ boxShadow: "var(--chakra-shadows-outline)" }}
        >
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
  }
);

export const CharacterCard = motion(Component);
