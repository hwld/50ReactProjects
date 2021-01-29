import { NextApiHandler } from "next";
import { fetchArticle } from "../../../lib/server/fetchArticle";

const article: NextApiHandler = async (req, res) => {
  const {
    query: { articleId },
  } = req;

  if (typeof articleId !== "string") {
    res.status(404).end();
    return;
  }

  const article = await fetchArticle(articleId);

  if (!article) {
    res.status(404).end();
    return;
  }

  res.json(article);
};
export default article;
