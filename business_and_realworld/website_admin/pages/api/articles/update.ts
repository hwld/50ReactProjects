import { auth0 } from "../../../lib/server/auth0";
import { Article } from "../../../types/article";

export default auth0.requireAuthentication(async (req, res) => {
  const articleData: Pick<Article, "title" | "text"> = {
    title: req.body.article.title,
    text: req.body.article.text,
  };

  await fetch(
    `https://website-admin.microcms.io/api/v1/articles/${req.body.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-WRITE-API-KEY": process.env.X_WRITE_API_KEY || "",
      },
      body: JSON.stringify(articleData),
    }
  );

  res.status(200).end();
});
