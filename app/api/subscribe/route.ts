// app/api/subscribe/route.ts

import { NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  try {
    // 1. Save to Firestore
    await addDoc(collection(db, "subscribers"), {
      email,
      subscribedAt: Timestamp.now(),
    });

    // 2. Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // app password (not your real password)
      },
    });

    const mailOptions = {
      from: `"Elodia Beauty & Spa" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✨ You're subscribed to Elodia Beauty & Spa!",
      html: `
    <div style="background-color: #fdfaf6; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden;">
        <div style="background-color: #034d57; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Welcome to Elodia Beauty & Spa 💆‍♀️</h1>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; line-height: 1.6;">Hi there,</p>
          <p style="font-size: 16px; line-height: 1.6;">
            We're thrilled to have you join our community of beauty and wellness lovers!
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            You'll now receive exclusive promotions, spa tips, and updates straight to your inbox.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            If you have any questions or want to book an appointment, feel free to reach out to us anytime.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://elodiabspa.com" target="_blank" style="display: inline-block; background-color: #035c68; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 16px;">
              Visit Our Website
            </a>
          </div>
          <p style="font-size: 14px; color: #777;">
            Elodia Beauty & Spa · Avenue Wellness, Kinshasa · RDC
          </p>
        </div>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Subscribed and confirmation sent." });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong while subscribing." },
      { status: 500 }
    );
  }
}
