import { Article, ArticleOrders } from "../../types/article";

export const fetchArticles = async (
  orders: ArticleOrders
): Promise<Article[]> => {
  const res = await fetch(`/api/articles?orders=${orders}`);
  return (await res.json()) as Article[];
};
