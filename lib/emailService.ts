import emailjs from "@emailjs/browser";

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
