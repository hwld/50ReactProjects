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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let characters: any[] = await res.json();
  characters = characters.map((c) => ({ ...c, id: c.id.toString() }));

  return characters;
}

export async function fetchCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

  if (!res.ok) {
    throw new Error();
  }
  let character = await res.json();
  character = { ...character, id: character.id.toString() };
  return character;
}
