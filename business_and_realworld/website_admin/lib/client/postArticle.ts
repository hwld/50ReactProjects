import { Article } from "../../types/article";

export const postArticle = async (
  data: Pick<Article, "title" | "text">
): Promise<void> => {
  const article: typeof data = {
    title: data.title,
    text: data.text,
  };
  await fetch("/api/articles/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });
};
