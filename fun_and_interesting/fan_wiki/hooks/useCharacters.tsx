import {
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "react-query";
import { Character } from "../pages/api/characters/[characterIds]";

type UseCharactersPageParams = { ids: string[] };

type UseCharactersResult = Omit<
  UseInfiniteQueryResult<Character[], unknown>,
  "data" | "fetchNextPage"
> & { characters: Character[]; fetchNextCharacters: () => void };

export const useCharacters = (limit?: number): UseCharactersResult => {
  // getNextPageParamの戻り値とcontextの型を一致させるために関数を定義する
  const charactersQueryFn = async (
    context: QueryFunctionContext<unknown[], UseCharactersPageParams>
  ) => {
    const ids = context.pageParam?.ids;
    if (!ids) {
      return [];
    }

    const res = await fetch(`/api/characters/${ids}`);
    if (!res.ok) {
      throw new Error("");
    }

    const characters: Character[] = await res.json();
    return characters;
  };

  const result = useInfiniteQuery("characters", charactersQueryFn, {
    staleTime: Infinity,
    enabled: false,
    getNextPageParam: (_, allPages): UseCharactersPageParams => {
      const offset = allPages.flat().length + 1;
      const ids = [...Array(limit ?? 0)].map((_, index) =>
        (offset + index).toString()
      );
      return { ids: ids };
    },
  });

  return {
    characters: result.data?.pages.flat() ?? [],
    fetchNextCharacters: result.fetchNextPage,
    ...result,
  };
};
