import { GetStaticProps, NextPage } from "next";
import React from "react";
import { Header } from "../components/Header";
import { HomeMain } from "../components/HomeMain";
import { fetchAllSpeakers } from "../fetch/fetchAllSpeakers";
import { Speaker } from "./speakers/[id]";

type HomePageProps = { speakers: Speaker[] };

const Home: NextPage<HomePageProps> = ({ speakers }) => {
  return (
    <>
      <Header />
      <HomeMain speakers={speakers} />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const speakers = await fetchAllSpeakers();

  return { props: { speakers } };
};
