import { ArticleBase } from "../../types/article";

export const patchArticle = async (
  id: string,
  data: ArticleBase
): Promise<void> => {
  const article: ArticleBase = {
    title: data.title,
    text: data.text,
  };
  await fetch("/api/articles/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, article }),
  });
};
