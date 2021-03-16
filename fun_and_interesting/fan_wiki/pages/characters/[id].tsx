import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { Image, Text } from "@chakra-ui/react";
import { Character, fetchCharacter } from "../../fetch";

type Props = {
  character: Character;
};

const CharacterPage: NextPage<Props> = ({ character }) => {
  return (
    <div>
      <Image src={character.image} boxSize="300px" />
      <Text>{character.name}</Text>
      <Text>{character.status}</Text>
      <Text>{character.species}</Text>
      <Text>{character.gender}</Text>
    </div>
  );
};

export default CharacterPage;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  // ファイル名を[...id].tsxのようにしなければidに配列が入ることはない
  const id = params.id as string;

  let character: Character;
  try {
    character = await fetchCharacter(id);
  } catch (error) {
    return { notFound: true };
  }
  return { props: { character } };
};
