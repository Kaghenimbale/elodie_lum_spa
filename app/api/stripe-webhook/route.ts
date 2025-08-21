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

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const customerEmail =
    session.customer_details?.email || session.customer_email;

  if (!customerEmail) return NextResponse.json({ received: true });

  const amountPaid = session.amount_total
    ? Number(session.amount_total) / 100
    : 0;

  // -------------------- Firestore Booking --------------------
  try {
    await addDoc(collection(db, "bookings"), {
      name:
        session.metadata?.name || session.customer_details?.name || "Anonymous",
      email: customerEmail,
      price: amountPaid.toString(),
      service: session.metadata?.service || "Unknown Service",
      date: session.metadata?.date || null,
      time: session.metadata?.time || null,
      message: session.metadata?.message || null,
      createdAt: new Date(),
      status: "paid",
      sessionId: session.id,
    });
    console.log(`💾 Booking saved for ${customerEmail}`);
  } catch (err) {
    console.error("🔥 Error saving booking to Firestore:", err);
  }

  // -------------------- Customer Email --------------------
  try {
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
    console.log(`✅ Customer email sent to ${customerEmail}`);
  } catch (err) {
    console.error(`❌ Failed to send customer email to ${customerEmail}:`, err);
  }

  // -------------------- Admin Email --------------------
  try {
    await resend.emails.send({
      from: "Elodia Beauty & Spa <onboarding@resend.dev>",
      to: process.env.NEXT_PUBLIC_ADMIN_EMAIL!,
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
    console.log(
      `✅ Admin email sent to ${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`
    );
  } catch (err) {
    console.error(
      `❌ Failed to send admin email to ${process.env.NEXT_PUBLIC_ADMIN_EMAIL}:`,
      err
    );
  }

  // -------------------- Referral Logic --------------------
  try {
    const usersRef = collection(db, "users");
    const userQuery = query(usersRef, where("email", "==", customerEmail));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) return NextResponse.json({ received: true });

    const payingUserDoc = userSnapshot.docs[0];
    const payingUserRef = doc(db, "users", payingUserDoc.id);
    const payingUser = payingUserDoc.data();

    // Increment referralPaymentsCount for the paying user
    await updateDoc(payingUserRef, {
      referralPaymentsCount: increment(1),
    });
    console.log(`🔄 Updated referralPaymentsCount for ${customerEmail}`);

    // Only proceed if this user was referred by someone
    if (!payingUser.referredBy) return NextResponse.json({ received: true });

    const referrerQuery = query(
      usersRef,
      where("referralCode", "==", payingUser.referredBy)
    );
    const referrerSnapshot = await getDocs(referrerQuery);

    if (referrerSnapshot.empty) return NextResponse.json({ received: true });

    const referrerDoc = referrerSnapshot.docs[0];
    const referrerRef = doc(db, "users", referrerDoc.id);
    const referrerData = referrerDoc.data();

    const referralCount = referrerData.referralPaymentsCount || 0;
    if (referralCount >= 2) return NextResponse.json({ received: true });

    const pointsEarned = Math.round(amountPaid * 0.05 * 10);

    await updateDoc(referrerRef, {
      points: increment(pointsEarned),
    });

    const totalPoints = (referrerData.points || 0) + pointsEarned;
    console.log(
      `🎯 ${referrerData.email} earned ${pointsEarned} points. Total: ${totalPoints}`
    );

    // Send referral reward email
    try {
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
              <a href="https://elodiabspa.com/userProfile" 
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
      console.log(`✅ Referral email sent to ${referrerData.email}`);
    } catch (err) {
      console.error(`❌ Failed to send referral email:`, err);
    }
  } catch (err) {
    console.error("🔥 Error handling referral logic:", err);
  }

  return NextResponse.json({ received: true });
}
