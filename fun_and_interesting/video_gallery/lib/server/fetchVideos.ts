type FetchedVideosData = {
  items: { contentDetails: { videoId: string } }[];
  nextPageToken?: string;
};

export type VideosData = { videoIds: string[]; nextPageToken?: string };

export type FetchVideosOption = { maxResults?: string; pageToken?: string };

export type FetchVideos = (opt: FetchVideosOption) => Promise<VideosData>;

export const fetchVideos: FetchVideos = async ({
  maxResults = "5",
  pageToken,
}) => {
  // https://github.com/vercel/next.js/issues/5354#issuecomment-520305040
  if (typeof window !== "undefined") {
    throw new Error("Error: Execution on the client side is not allowed.");
  }

  let url = "https://www.googleapis.com/youtube/v3/playlistItems?";
  url += "&key=" + process.env.API_KEY;
  url += "&playlistId=" + process.env.PLAYLIST_ID;
  url += "&part=contentDetails";
  url += "&maxResults=" + maxResults;
  if (pageToken) {
    url += "&pageToken=" + pageToken;
  }

  const res = await fetch(url);
  const data: FetchedVideosData = await res.json();

  const videoIds = data.items.map((item) => item.contentDetails.videoId);
  const nextPageToken = data.nextPageToken;

  return { videoIds, nextPageToken };
};
