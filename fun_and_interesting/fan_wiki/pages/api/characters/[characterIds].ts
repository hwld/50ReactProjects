import { NextApiHandler } from "next";
import { fetchCharacter } from "../../../lib/server/fetchCharacter";

export type Episode = {
  id: string;
  name: string;
};

export type CharacterFromExternalAPI = {
  id: number;
  image: string;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  origin: { name: string };
  location: { name: string };
  // 登場したエピソードのurl. ~/episodeId　のようなurlになっている。
  episode: string[];
};

export type Character = Omit<CharacterFromExternalAPI, "id" | "episode"> & {
  id: string;
  episodes: Episode[];
};

export const character: NextApiHandler<Character[]> = async (req, res) => {
  // characterIdsとして、 characters/1 や characters/1,2,3,4,5 などを受け入れる
  const { characterIds } = req.query;

  if (typeof characterIds !== "string") {
    throw new Error(
      "ファイル名の角括弧内に3つのドット(...)を使用せずに、[slug].tsのようなファイル名にしてください。"
    );
  }

  const character = await fetchCharacter([characterIds]);

  res.json(character);
};

export default character;
