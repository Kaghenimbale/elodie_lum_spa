// app/api/referral-earned/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { to, newUserEmail } = await req.json();

    if (!to || !newUserEmail) {
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
      from: `"Referral Program" <${process.env.EMAIL_USER}>`,
      to,
      subject: "🎉 You earned 1 point!",
      html: `
        <div style="font-family:sans-serif;">
          <h2>🎉 You earned a referral point!</h2>
          <p>Someone just signed up using your referral code: <strong>${newUserEmail}</strong>.</p>
          <p>Keep sharing your code to unlock more rewards.</p>
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
