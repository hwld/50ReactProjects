import { Box, Grid, Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import YouTube from "react-youtube";

type HomeProps = {
  videoIds: string[];
};

const Home: NextPage<HomeProps> = ({ videoIds }) => {
  return (
    <Box minH="100vh">
      <Box bg="gray.50" p={1} h="200px">
        <Heading mt="4rem" ml="6rem" size="3xl">
          🐺リモート極地🐧
        </Heading>
      </Box>

      <Heading mt={5} textAlign="center">
        ビデオ
      </Heading>
      <Grid
        my={5}
        gap={10}
        gridTemplateColumns="repeat(auto-fill, 600px)"
        justifyContent="center"
      >
        {videoIds.map((id) => (
          <YouTube opts={{ width: "600" }} videoId={id} key={id} />
        ))}
      </Grid>
    </Box>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const PLAYLIST_ID = "PLS6Ups8QGSP3AnyKF_iHC-z78fpm8lHTv";

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.API_KEY}&playlistId=${PLAYLIST_ID}&maxResults=50&part=contentDetails&fields=items(contentDetails(videoId))`
  );
  const data: {
    items: { contentDetails: { videoId: string } }[];
  } = await res.json();
  const videoIds = data.items.map((item) => item.contentDetails.videoId);

  return { props: { videoIds } };
};
