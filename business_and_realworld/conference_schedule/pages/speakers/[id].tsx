import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Header } from "../../components/Header";
import { fetchAllSpeakers } from "../../fetch/fetchAllSpeakers";
import { Text, Image } from "@chakra-ui/react";
import { fetchSpeaker } from "../../fetch/fetchSpeaker";

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
      <Image src={speaker.avatar} />
      <Text>{speaker.name}</Text>
      <Text>{speaker.bio}</Text>
      <Text>{speaker.theme}</Text>
      <Text>{speaker.themeDesc}</Text>
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
