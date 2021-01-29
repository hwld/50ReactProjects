import { Article } from "../../types/article";

export const fetchArticles = async (orders: string): Promise<Article[]> => {
  if (typeof window !== "undefined") {
    throw new Error("fetchArticles: クライアント側からは使用できません");
  }

  const res = await fetch(
    `https://website-admin.microcms.io/api/v1/articles?orders=${orders}&limit=30`,
    {
      headers: { "X-API-KEY": process.env.X_API_KEY || "" },
    }
  );
  const data = (await res.json()).contents;

  const articles: Article[] = data.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (d: any): Article => ({
      id: d.id,
      title: d.title,
      text: d.text,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
      publishedAt: d.publishedAt,
      revisedAt: d.revisedAt,
    })
  );

  return articles;
};
