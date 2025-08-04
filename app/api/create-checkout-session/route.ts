import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, service, price, date, time, message } = body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking-success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: service,
            },
            unit_amount: Number(price) * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        name,
        email,
        service,
        price,
        date,
        time,
        message,
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
