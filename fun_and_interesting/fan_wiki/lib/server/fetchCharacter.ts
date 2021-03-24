import {
  CharacterFromExternalAPI,
  Character,
} from "../../pages/api/characters/[characterIds]";
import { fetchEpisodes } from "./fetchEpisodes";

const extractIdFromUrl = (url: string) => {
  const paths = url.split("/").filter((s) => Boolean(s));
  return paths[paths.length - 1];
};

export const fetchCharacter = async (ids: string[]): Promise<Character[]> => {
  if (ids.length === 0) {
    return [];
  }

  const res = await fetch(`https://rickandmortyapi.com/api/character/${ids}`);
  const data:
    | CharacterFromExternalAPI
    | CharacterFromExternalAPI[] = await res.json();
  const fetchedCharacters = Array.isArray(data) ? data : [data];

  // episodeの読み込み
  const episodeIds = fetchedCharacters
    .map((character) =>
      character.episode.map((episodeUrl) => extractIdFromUrl(episodeUrl))
    )
    .flat();
  const episodeIdsToFetch = Array.from(new Set(episodeIds));
  const fetchedEpisodes = await fetchEpisodes(episodeIdsToFetch);

  // characterの変換
  const characters: Character[] = fetchedCharacters.map((character) => {
    const episodes = character.episode.map((episodeURL) => {
      const episodeId = extractIdFromUrl(episodeURL);
      const episode = fetchedEpisodes.find(
        (episode) => episode.id === episodeId
      ) ?? { id: "", name: "" };
      return episode;
    });

    return {
      id: character.id.toString(),
      episodes,
      name: character.name,
      image: character.image,
      location: character.location,
      origin: character.origin,
      species: character.species,
      status: character.status,
    };
  });

  return characters;
};
