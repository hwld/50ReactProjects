export type Episode = {
  id: string;
  name: string;
};

export type Character = {
  id: string;
  image: string;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  origin: { name: string };
  location: { name: string };
  // 最後の/にepisodeのidが続く
  episode: string[];
};

export async function fetchEpisodes(
  ids: string[]
): Promise<Episode[] | undefined> {
  const res = await fetch(
    `https://rickandmortyapi.com/api/episode/${[...ids]}`
  );
  if (!res.ok) {
    return undefined;
  }

  type Fetched = Omit<Episode, "id"> & { id: number };
  let fetched: Fetched[] | Fetched = await res.json();
  if (!Array.isArray(fetched)) {
    fetched = [fetched];
  }

  const episodes: Episode[] = fetched.map((e) => ({
    ...e,
    id: e.id.toString(),
  }));

  return episodes;
}
