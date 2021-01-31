import { NextApiHandler } from "next";
import { fetchArticles } from "../../lib/server/fetchArticles";
import { ArticleOrders } from "../../types/article";

const articles: NextApiHandler = async (req, res) => {
  const {
    query: { orders },
    method,
  } = req;

  // string[]
  if (typeof orders === "object") {
    res.status(404).end();
    return;
  }

  if (method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end();
    return;
  }

  const articles = await fetchArticles(orders as ArticleOrders);

  res.json(articles);
};
export default articles;
