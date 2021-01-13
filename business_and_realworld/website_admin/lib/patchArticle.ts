import { Article } from "../pages/api/articles/create";

export const patchArticle = async (
  id: string,
  data: Article
): Promise<void> => {
  const article: Article = { title: data.title, text: data.text };
  fetch("/api/articles/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, article }),
  });
};
