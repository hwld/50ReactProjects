import { QueryFunctionContext, useQuery, UseQueryResult } from "react-query";
import { Character } from "../pages/api/characters/[characterIds]";

type UseCharacterQueryKey = [string, { characterId: string }];

type UseCharacterResult = Omit<UseQueryResult, "data" | "refetch"> & {
  character: Character | undefined;
  fetchCharacter: () => void;
};

export const useCharacter = (
  characterId: string,
  option: { initialCharacter?: Character }
): UseCharacterResult => {
  // queryFnのContextの型と一致させるために明示的に型を指定する
  const characterQueryKey: UseCharacterQueryKey = [
    "character",
    { characterId },
  ];

  const characterQueryFn = async (
    context: QueryFunctionContext<UseCharacterQueryKey>
  ) => {
    const [, { characterId }] = context.queryKey;

    const res = await fetch(`/api/characters/${characterId}`);
    if (!res.ok) {
      return undefined;
    }

    const character: Character = (await res.json())[0];
    return character;
  };

  const result = useQuery(characterQueryKey, characterQueryFn, {
    staleTime: Infinity,
    enabled: false,
    initialData: option.initialCharacter,
  });

  return { character: result.data, fetchCharacter: result.refetch, ...result };
};
