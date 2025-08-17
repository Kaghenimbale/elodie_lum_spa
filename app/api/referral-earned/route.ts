// app/api/referral-earned/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { to, newUserEmail, earnedPoints, totalPoints } = await req.json();

    if (!to || !newUserEmail || earnedPoints == null || totalPoints == null) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Set up transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Elodia Beauty & Spa" <${process.env.EMAIL_USER}>`,
      to,
      subject: `✨ You've Earned ${earnedPoints} Point${
        earnedPoints > 1 ? "s" : ""
      } – Thanks for Referring!`,
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fff8f4; padding: 40px 20px; color: #333;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <h1 style="color: #d16b86; text-align: center;">🎉 You’ve Earned Points!</h1>
        <p style="font-size: 16px; line-height: 1.6; text-align: center;">
          Thank you for spreading the love 💖
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
          A new user just signed up using your referral code:
          <strong style="color: #d16b86;">${newUserEmail}</strong>
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
          You've earned <strong>${earnedPoints} referral point${
            earnedPoints > 1 ? "s" : ""
          }</strong>! 🎁
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
          Your total balance is now: <strong>${totalPoints} points</strong>.
        </p>
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://elodiabspa.com/userProfile" style="background-color: #d16b86; color: #fff; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold;">
            Share More – Earn More
          </a>
        </div>
        <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #999; text-align: center;">
          You’re receiving this email because you are a member of Elodia Beauty & Spa’s referral program.<br />
          If you believe this was a mistake, please contact us.
        </p>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent" });
  } catch (err: any) {
    console.error("Error sending referral email:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
