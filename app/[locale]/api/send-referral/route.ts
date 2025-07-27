// app/api/send-referral/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email, referralCode } = await req.json();

  if (!email || !referralCode) {
    return NextResponse.json(
      { error: "Missing email or referral code" },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // your app password from Google
    },
  });

  const mailOptions = {
    from: `"Elodia Beauty & Spa" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome! Here's your referral code 🎉",
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>🎉 Welcome to Elodia Beauty & Spa!</h2>
        <p>Thank you for signing up. Here's your referral code:</p>
        <div style="font-size: 20px; font-weight: bold; margin: 10px 0;">
          ${referralCode}
        </div>
        <p>Share this code with your friends to earn rewards!</p>
        <p>Best regards,<br/>The Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Referral email sent" });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
