import { auth0 } from "../../../lib/server/auth0";

export default auth0.requireAuthentication(async (req, res) => {
  const id = req.query.id;

  if (typeof id !== "string") {
    res.status(404).end();
    return;
  }

  try {
    await fetch(`https://website-admin.microcms.io/api/v1/articles/${id}`, {
      method: "DELETE",
      headers: { "X-WRITE-API-KEY": process.env.X_WRITE_API_KEY || "" },
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }

  res.status(200).end();
});
