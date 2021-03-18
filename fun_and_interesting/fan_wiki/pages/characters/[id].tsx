import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Image, Text } from "@chakra-ui/react";
import { Character, fetchCharacter } from "../../fetch";
import { useCharacters } from "../../context/CharactersContext";
import { useRouter } from "next/router";

type Props = {
  character: Character;
};

const CharacterPage: NextPage<Props> = ({}) => {
  const characters = useCharacters();
  const router = useRouter();
  const { id } = router.query;

  const [character, setCharacter] = useState<Character | undefined>(
    characters.find((c) => c.id === id)
  );

  useEffect(() => {
    async function fetch() {
      if (typeof id !== "string") {
        return;
      }
      const c = await fetchCharacter(id);
      setCharacter(c);
    }

    if (!character) {
      fetch();
    }
  }, [character, id]);

  return (
    <div>
      {character && (
        <>
          <Image src={character.image} boxSize="300px" />
          <Text>{character.name}</Text>
          <Text>{character.status}</Text>
          <Text>{character.species}</Text>
          <Text>{character.gender}</Text>
        </>
      )}
    </div>
  );
};

export default CharacterPage;
