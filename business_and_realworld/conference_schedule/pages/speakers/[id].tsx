import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Header } from "../../components/Header";
import { fetchAllSpeakers } from "../../fetch/fetchAllSpeakers";
import { Text, Image, Flex, Box } from "@chakra-ui/react";
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
        mt="30px"
        maxW="1300px"
        mx="auto"
        justify="center"
        wordBreak="break-all"
        whiteSpace="pre-wrap"
      >
        <Image mt="50px" boxSize="250px" src={speaker.avatar} />
        <Box ml="30px" maxW="800px">
          <Text fontSize="5xl" fontWeight="bold">
            {speaker.name}
          </Text>
          <Box mt="3" p="5" bg="gray.600">
            <Text fontWeight="bold" fontSize="3xl">
              Bio
            </Text>
            <Text mt="2">{speaker.bio}</Text>
          </Box>
          <Box mt="3" p="5" bg="gray.600">
            <Text fontSize="3xl" fontWeight="bold">
              {speaker.theme}
            </Text>
            <Text mt="2">{speaker.themeDesc}</Text>
          </Box>
        </Box>
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
