import { Article } from "../../pages/api/articles/create";

export const fetchArticle = async (id: string): Promise<Article> => {
  if (typeof window !== "undefined") {
    throw new Error("fetchArticle: クライアント側からは使用できません");
  }

  const res = await fetch(
    `https://website-admin.microcms.io/api/v1/articles/${id}`,
    {
      headers: { "X-API-KEY": process.env.X_API_KEY || "" },
    }
  );
  const data = await res.json();

  const article: Article = {
    title: data.title,
    text: data.text,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };

  return article;
};
