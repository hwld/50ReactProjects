import { Game } from "../pages";

export const fetchAllGames = async (): Promise<Game[]> => {
  const res = await fetch("https://ecommerce-store.microcms.io/api/v1/games", {
    headers: { "X-API-KEY": process.env.API_KEY || "" },
  });
  const data = (await res.json()).contents;
  const games = data.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (c: any): Game => ({
      id: c.id,
      name: c.name,
      price: c.price,
      aboutThisGame: c.aboutThisGame,
      moreDetails: c.moreDetails,
    })
  );

  return games;
};
