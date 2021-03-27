export type EpisodeFromExternalAPI = {
  id: number;
  name: string;
};

export type Episode = Omit<EpisodeFromExternalAPI, "id"> & { id: string };

export async function fetchEpisodes(ids: string[]): Promise<Episode[]> {
  if (ids.length === 0) {
    return [];
  }

  const res = await fetch(`https://rickandmortyapi.com/api/episode/${ids}`);
  const data:
    | EpisodeFromExternalAPI
    | EpisodeFromExternalAPI[] = await res.json();
  const fetchedEpisodes = Array.isArray(data) ? data : [data];

  const episodes = fetchedEpisodes.map(
    (e): Episode => ({ id: e.id.toString(), name: e.name })
  );

  return episodes;
}
