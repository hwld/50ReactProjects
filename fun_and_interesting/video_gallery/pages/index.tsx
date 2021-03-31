import { Box, Grid, Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import YouTube from "react-youtube";
import { useInterSectionObserver } from "../hooks/useIntersectionObservre";
import { useVideos } from "../hooks/useVideos";
import { fetchVideos } from "../lib/server/fetchVideos";
import { QueryKeys } from "../queryKeys";

const Home: NextPage = () => {
  const bottomElement = useRef<HTMLDivElement | null>(null);
  const [, rerender] = useState(false);
  const { videoIds, fetchNextVideoIds } = useVideos();

  // 初回レンダリング後に再レンダリングしてuseInterSectionObserverにElementを渡せるようにする
  useEffect(() => {
    rerender(true);
  }, []);

  useInterSectionObserver({
    target: bottomElement.current,
    onIntersect: () => {
      fetchNextVideoIds();
    },
  });

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
        my={3}
        gap={5}
        gridTemplateColumns="repeat(auto-fill, 600px)"
        justifyContent="center"
      >
        {videoIds.map((id) => (
          // レイアウトシフトの防止
          <Box w="600px" h="360" bg="gray.500" key={id}>
            <YouTube
              opts={{ width: "600", height: "360" }}
              videoId={id}
              onPlay={() => console.log("play")}
            />
          </Box>
        ))}
      </Grid>
      <Box ref={bottomElement} />
    </Box>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  queryClient.prefetchInfiniteQuery(QueryKeys.videos, () => fetchVideos({}));

  return { props: { prefetchedQueryClient: dehydrate(queryClient) } };
};
