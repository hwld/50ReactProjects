import { QueryFunctionContext, useQuery, UseQueryResult } from "react-query";
import { Character } from "../pages/api/characters/[characterIds]";

type UseCharacterQueryKey = [string, { characterId: string | undefined }];
type UseCharacterResult = Omit<UseQueryResult, "data"> & {
  character: Character | undefined;
};

export const useCharacter = (
  characterId: string | undefined,
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

    if (characterId === undefined) {
      return undefined;
    }
    const res = await fetch(`/api/characters/${characterId}`);
    if (!res.ok) {
      return undefined;
    }

    const character: Character = (await res.json())[0];
    return character;
  };

  const result = useQuery(characterQueryKey, characterQueryFn, {
    staleTime: Infinity,
    initialData: option.initialCharacter,
  });

  return { character: result.data, ...result };
};
