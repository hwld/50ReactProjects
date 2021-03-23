import { QueryFunctionContext, useQuery, UseQueryResult } from "react-query";
import { Character } from "../fetch";

export async function fetchCharacter(
  context: QueryFunctionContext<[string, string | undefined]>
): Promise<Character | undefined> {
  const [, id] = context.queryKey;

  if (id === undefined) {
    return undefined;
  }

  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) {
    return undefined;
  }

  let character = await res.json();
  character = { ...character, id: character.id.toString() };
  return character;
}

type UseCharacterResult = Omit<UseQueryResult, "data"> & {
  character: Character | undefined;
};

export const useCharacter = (
  characterId: string | undefined,
  option: { initialCharacter?: Character }
): UseCharacterResult => {
  const result = useQuery(["character", characterId], fetchCharacter, {
    staleTime: Infinity,
    initialData: option.initialCharacter,
  });

  return { character: result.data, ...result };
};
