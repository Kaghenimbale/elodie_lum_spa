"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const BookingSuccess = () => {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const name = params.get("name");
    const email = params.get("email");
    const service = params.get("service");
    const price = params.get("price");
    const date = params.get("date");
    const time = params.get("time");
    const message = params.get("message");

    const submitBooking = async () => {
      try {
        const res = await fetch("/api/book-service", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            service,
            price,
            date,
            time,
            message,
          }),
        });

        if (res.ok) {
          console.log("Booking saved after payment!");
        } else {
          console.error("Failed to save booking.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (email && service) {
      submitBooking();
    }

    const timeout = setTimeout(() => {
      router.push("/"); // redirect home or to dashboard
    }, 5000);

    return () => clearTimeout(timeout);
  }, [params, router]);

  return (
    <div className="text-center py-20 mt-24">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4">Your booking is confirmed.</p>
    </div>
  );
};

export default BookingSuccess;
