import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    // In a real app, you would query your database for the user's subscription
    // For demo purposes, we'll check Stripe subscriptions
    // This is a simplified version - in production, store subscription data in your DB

    const subscriptions = await stripe.subscriptions.list({
      limit: 1,
      status: "active",
    });

    // Check if user has an active subscription
    // In production, you'd match by customer ID stored in your database
    const hasActiveSubscription = subscriptions.data.length > 0;

    return res.status(200).json({
      isPremium: hasActiveSubscription,
      subscriptionStatus: hasActiveSubscription ? "active" : "none",
    });
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
