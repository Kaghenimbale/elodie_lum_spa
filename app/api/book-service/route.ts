// app/api/book-service/route.ts

import { Resend } from "resend";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config";

// ✅ Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // console.log("📨 Received booking:", data);

    const { name, email, service, date, message } = data;

    // Validate required fields
    if (!name || !email || !service || !date) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save booking to Firestore
    const docRef = await addDoc(collection(db, "bookings"), {
      name,
      email,
      service,
      date,
      message: message || null,
      createdAt: Timestamp.now(),
    });

    // Send notification email
    const response = await resend.emails.send({
      from: "Elodia Beauty & Spa <onboarding@resend.dev>",
      to: "kaghenimbale@gmail.com",
      subject: `🧖‍♀️ New Booking from ${name}`,
      html: `
        <div style="
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333333; 
          background-color: #f9f9f9; 
          padding: 20px; 
          border-radius: 8px;
          max-width: 600px;
          margin: auto;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        ">
          <h2 style="color: #2c7a7b; border-bottom: 2px solid #2c7a7b; padding-bottom: 8px;">
            New Booking Request
          </h2>
          <p style="font-size: 16px;">
            You have received a new booking request with the following details:
          </p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr><td style="padding: 8px; font-weight: bold; width: 120px; background-color: #e6fffa;">Name:</td><td style="padding: 8px; background-color: #f0fdfa;">${name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; background-color: #e6fffa;">Email:</td><td style="padding: 8px; background-color: #f0fdfa;">${email}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; background-color: #e6fffa;">Service:</td><td style="padding: 8px; background-color: #f0fdfa;">${service}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; background-color: #e6fffa;">Date:</td><td style="padding: 8px; background-color: #f0fdfa;">${date}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; background-color: #e6fffa; vertical-align: top;">Message:</td><td style="padding: 8px; background-color: #f0fdfa;">${message ? message.replace(/\n/g, "<br>") : "N/A"}</td></tr>
          </table>
          <p style="font-size: 14px; color: #666; margin-top: 20px;">
            This message was sent from Elodia Beauty & Spa booking system.
          </p>
        </div>
      `,
    });

    return Response.json({
      success: true,
      message: "Booking saved and email sent!",
      bookingId: docRef.id,
      emailResponse: response,
    });
  } catch (error) {
    console.error("❌ Booking error:", error);
    return Response.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
