import { Game } from "../pages";

export const fetchGame = async (id: string): Promise<Game> => {
  const res = await fetch(
    `https://ecommerce-store.microcms.io/api/v1/games/${id}`,
    { headers: { "X-API-KEY": process.env.API_KEY || "" } }
  );
  const data = await res.json();
  const game: Game = {
    id: data.id,
    name: data.name,
    price: data.price,
    aboutThisGame: data.aboutThisGame,
    moreDetails: data.moreDetails,
  };

  return game;
};
