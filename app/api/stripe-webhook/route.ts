import Stripe from "stripe";
import { db } from "@/firebase/config";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);

export const config = { api: { bodyParser: false } };

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const metadata = session.metadata || {};
      const referrerId = metadata.referrerId || null;
      const price = Number(metadata.price || 0);

      if (referrerId && price > 0) {
        // Update referrer's earnings
        await updateDoc(doc(db, "users", referrerId), {
          earnings: increment(price * 0.1),
        });

        // Send email to referrer
        const referrerSnap = await getDoc(doc(db, "users", referrerId));
        const referrerEmail = referrerSnap.data()?.email;

        if (referrerEmail) {
          await resend.emails.send({
            from: "Your Spa <noreply@yourspa.com>",
            to: referrerEmail,
            subject: "Referral Bonus Earned!",
            html: `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    <h2 style="color: #164E63; text-align: center;">Congratulations!</h2>
    <p>Dear ${referrerSnap.data()?.name || "Valued Customer"},</p>
    <p>We are excited to let you know that one of your referrals has successfully booked a service at <strong>Your Spa</strong>.</p>
    <p style="font-size: 16px; margin: 10px 0;">
      <strong>Referral Bonus:</strong> $${(price * 0.1).toFixed(2)} CAD
    </p>
    <p>Your referral rewards are now updated in your account. Thank you for sharing our spa services with your friends!</p>
    <p style="text-align: center; margin-top: 30px;">
      <a href="https://elodiabspa.com" style="background-color: #164E63; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 4px; display: inline-block;">View Your Account</a>
    </p>
    <hr style="margin: 30px 0; border-color: #e0e0e0;" />
    <p style="font-size: 12px; color: #888; text-align: center;">You received this email because you are a valued member of Your Spa. If you have any questions, please contact support@yourspa.com.</p>
  </div>
  `,
          });
        }
      }
    }

    return new Response(null, { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Webhook Error", { status: 400 });
  }
}
