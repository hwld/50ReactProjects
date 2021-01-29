import { NextApiHandler } from "next";
import { fetchArticles } from "../../lib/server/fetchArticles";

const articles: NextApiHandler = async (req, res) => {
  const { orders } = req.query;

  console.log(orders);

  // string[]
  if (typeof orders === "object") {
    res.status(404).end();
    return;
  }

  const articles = await fetchArticles(orders);

  res.json(articles);
};
export default articles;
