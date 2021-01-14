import { auth0 } from "../../../lib/auth0";
import { Article } from "./create";

export default auth0.requireAuthentication(async (req, res) => {
  const articleData: Article = {
    title: req.body.article.title,
    text: req.body.article.text,
    createdAt: req.body.article.createdAt,
    updatedAt: req.body.article.updatedAt,
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
