import {
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "react-query";
import { VideosData } from "../lib/server/fetchVideos";
import { QueryKeys } from "../queryKeys";

type UseVideosPageParam = { maxResults?: string; nextPageToken?: string };

type UseVideosResult = Omit<
  UseInfiniteQueryResult,
  "data" | "fetchNextPage"
> & { videoIds: string[]; fetchNextVideoIds: () => void };

export const useVideos = (): UseVideosResult => {
  const result = useInfiniteQuery(
    QueryKeys.videos,
    async (context: QueryFunctionContext<unknown[], UseVideosPageParam>) => {
      const maxResults = context.pageParam?.maxResults;
      const nextPageToken = context.pageParam?.nextPageToken;

      let url = "/api/videos?";
      if (maxResults) {
        url += "&maxResults=" + maxResults;
      }
      if (nextPageToken) {
        url += "&pageToken=" + nextPageToken;
      }

      const res = await fetch(url);
      const videoData: VideosData = await res.json();
      return videoData;
    },
    {
      getNextPageParam: (lastPage): UseVideosPageParam => {
        return { nextPageToken: lastPage.nextPageToken };
      },
    }
  );

  const videoIds = result.data?.pages.map((page) => page.videoIds).flat() ?? [];

  return {
    videoIds,
    fetchNextVideoIds: result.fetchNextPage,
    ...result,
  };
};
