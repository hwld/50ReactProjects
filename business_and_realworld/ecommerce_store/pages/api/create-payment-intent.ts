import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { fetchGame } from "../../lib/fetchGame";

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2020-08-27",
});

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { itemId } = req.body;

  const game = await fetchGame(itemId);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: game.price,
    currency: "jpy",
    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({ clientSecret: paymentIntent.client_secret });
};
