import {
  Button,
  Flex,
  Input,
  Text,
  Image,
  Heading,
  Box,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { Speaker } from "../pages/speakers/[id]";

type HomeMainProps = { speakers: Speaker[] };

export const HomeMain: React.FC<HomeMainProps> = ({ speakers }) => {
  return (
    <Box maxW="1300px" mx="auto">
      <Flex
        mt="30px"
        p="50px"
        w="100%"
        justify="center"
        align="center"
        direction="column"
      >
        <Heading size="4xl" color="yellow.300">
          🍌BananaConf
        </Heading>
        <Text
          mt="5"
          fontSize="2xl"
          maxW="600px"
          align="center"
          color="yellow.200"
        >
          A conference about bananas for cool monkeys.
          <br /> Discovery of new banana species, new banana dishes, new banana
          benefits, etc...
        </Text>
      </Flex>

      <Flex
        bg="gray.900"
        mt="30px"
        w="100%"
        direction="column"
        align="center"
        justify="center"
      >
        <Input
          mt={10}
          w="50%"
          placeholder="name"
          borderRadius="0"
          focusBorderColor="yellow.300"
        />
        <Input
          mt={5}
          w="50%"
          placeholder="email-address"
          borderRadius="0"
          focusBorderColor="yellow.300"
        />
        <Button
          bg="yellow.300"
          _hover={{ bg: "yellow.200" }}
          _active={{ bg: "yellow.400" }}
          color="black"
          pb="2px"
          mt={5}
          mb={10}
          borderRadius="0"
        >
          Buy a Ticket
        </Button>
      </Flex>

      <Text
        mt="50px"
        textAlign="center"
        fontSize="4xl"
        fontWeight="bold"
        color="green.300"
      >
        Speakers
      </Text>
      <Flex mt="5px" w="100%" wrap="wrap" justify="center">
        {speakers.map((speaker) => {
          return (
            <NextLink href={`speakers/${speaker.id}`}>
              <Link _hover={{ bg: "gray.900" }}>
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  w="300px"
                  m="3"
                  key={speaker.id}
                >
                  <Image
                    border="2px"
                    borderRadius="full"
                    borderColor="white"
                    boxSize="250px"
                    src={speaker.avatar}
                  />

                  <Text fontSize="xl" color="green.400" fontWeight="bold">
                    {speaker.name}
                  </Text>
                  <Text
                    textAlign="center"
                    wordBreak="break-all"
                    color="green.200"
                  >
                    {speaker.theme}
                  </Text>
                </Flex>
              </Link>
            </NextLink>
          );
        })}
      </Flex>
    </Box>
  );
};
