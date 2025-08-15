import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const payload = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata; // store bookingFormData here in create-checkout-session

    try {
      await addDoc(collection(db, "bookings"), {
        name: metadata?.name,
        email: metadata?.email,
        service: metadata?.service,
        price: metadata?.price,
        date: metadata?.date,
        time: metadata?.time,
        message: metadata?.message,
        status: "paid",
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  }

  return NextResponse.json({ received: true });
}
