import {
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "react-query";
import { Character } from "../fetch";

type FetchParams = { ids: string[] };
export async function fetchCharacters(
  context: QueryFunctionContext<unknown[], FetchParams>
): Promise<Character[]> {
  const ids =
    context.pageParam?.ids ??
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

type UseCharactersResult = Omit<
  UseInfiniteQueryResult<Character[], unknown>,
  "data"
> & { characters: Character[] };

export const useCharacters = (limit?: number): UseCharactersResult => {
  const result = useInfiniteQuery("characters", fetchCharacters, {
    staleTime: Infinity,
    getNextPageParam: (_, allPages): FetchParams => {
      const offset = allPages.flat().length + 1;
      const ids = [...Array(limit ?? 0)].map((_, index) =>
        (offset + index).toString()
      );
      return { ids: ids };
    },
  });

  return { characters: result.data?.pages.flat() ?? [], ...result };
};
