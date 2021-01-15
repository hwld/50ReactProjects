import { ArticleBase } from "../../types/article";

export const postArticle = async (data: ArticleBase): Promise<void> => {
  const article: ArticleBase = {
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
