import { NextApiHandler } from "next";
import { fetchVideos, VideosData } from "../../lib/server/fetchVideos";

// next.jsが定義しているqueryはundefinedのユニオンが取られていないので独自に定義する
type NextApiRequestQuery = { [key: string]: string | string[] | undefined };

const videos: NextApiHandler<VideosData> = async (req, res) => {
  const { maxResults, pageToken } = req.query as NextApiRequestQuery;

  if (Array.isArray(maxResults) || Array.isArray(pageToken)) {
    throw new Error("Error: Wrong query parameters");
  }

  const videos = await fetchVideos({
    maxResults,
    pageToken,
  });
  res.json(videos);
};

export default videos;
