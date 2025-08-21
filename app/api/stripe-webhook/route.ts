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
import { createEvent } from "ics";

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

  const bookingData = {
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
  };

  // -------------------- Save booking to Firestore --------------------
  try {
    await addDoc(collection(db, "bookings"), bookingData);
    console.log(`💾 Booking saved for ${customerEmail}`);
  } catch (err) {
    console.error("🔥 Error saving booking to Firestore:", err);
  }

  // -------------------- Create Calendar Event (.ics) --------------------
  let calendarEventContent: string | undefined = undefined;
  try {
    if (bookingData.date && bookingData.time) {
      const [year, month, day] = bookingData.date.split("-").map(Number);
      const [hour, minute] = bookingData.time.split(":").map(Number);

      const calendarEvent = await new Promise<{
        success: boolean;
        value?: string;
        error?: any;
      }>((resolve) => {
        createEvent(
          {
            title: `Booking - ${bookingData.service}`,
            description: bookingData.message || "No additional notes.",
            start: [year, month, day, hour, minute],
            duration: { hours: 1 },
            status: "CONFIRMED",
            organizer: { name: bookingData.name, email: bookingData.email },
            attendees: [{ name: bookingData.name, email: bookingData.email }],
          },
          (error, value) => {
            if (error) resolve({ success: false, error });
            else resolve({ success: true, value });
          }
        );
      });

      if (calendarEvent.success) calendarEventContent = calendarEvent.value;
      else console.error("❌ Calendar generation failed:", calendarEvent.error);
    }
  } catch (err) {
    console.error("🔥 Calendar generation error:", err);
  }

  // -------------------- Send Customer Email with .ics --------------------
  try {
    await resend.emails.send({
      from: "Elodia Beauty & Spa <onboarding@resend.dev>",
      to: customerEmail,
      subject: "💆 Booking Confirmation – Elodia Beauty & Spa",
      html: `
        <h2>Thank you for your booking!</h2>
        <p>Your booking is confirmed for:</p>
        <ul>
          <li><b>Service:</b> ${bookingData.service}</li>
          <li><b>Date:</b> ${bookingData.date || "TBD"}</li>
          <li><b>Time:</b> ${bookingData.time || "TBD"}</li>
          <li><b>Amount Paid:</b> $${amountPaid}</li>
        </ul>
        <p>We look forward to welcoming you at Elodia Beauty & Spa ✨</p>
      `,
      attachments: calendarEventContent
        ? [
            {
              filename: `booking-${bookingData.service}-${bookingData.date}.ics`,
              content: calendarEventContent,
            },
          ]
        : [],
    });
    console.log(`✅ Customer email sent with calendar to ${customerEmail}`);
  } catch (err) {
    console.error(`❌ Failed to send customer email:`, err);
  }

  // -------------------- Admin Email with .ics --------------------
  try {
    await resend.emails.send({
      from: "Elodia Beauty & Spa <onboarding@resend.dev>",
      to: process.env.NEXT_PUBLIC_ADMIN_EMAIL!,
      subject: "📩 New Booking Received",
      html: `
        <h2>New Booking Alert</h2>
        <p><b>${customerEmail}</b> has booked a service.</p>
        <ul>
          <li><b>Service:</b> ${bookingData.service}</li>
          <li><b>Date:</b> ${bookingData.date || "TBD"}</li>
          <li><b>Time:</b> ${bookingData.time || "TBD"}</li>
          <li><b>Amount Paid:</b> $${amountPaid}</li>
        </ul>
      `,
      attachments: calendarEventContent
        ? [
            {
              filename: `booking-${bookingData.service}-${bookingData.date}.ics`,
              content: calendarEventContent,
            },
          ]
        : [],
    });
    console.log(`✅ Admin email sent with calendar`);
  } catch (err) {
    console.error("❌ Failed to send admin email:", err);
  }

  // -------------------- Reward Paying User (optional) --------------------
  try {
    const usersRef = collection(db, "users");
    const userQuery = query(usersRef, where("email", "==", customerEmail));
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) return NextResponse.json({ received: true });

    const payingUserDoc = userSnapshot.docs[0];
    const payingUserRef = doc(db, "users", payingUserDoc.id);
    const payingUser = payingUserDoc.data();

    if (!payingUser.referredBy) return NextResponse.json({ received: true });

    const referralCount = payingUser.referralPaymentsCount || 0;
    if (referralCount >= 2) return NextResponse.json({ received: true });

    const processedBookings = payingUser.processedBookings || [];
    if (processedBookings.includes(session.id))
      return NextResponse.json({ received: true });

    const pointsEarned = Math.round(amountPaid * 0.05 * 10);

    await updateDoc(payingUserRef, {
      points: increment(pointsEarned),
      referralPaymentsCount: increment(1),
      processedBookings: [...processedBookings, session.id],
    });

    const totalPoints = (payingUser.points || 0) + pointsEarned;

    await resend.emails.send({
      from: "Elodia Beauty & Spa <onboarding@resend.dev>",
      to: payingUser.email,
      subject: `✨ You've Earned ${pointsEarned} Point(s)!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px; background-color: #fafafa;">
          <h2 style="color: #333; text-align: center;">🎉 Congratulations!</h2>
          <p>Hello <b>${payingUser.name || "Valued Guest"}</b>,</p>
          <p>You have earned <b style="color:#008080;">${pointsEarned} point(s)</b> for your booking. Total: <b style="color:#008080;">${totalPoints} point(s)</b>.</p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="https://elodiabspa.com/userProfile" style="background-color: #008080; color: #fff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">View My Rewards</a>
          </div>
        </div>
      `,
      attachments: calendarEventContent
        ? [
            {
              filename: `booking-${bookingData.service}-${bookingData.date}.ics`,
              content: calendarEventContent,
            },
          ]
        : [],
    });
  } catch (err) {
    console.error("🔥 Error handling rewards:", err);
  }

  return NextResponse.json({ received: true });
}
