import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Header } from "../../components/Header";
import { fetchAllSpeakers } from "../../fetch/fetchAllSpeakers";
import { Text, Image, Flex, Box, VStack } from "@chakra-ui/react";
import { fetchSpeaker } from "../../fetch/fetchSpeaker";
import React from "react";

export type Speaker = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  theme: string;
  themeDesc: string;
};

type SpeakerDetailPageProps = {
  speaker: Speaker;
};

const SpeakerDetail: NextPage<SpeakerDetailPageProps> = ({ speaker }) => {
  return (
    <>
      <Header />
      <Flex
        mt={8}
        mx="auto"
        maxW="1300px"
        justify="center"
        wordBreak="break-all"
        whiteSpace="pre-wrap"
      >
        <Image boxSize="300px" src={speaker.avatar} />
        <VStack ml="30px" spacing={5} maxW="800px">
          <Text w="100%" fontSize="5xl" fontWeight="bold">
            {speaker.name}
          </Text>
          <Box p="5" bg="gray.600">
            <Text fontWeight="bold" fontSize="3xl">
              Bio
            </Text>
            <Text mt={2}>{speaker.bio}</Text>
          </Box>
          <Box p="5" bg="gray.600">
            <Text fontWeight="bold" fontSize="3xl">
              {speaker.theme}
            </Text>
            <Text mt={2}>{speaker.themeDesc}</Text>
          </Box>
        </VStack>
      </Flex>
    </>
  );
};

export default SpeakerDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const speakers = await fetchAllSpeakers();

  const paths = speakers.map((s) => ({ params: { id: s.id } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params?.id !== "string") {
    return { props: { speaker: {} } };
  }

  const speaker = await fetchSpeaker(params.id);
  return { props: { speaker } };
};
