export type Character = {
  id: string;
  image: string;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
};

export async function fetchCharacters(
  ids: string[] = [...Array(10)].map((_, index) => (index + 1).toString())
): Promise<Character[] | undefined> {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${[...ids]}`
  );

  if (!res.ok) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let characters: any[] = await res.json();
  characters = characters.map((c) => ({ ...c, id: c.id.toString() }));

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
