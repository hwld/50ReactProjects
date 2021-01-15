import { Article } from "../../pages/api/articles/create";

export const fetchArticles = async (): Promise<
  (Article & { id: string })[]
> => {
  if (typeof window !== "undefined") {
    throw new Error("fetchArticles: クライアント側からは使用できません");
  }

  const res = await fetch("https://website-admin.microcms.io/api/v1/articles", {
    headers: { "X-API-KEY": process.env.X_API_KEY || "" },
  });
  const data = (await res.json()).contents;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const articles: (Article & { id: string })[] = data.map((d: any) => ({
    id: d.id,
    title: d.title,
    text: d.text,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  }));

  return articles;
};
