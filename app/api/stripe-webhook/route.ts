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
  addDoc,
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
      // ✅ Save booking to Firestore
      await addDoc(collection(db, "bookings"), {
        name:
          session.metadata?.name ||
          session.customer_details?.name ||
          "Anonymous",
        email: customerEmail,
        price: session.amount_total
          ? (session.amount_total / 100).toString()
          : "0", // string
        service: session.metadata?.service || "Unknown Service",
        date: session.metadata?.date || null, // string "YYYY-MM-DD"
        time: session.metadata?.time || null, // string "HH:MM"
        message: session.metadata?.message || null,
        createdAt: new Date(), // Firestore timestamp
        status: "paid",
        sessionId: session.id,
      });

      console.log(`💾 Booking saved for ${customerEmail}`);

      // ✅ Send booking confirmation to customer
      await resend.emails.send({
        from: "Elodia Beauty & Spa <onboarding@resend.dev>",
        to: customerEmail,
        subject: "💆 Booking Confirmation – Elodia Beauty & Spa",
        html: `
          <h2>Thank you for your booking!</h2>
          <p>Your booking is confirmed for:</p>
          <ul>
            <li><b>Service:</b> ${session.metadata?.service || "Service"}</li>
            <li><b>Date:</b> ${session.metadata?.date || "TBD"}</li>
            <li><b>Time:</b> ${session.metadata?.time || "TBD"}</li>
            <li><b>Amount Paid:</b> $${amountPaid}</li>
          </ul>
          <p>We look forward to welcoming you at Elodia Beauty & Spa ✨</p>
        `,
      });

      // ✅ Send booking notification to spa admin
      await resend.emails.send({
        from: "Elodia Beauty & Spa <onboarding@resend.dev>",
        to: "spa-admin@elodia.com", // ⬅️ replace with actual spa email
        subject: "📩 New Booking Received",
        html: `
          <h2>New Booking Alert</h2>
          <p><b>${customerEmail}</b> has booked a service.</p>
          <ul>
            <li><b>Service:</b> ${session.metadata?.service || "Service"}</li>
            <li><b>Date:</b> ${session.metadata?.date || "TBD"}</li>
            <li><b>Time:</b> ${session.metadata?.time || "TBD"}</li>
            <li><b>Amount Paid:</b> $${amountPaid}</li>
          </ul>
        `,
      });

      // --- REFERRAL LOGIC ---
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

      // Limit: max 2 referral rewards
      const referralCount = referrerData.referralPaymentsCount || 0;
      if (referralCount >= 2) return NextResponse.json({ received: true });

      // Calculate points
      const pointsEarned = Math.round(amountPaid * 0.05 * 10);

      // Update Firestore
      await updateDoc(referrerRef, {
        points: increment(pointsEarned),
        referralPaymentsCount: increment(1),
      });

      const totalPoints = (referrerData.points || 0) + pointsEarned;
      console.log(
        `🎯 ${referrerData.email} earned ${pointsEarned} points. Total: ${totalPoints}`
      );

      // Send referral reward email
      await resend.emails.send({
        from: "Elodia Beauty & Spa <onboarding@resend.dev>",
        to: referrerData.email,
        subject: `✨ You've Earned ${pointsEarned} Point(s)!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px; background-color: #fafafa;">
            <h2 style="color: #333; text-align: center;">🎉 Congratulations!</h2>
            <p>Hello <b>${referrerData.name || "Valued Guest"}</b>,</p>
            <p>
              Great news! A new customer, <b>${customerEmail}</b>, has just booked a service using your referral code.  
            </p>
            <p>
              As a reward, you’ve earned <b style="color:#008080;">${pointsEarned} point(s)</b>.  
              Your total balance is now: <b style="color:#008080;">${totalPoints} point(s)</b>.
            </p>
            <div style="text-align: center; margin: 25px 0;">
              <a href="https://elodiabspa.com/rewards" 
                style="background-color: #008080; color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                View My Rewards
              </a>
            </div>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p style="font-size: 13px; color: #888; text-align: center;">
              Thank you for sharing Elodia Beauty & Spa with your friends.  
              The more you refer, the more you earn! 💎
            </p>
          </div>
        `,
      });
    } catch (err) {
      console.error("🔥 Error handling webhook:", err);
    }
  }

  return NextResponse.json({ received: true });
}
