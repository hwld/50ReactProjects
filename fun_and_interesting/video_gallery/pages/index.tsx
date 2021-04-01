import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { YouTubeVideo } from "../components/YouTubeVideo";
import { useInterSectionObserver } from "../hooks/useIntersectionObservre";
import { useVideos } from "../hooks/useVideos";
import { fetchVideos } from "../lib/server/fetchVideos";
import { QueryKeys } from "../queryKeys";

const Home: NextPage = () => {
  const bottomElement = useRef<HTMLDivElement | null>(null);
  const [, render] = useState(false);
  const { videoIds, fetchNextVideoIds } = useVideos();

  // 再生リストの重複を考慮
  const deduplicationVideoIds = useMemo(() => Array.from(new Set(videoIds)), [
    videoIds,
  ]);

  useInterSectionObserver({
    target: bottomElement.current,
    onIntersect: () => {
      fetchNextVideoIds();
    },
  });

  // 初回レンダリング後に再レンダリングしてbottomElementをElementにする
  // 初回レンダリング前だとbottomElementはnullになっている
  useEffect(() => {
    render(true);
  }, []);

  return (
    <Box minH="100vh">
      <Flex bg="gray.50" p={1} h="200px">
        <Heading mt="4rem" ml="6rem" size="3xl">
          🐺リモート極地🐧
        </Heading>
      </Flex>

      <Grid
        my={10}
        gap={5}
        gridTemplateColumns="repeat(auto-fill, 600px)"
        justifyContent="center"
      >
        {deduplicationVideoIds.map((id) => (
          <YouTubeVideo key={id} id={id} />
        ))}
      </Grid>
      <Box ref={bottomElement} height="100px" />
    </Box>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(QueryKeys.videos, () =>
    fetchVideos({})
  );

  return {
    props: {
      prefetchedQueryClient: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
