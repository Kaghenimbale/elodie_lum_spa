"use client";

import React, { useState } from "react";

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
    <div
      id="contact-us"
      className="flex flex-col gap-5 px-4 lg:px-0 items-center justify-center"
    >
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
              Basic Elodia Facial($90.00 CAD)
            </option>
            <option className="font-thin" value="FACIAL">
              EBS Advance Facial($150.00 CAD)
            </option>
            <option className="font-thin" value="MASSAGE">
              EBS Bio Microneedling($200.00 CAD)
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
