import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Link,
  Image,
  VStack,
  Center,
} from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import React from "react";
import { Header } from "../components/Header";
import { fetchAllSpeakers } from "../fetch/fetchAllSpeakers";
import { Speaker } from "./speakers/[id]";
import NextLink from "next/link";

type HomePageProps = { speakers: Speaker[] };

const Home: NextPage<HomePageProps> = ({ speakers }) => {
  return (
    <>
      <Header />
      <VStack spacing={10} mx="auto" maxW="1300px">
        <Center py="50px" flexDir="column">
          <Heading size="4xl" color="yellow.300">
            🍌BananaConf
          </Heading>
          <Text
            mt={5}
            align="center"
            maxW="600px"
            fontSize="2xl"
            color="yellow.200"
          >
            A conference about bananas for cool monkeys.
            <br /> Discovery of new banana species, new banana dishes, new
            banana benefits, etc...
          </Text>
        </Center>

        <Center flexDir="column" w="100%" bg="gray.900" py={10}>
          <Input
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
            mt={8}
            bg="yellow.300"
            borderRadius="0"
            color="black"
            pb="2px"
            _hover={{ bg: "yellow.200" }}
            _active={{ bg: "yellow.400" }}
          >
            Buy a Ticket
          </Button>
        </Center>

        <Box>
          <Text
            textAlign="center"
            fontSize="4xl"
            fontWeight="bold"
            color="green.300"
          >
            Speakers
          </Text>
          <Flex mt={2} wrap="wrap" justify="center">
            {speakers.map((speaker) => {
              return (
                <NextLink href={`speakers/${speaker.id}`} key={speaker.id}>
                  <Link _hover={{ bg: "gray.600" }}>
                    <Center m={3} flexDir="column" w="300px">
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
                    </Center>
                  </Link>
                </NextLink>
              );
            })}
          </Flex>
        </Box>
      </VStack>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const speakers = await fetchAllSpeakers();

  return { props: { speakers } };
};
