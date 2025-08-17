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
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_email;

    if (!customerEmail) {
      console.warn(
        "Session has no customer email, skipping referral processing."
      );
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const amountPaid = session.amount_total
      ? Number(session.amount_total) / 100
      : 0;

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", customerEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const payingUserDoc = querySnapshot.docs[0];
        const payingUserRef = doc(db, "users", payingUserDoc.id);
        const payingUser = payingUserDoc.data();

        if (payingUser.referredBy) {
          const referrerQuery = query(
            usersRef,
            where("referralCode", "==", payingUser.referredBy)
          );
          const referrerSnapshot = await getDocs(referrerQuery);

          if (!referrerSnapshot.empty) {
            const referrerDoc = referrerSnapshot.docs[0];
            const referrerRef = doc(db, "users", referrerDoc.id);
            const referrerData = referrerDoc.data();

            // Check how many times points were already awarded
            const referralCount = payingUser.referralPaymentsCount || 0;

            if (referralCount < 2) {
              const pointsEarned = Math.round(amountPaid * 0.05 * 10);

              // Update referrer points
              await updateDoc(referrerRef, {
                points: increment(pointsEarned),
              });

              // Increment the referred user's payment count
              await updateDoc(payingUserRef, {
                referralPaymentsCount: increment(1),
              });

              const totalPoints = (referrerData.points || 0) + pointsEarned;

              console.log(
                `Referral success: ${referrerData.email} earned ${pointsEarned} points. Total: ${totalPoints}`
              );

              await sendReferralEmail(
                referrerData.email,
                customerEmail,
                pointsEarned,
                totalPoints
              );
            } else {
              console.log("Referral points limit reached for this user.");
            }
          }
        }
      }
    } catch (error) {
      console.error("Error handling referral points:", error);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

async function sendReferralEmail(
  to: string,
  newUserEmail: string,
  pointsEarned: number,
  totalPoints: number
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Elodia Beauty & Spa" <${process.env.EMAIL_USER}>`,
    to,
    subject: `✨ You've Earned ${pointsEarned} Point(s) – Thanks for Referring!`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h1 style="color: #d16b86; text-align:center;">🎉 You’ve Earned Points!</h1>
        <p>A new user just booked using your referral code: <strong>${newUserEmail}</strong></p>
        <p>You earned <strong>${pointsEarned} point(s)</strong>! Your total points are now <strong>${totalPoints}</strong>.</p>
        <p>Keep sharing your code and enjoy exclusive rewards at Elodia Beauty & Spa!</p>
        <div style="text-align:center; margin-top:20px;">
          <a href="https://elodiabspa.com/userProfile" style="background-color:#d16b86; color:#fff; padding:10px 20px; border-radius:5px; text-decoration:none;">Share More – Earn More</a>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
