import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { adminAuth } from "@/firebase/admin";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email)
      return NextResponse.json({ error: "Email is required" }, { status: 400 });

    console.log("Sending reset email to:", email);

    const resetLink = await adminAuth.generatePasswordResetLink(email, {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`, // must be a valid full URL
      handleCodeInApp: true,
    });

    await resend.emails.send({
      from: "no-reply@yourdomain.com",
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click the link to reset your password:</p>
             <p><a href="${resetLink}">Reset Password</a></p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Reset email error full:", err);
    return NextResponse.json(
      { error: err.message || "Failed to send reset email" },
      { status: 500 }
    );
  }
}
