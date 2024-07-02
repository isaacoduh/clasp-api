import { AppDataSource } from "./../database/data-source";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config({});
import { Stripe } from "stripe";
import { Account } from "../database/entities/Account";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET as string;
const createPaymentIntent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { amount, account_number } = req.body;
  console.log(amount);
  const userId = req.currentUser?.id;

  if (!amount || parseFloat(amount) < 0) {
    return res.status(400).json({ message: "Invalid Amount" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "gbp",
      description: `Fund account for user with ID:  ${userId}`,
      payment_method_types: ["card"],
      metadata: {
        account_number,
        userId,
      },
    });

    return res.status(200).json({
      message: "Intent created!",
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleWebhook = async (req: Request, res: Response) => {
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    event = Stripe.webhooks.constructEvent(
      req.body,
      sig as string,
      endpointSecret
    );
  } catch (error: any) {
    console.log(error);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const account_number = paymentIntent.metadata.account_number;

      console.log(account_number);

      const accountRepository = AppDataSource.getRepository(Account);
      const account = await accountRepository.findOneBy({ account_number });
      if (account) {
        account.account_balance =
          parseFloat(account.account_balance.toString()) +
          paymentIntent.amount_received / 100;
        await accountRepository.save(account);
      }
      break;
    default:
      //   console.warn(`Unhandled event type ${event.type}`);
      break;
  }

  res.status(200).send();
};

export { createPaymentIntent, handleWebhook };
