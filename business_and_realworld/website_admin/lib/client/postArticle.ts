import { Article } from "../../pages/api/articles/create";

export const postArticle = async (data: Article): Promise<void> => {
  const article: Article = {
    title: data.title,
    text: data.text,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
  await fetch("/api/articles/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });
};
