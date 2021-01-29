import { auth0 } from "../../../lib/server/auth0";
import { ArticleBase } from "../../../types/article";

export default auth0.requireAuthentication(async (req, res) => {
  const articleData: ArticleBase = {
    title: req.body.article.title,
    text: req.body.article.text,
  };

  try {
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
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }

  res.status(200).end();
});