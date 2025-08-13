import { Resend } from "resend";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import { createEvent } from "ics";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, service, price, date, time, message } = data;

    // Validate required fields
    if (!name || !email || !service || !date || !time) {
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
      price,
      time,
      message: message || null,
      createdAt: Timestamp.now(),
    });

    // Parse date and time into start array
    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = time.split(":").map(Number);

    // Create calendar event
    const calendarEvent = await new Promise<{
      success: boolean;
      value?: string;
      error?: any;
    }>((resolve) => {
      createEvent(
        {
          title: `Booking - ${service}`,
          description: message || "No additional notes.",
          start: [year, month, day, hour, minute],
          duration: { hours: 1 },
          status: "CONFIRMED",
          organizer: { name, email },
          attendees: [{ name, email }],
        },
        (error, value) => {
          if (error) return resolve({ success: false, error });
          resolve({ success: true, value });
        }
      );
    });

    // Check for calendar event error
    if (!calendarEvent.success) {
      console.error("Calendar generation failed:", calendarEvent.error);
    }

    // Send email with optional .ics calendar event attachment
    const response = // Send confirmation email to the user
      await resend.emails.send({
        from: "Elodia Beauty & Spa <onboarding@resend.dev>",
        to: email, // user email
        subject: "📅 Your Booking Confirmation at Elodia Beauty & Spa",
        html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #2c7a7b;">Hi ${name},</h2>
      <p>Thank you for booking with Elodia Beauty & Spa! Here are your appointment details:</p>
      <ul style="line-height: 1.6;">
        <li><strong>Service:</strong> ${service}</li>
        <li><strong>Price:</strong> $${price}.00 CAD</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
      </ul>
      ${
        message
          ? `<p><strong>Your note:</strong><br>${message.replace(/\n/g, "<br>")}</p>`
          : ""
      }
      <p>We look forward to seeing you!</p>
      <p style="color: #888;">Elodia Beauty & Spa</p>
    </div>
  `,
        attachments: calendarEvent.success
          ? [
              {
                filename: `booking-${service}-${date}.ics`,
                content: calendarEvent.value!,
              },
            ]
          : [],
      });

    // Send notification email to the admin
    await resend.emails.send({
      from: "Elodia Beauty & Spa <onboarding@resend.dev>",
      to: process.env.NEXT_PUBLIC_ADMIN_EMAIL!, // admin email
      subject: `🧖‍♀️ New Booking from ${name}`,
      html: `
    <div style="
      font-family: Arial, sans-serif; 
      color: #333; 
      background-color: #f9f9f9; 
      padding: 20px; 
      border-radius: 8px;
      max-width: 600px;
      margin: auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    ">
      <h2 style="color: #2c7a7b; border-bottom: 2px solid #2c7a7b;">
        New Booking Notification
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td>${name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td>${email}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Service:</td><td>${service}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Price:</td><td>$${price}.00 CAD</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Date:</td><td>${date}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Time:</td><td>${time}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Message:</td><td>${message || "N/A"}</td></tr>
      </table>
    </div>
  `,
      attachments: calendarEvent.success
        ? [
            {
              filename: `booking-${service}-${date}.ics`,
              content: calendarEvent.value!,
            },
          ]
        : [],
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
