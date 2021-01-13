import { auth0 } from "../../../lib/auth0";

export type Article = { title: string; text: string };

export default auth0.requireAuthentication(async (req, res) => {
  const article: Article = { title: req.body.title, text: req.body.text };

  try {
    await fetch("https://website-admin.microcms.io/api/v1/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WRITE-API-KEY": process.env.X_WRITE_API_KEY || "",
      },
      body: JSON.stringify(article),
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }

  res.status(200).end();
});
