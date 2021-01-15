import { Article } from "../../types/article";


export const fetchArticle = async (id: string): Promise<Article | null> => {
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

  if (data) {
    const article: Article = {
      id: data.id,
      title: data.title,
      text: data.text,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      publishedAt: data.publishedAt,
      revisedAt: data.revisedAt,
    };

    return article;
  } else {
    return null;
  }
};
