import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/firebase/config";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  increment,
} from "firebase/firestore";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log("🔔 Stripe event received:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail =
      session.customer_details?.email || session.customer_email;

    if (!customerEmail) return NextResponse.json({ received: true });

    const amountPaid = session.amount_total
      ? Number(session.amount_total) / 100
      : 0;

    try {
      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("email", "==", customerEmail));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) return NextResponse.json({ received: true });

      const payingUserDoc = userSnapshot.docs[0];
      const payingUserRef = doc(db, "users", payingUserDoc.id);
      const payingUser = payingUserDoc.data();

      if (!payingUser.referredBy) return NextResponse.json({ received: true });

      // Find referrer
      const referrerQuery = query(
        usersRef,
        where("referralCode", "==", payingUser.referredBy)
      );
      const referrerSnapshot = await getDocs(referrerQuery);

      if (referrerSnapshot.empty) return NextResponse.json({ received: true });

      const referrerDoc = referrerSnapshot.docs[0];
      const referrerRef = doc(db, "users", referrerDoc.id);
      const referrerData = referrerDoc.data();

      const referralCount = payingUser.referralPaymentsCount || 0;
      if (referralCount >= 2) return NextResponse.json({ received: true });

      // Calculate points
      const pointsEarned = Math.round(amountPaid * 0.05 * 10);

      // Update Firestore
      await updateDoc(referrerRef, { points: increment(pointsEarned) });
      await updateDoc(payingUserRef, { referralPaymentsCount: increment(1) });

      const totalPoints = (referrerData.points || 0) + pointsEarned;
      console.log(
        `🎯 ${referrerData.email} earned ${pointsEarned} points. Total: ${totalPoints}`
      );

      // Send email using Resend
      await resend.emails.send({
        from: "Elodia Beauty & Spa <onboarding@resend.dev>",
        to: referrerData.email,
        subject: `✨ You've Earned ${pointsEarned} Point(s)!`,
        html: `
          <h2>🎉 Congratulations!</h2>
          <p>User <strong>${customerEmail}</strong> booked with your referral.</p>
          <p>You earned <b>${pointsEarned}</b> point(s). Total: <b>${totalPoints}</b>.</p>
        `,
      });

      console.log("📧 Referral email sent to", referrerData.email);
    } catch (err) {
      console.error("🔥 Error handling referral points:", err);
    }
  }

  return NextResponse.json({ received: true });
}
