import { Article } from "../../types/article";

export const updateArticle = async (
  data: Pick<Article, "id" | "title" | "text">
): Promise<void> => {
  const article: Omit<typeof data, "id"> = {
    title: data.title,
    text: data.text,
  };
  await fetch("/api/articles/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: data.id, article }),
  });
};
