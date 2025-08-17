import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
} from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    const body = await req.text(); // webhook must use raw body
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};
    const price = Number(metadata.price || 0);
    const referredBy = metadata.referredBy || "";

    if (referredBy) {
      try {
        // find referrer by referralCode
        const q = query(
          collection(db, "users"),
          where("referralCode", "==", referredBy)
        );
        const snap = await getDocs(q);

        if (!snap.empty) {
          const referrerDoc = snap.docs[0].ref;
          const rewardPoints = Math.floor(price * 0.05 * 10);

          await updateDoc(referrerDoc, {
            points: increment(rewardPoints),
          });

          console.log("✅ Referrer rewarded with", rewardPoints, "points");
        }
      } catch (err) {
        console.error("Error rewarding referrer after payment:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
