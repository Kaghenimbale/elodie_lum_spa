"use client";

import React, { useState } from "react";
import Location from "./Location";

const page = () => {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/book-service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Booking request sent! ✅");
        setMessage({
          name: "",
          email: "",
          service: "",
          date: "",
          message: "",
        });
      } else {
        alert("Something went wrong 😔");
        console.error(result.error);
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Error sending booking request");
    }
  };

  return (
    <div className="pt-[4.5rem] pb-16 flex flex-col gap-5 px-4 lg:px-0 items-center justify-center">
      <div className="w-full h-[60vh] lg:h-[80vh] bg-[url('/bg-contact.jpg')] bg-cover bg-bottom flex items-center justify-center">
        <h2 className="text-[1.8rem] md:text-[2.25rem] text-white font-bold px-4 text-center max-w-4xl">
          Contact Us
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-20 max-w-7xl mx-auto px-4 py-12 w-full lg:w-[70vw]">
        {/* Contact Info */}
        <div className="flex flex-col gap-12 w-full lg:w-1/2 max-w-lg">
          {/* EB & SPA */}
          <div>
            <h3 className="text-xl font-bold mb-4">EB & SPA</h3>
            <div className="flex flex-col gap-3 font-thin text-gray-800">
              <span>
                598 Concession str, Hamilton, Ontario, L8V 1B3, Canada
              </span>
              <span>elodiabspa@gmail.com</span>
              <span>Phone: +1 (289) 206-1802</span>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
            <div className="w-full max-w-sm space-y-3 font-thin text-gray-700">
              {[
                { day: "Monday to Tuesday", hours: "10 AM - 7 PM" },
                { day: "Wednesday to Thursday", hours: "10 AM - 6 PM" },
                { day: "Saturday", hours: "2 AM - 6 PM" },
                { day: "Sunday", hours: "2 AM - 6 PM" },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between">
                  <span>{day}</span>
                  <span className="whitespace-nowrap">{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="">
          <Location />
        </div>
      </div>

      <form
        action=""
        onSubmit={handleSubmit}
        className="p-6 border rounded-lg shadow-lg w-full max-w-md space-y-1 bg-white"
      >
        <h2 className="text-[2rem] font-bold">Book Your Appointment</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name:</label>
          <input
            className="w-full p-2 border rounded border-gray-400"
            type="name"
            placeholder="Name"
            name="name"
            value={message.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email:</label>
        </div>
        <input
          className="w-full p-2 border rounded border-gray-400"
          type="email"
          placeholder="Email address"
          name="email"
          value={message.email}
          onChange={handleChange}
          required
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="service">Type of Service:</label>
          <select
            name="service"
            className="font-thin w-full p-2 border roundedborder-gray-400"
            value={message.service}
            onChange={handleChange}
            required
          >
            <option className="font-thin" value="SAUNA">
              Hair Removal
            </option>
            <option className="font-thin" value="FACIAL">
              Basic Elodia Facial
            </option>
            <option className="font-thin" value="MASSAGE">
              Massage
            </option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="date">Date:</label>
          <input
            className="w-full p-2 border roundedborder-gray-400 font-thin"
            type="date"
            placeholder="Prefered Date"
            name="date"
            value={message.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message">Message:</label>
          <textarea
            className="w-full p-2 border rounded border-gray-400 font-thin"
            placeholder="Message"
            name="message"
            value={message.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-white text-[0.9rem] bg-cyan-800 w-fit px-4 py-2 rounded hover:bg-cyan-700 transition-all duration-300 ease-in-out"
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default page;
