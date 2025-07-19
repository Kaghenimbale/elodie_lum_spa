import emailjs from "@emailjs/browser";
// lib/emailService.ts
import nodemailer from "nodemailer";

export async function sendReferralEmail(toEmail: string, referralCode: string) {
  const templateParams = {
    to_email: toEmail,
    referral_code: referralCode,
  };

  try {
    await emailjs.send(
      "service_ebs", // Replace with actual ID
      "template_edhodvr", // Replace with actual ID
      templateParams,
      "Az9VoMQDImpLh7HsQ" // Replace with your public key
    );
    console.log("Referral email sent!");
  } catch (error) {
    console.error("Failed to send referral email:", error);
  }
}

export async function sendReferralEarnedEmail(referrerEmail: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const mailOptions = {
    from: `"Referral App" <${process.env.EMAIL_USER}>`,
    to: referrerEmail,
    subject: "🎉 You've earned 1 point!",
    html: `<p>Congratulations! Someone signed up using your referral code. You just earned 1 point 🎁</p>`,
  };

  await transporter.sendMail(mailOptions);
}
