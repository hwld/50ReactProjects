export type Character = {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
};

export async function fetchCharacters(
  ids: string[] = [...Array(10)].map((_, index) => (index + 1).toString())
): Promise<Character[]> {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${[...ids]}`
  );

  if (!res.ok) {
    throw new Error();
  }
  return await res.json();
}

export async function fetchCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

  if (!res.ok) {
    throw new Error();
  }
  return await res.json();
}
