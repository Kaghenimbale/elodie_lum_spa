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
      <div className="w-[100%] h-[100vh] lg:h-[80vh] bg-[url('/bg-contact.jpg')] bg-cover bg-bottom flex items-center justify-center">
        <h2 className="text-[2rem] text-white font-bold">Contact Us</h2>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0 lg:justify-between lg:w-[70vw]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold">EB & SPA</h3>
            <div className="flex flex-col gap-4 font-thin">
              <span>
                598 Concession str, Hamilton, Ontario, L8V 1B3, Canada
              </span>
              <span>elodiabspa@gmail.com</span>
              <span>Phone: +1(289) 206-1802</span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold">Opening Hours</h3>
            <div className="w-[20rem]">
              <div className="flex justify-between font-thin">
                <span>Monday to Tuesday</span>
                <span className="text-nowrap">10 AM - 7 PM</span>
              </div>
              <div className="flex justify-between font-thin">
                <span>Wednesday to Thursday</span>
                <span className="text-nowrap">10 AM - 6 PM</span>
              </div>
              <div className="flex justify-between font-thin">
                <span>Saturday</span>
                <span className="text-nowrap">2 AM - 6 PM</span>
              </div>
              <div className="flex justify-between font-thin">
                <span>Sunday</span>
                <span className="text-nowrap">2 AM - 6 PM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-red-500">
          <Location /> LOCATION
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
