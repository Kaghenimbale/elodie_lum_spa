// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "cad",
          product_data: {
            name: "Elodia Spa Booking",
          },
          unit_amount: 5000, // = $50.00
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000//success",
    cancel_url: "http://localhost:3000//cancel",
  });

  return NextResponse.json({ url: session.url });
}
