import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { uid, email, points, dollars } = await req.json();

    if (!uid || !email || !points || !dollars) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    // Reset points in Firestore (optional)
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { points: 0 });

    // -------- Send email to ADMIN --------
    await resend.emails.send({
      from: "EB & Spa <Rewards@elodiabspa.com>", // must be verified or default
      to: [
        process.env.NEXT_PUBLIC_ADMIN_EMAIL! ||
          process.env.NEXT_PUBLIC_ADMIN_EMAIL2!,
        email,
      ],
      replyTo: email, // customer’s email
      subject: "Reward Claim Notification",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #164E63;">Reward Claim Notification</h2>
          <p>Hello Admin,</p>
          <p>The following user has claimed their reward:</p>

          <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ccc;"><strong>User Email:</strong></td>
              <td style="padding: 8px; border: 1px solid #ccc;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ccc;"><strong>Points Claimed:</strong></td>
              <td style="padding: 8px; border: 1px solid #ccc;">${points}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ccc;"><strong>Dollar Equivalent:</strong></td>
              <td style="padding: 8px; border: 1px solid #ccc;">$${dollars.toFixed(2)}</td>
            </tr>
          </table>

          <p>Please process the reward for the user promptly.</p>

          <p style="margin-top: 20px;">Thank you,<br/>Reward System</p>
        </div>
      `,
    });

    // -------- Send email to CUSTOMER --------
    await resend.emails.send({
      from: "EB & Spa <Rewards@elodiabspa.com>",
      to: email, // ✅ customer's email
      subject: "Your Reward Claim Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #164E63;">Reward Claim Confirmation</h2>
          <p>Hello,</p>
          <p>We have received your reward claim request.</p>

          <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ccc;"><strong>Points Claimed:</strong></td>
              <td style="padding: 8px; border: 1px solid #ccc;">${points}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ccc;"><strong>Dollar Equivalent:</strong></td>
              <td style="padding: 8px; border: 1px solid #ccc;">$${dollars.toFixed(2)}</td>
            </tr>
          </table>

          <p>Our team will process your reward shortly. Thank you for being part of our referral program!</p>

          <p style="margin-top: 20px;">Best regards,<br/>EB & Spa Team</p>
        </div>
      `,
    });

    return NextResponse.json({
      message: "Reward claimed successfully and emails sent",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
