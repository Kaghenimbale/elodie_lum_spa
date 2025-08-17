import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, service, price, date, time, message, referredBy } =
      body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      customer_email: email,
      client_reference_id: email,
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: service,
            },
            unit_amount: Math.round(Number(price) * 100), // convert to cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        name,
        email,
        service,
        price: price.toString(),
        date,
        time,
        message,
        referredBy: referredBy || "", // ✅ include referral code if present
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error("Error creating session:", err.message);
    return NextResponse.json(
      { error: "Stripe session creation failed." },
      { status: 500 }
    );
  }
}
