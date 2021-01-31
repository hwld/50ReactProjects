import { auth0 } from "../../../lib/server/auth0";
import { Article } from "../../../types/article";

export default auth0.requireAuthentication(async (req, res) => {
  const {
    body: { title, text },
    method,
  } = req;

  const article: Pick<Article, "title" | "text"> = {
    title: title,
    text: text,
  };

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end();
    return;
  }

  await fetch("https://website-admin.microcms.io/api/v1/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-WRITE-API-KEY": process.env.X_WRITE_API_KEY || "",
    },
    body: JSON.stringify(article),
  });

  res.status(200).end();
});
