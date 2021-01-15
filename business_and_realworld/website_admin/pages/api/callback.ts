import { NextApiHandler } from "next";
import { auth0 } from "../../lib/server/auth0";

const callback: NextApiHandler = async (req, res) => {
  try {
    await auth0.handleCallback(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
};
export default callback;
