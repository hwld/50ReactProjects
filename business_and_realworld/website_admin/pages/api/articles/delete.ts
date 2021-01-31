import { auth0 } from "../../../lib/server/auth0";

export default auth0.requireAuthentication(async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  if (typeof id !== "string") {
    res.status(404).end();
    return;
  }

  if (method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end();
    return;
  }

  await fetch(`https://website-admin.microcms.io/api/v1/articles/${id}`, {
    method: "DELETE",
    headers: { "X-WRITE-API-KEY": process.env.X_WRITE_API_KEY || "" },
  });

  res.status(200).end();
});
