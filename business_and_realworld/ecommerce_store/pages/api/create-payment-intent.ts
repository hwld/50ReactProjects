import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2020-08-27",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "jpy",
    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({ clientSecret: paymentIntent.client_secret });
};
