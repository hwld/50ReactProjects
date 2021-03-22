import { QueryFunctionContext } from "react-query";

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

export async function fetchCharacters(
  context: QueryFunctionContext<unknown[], string[]>
): Promise<Character[]> {
  const ids =
    context.pageParam ??
    [...Array(10)].map((_, index) => (index + 1).toString());

  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${[...ids]}`
  );
  if (!res.ok) {
    throw new Error("");
  }

  type Fetched = Omit<Character, "id"> & { id: number };
  let fetched: Fetched[] | Fetched = await res.json();
  if (!Array.isArray(fetched)) {
    fetched = [fetched];
  }

  const characters: Character[] = fetched.map((c) => ({
    ...c,
    id: c.id.toString(),
  }));

  return characters;
}

export async function fetchCharacter(
  id: string
): Promise<Character | undefined> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) {
    return undefined;
  }

  let character = await res.json();
  character = { ...character, id: character.id.toString() };
  return character;
}

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
