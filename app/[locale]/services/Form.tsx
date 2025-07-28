"use client";

import React, { useEffect, useState } from "react";
import { getServices } from "@/lib/getServices";
import ClipLoader from "react-spinners/ClipLoader";
import { Dialog } from "@headlessui/react";

const spaHours = [
  { day: 1, start: "10:00", end: "19:00" }, // Monday
  { day: 2, start: "10:00", end: "19:00" }, // Tuesday
  { day: 3, start: "10:00", end: "18:00" }, // Wednesday
  { day: 4, start: "10:00", end: "18:00" }, // Thursday
  { day: 6, start: "14:00", end: "18:00" }, // Saturday
  { day: 0, start: "14:00", end: "18:00" }, // Sunday
];

const Page = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [dateError, setDateError] = useState("");

  const [message, setMessage] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e: any) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const day = selectedDate.getDay();

    if (day === 5) {
      setDateError("We are closed on Fridays. Please choose another date.");
      return;
    }

    setDateError("");
    handleChange(e);
  };

  const handleConfirm = async () => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    setShowModal(false);

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
        setSuccessMessage("Booking request sent successfully! ✅");
        setMessage({
          name: "",
          email: "",
          service: "",
          date: "",
          time: "",
          message: "",
        });
      } else {
        setErrorMessage("Something went wrong 😔");
        console.error(result.error);
      }
    } catch (err) {
      console.error("Booking error:", err);
      setErrorMessage("Error sending booking request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="contact-us"
      className="flex flex-col gap-5 px-4 lg:px-0 items-center justify-center"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
        className="p-6 border rounded-xl shadow-xl w-full max-w-md space-y-4 bg-white"
      >
        <h2 className="text-[2rem] font-bold text-center">
          Book Your Appointment
        </h2>

        {[
          { name: "name", type: "text", label: "Name", placeholder: "Name" },
          {
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "Email address",
          },
        ].map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
            <label htmlFor={field.name}>{field.label}:</label>
            <input
              className="w-full p-2 border rounded border-gray-300 focus:ring-2 focus:ring-cyan-600 outline-none"
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              value={(message as any)[field.name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <label htmlFor="service">Type of Service:</label>
          <select
            name="service"
            className="w-full p-2 border rounded border-gray-300 focus:ring-2 focus:ring-cyan-600 outline-none"
            value={message.service}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name} (${service.price}.00 CAD)
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="date">Date (according to spa hours):</label>
          <input
            className={`w-full p-2 border rounded focus:ring-2 outline-none ${dateError ? "border-red-500" : "border-gray-300 focus:ring-cyan-600"}`}
            type="date"
            name="date"
            value={message.date}
            onChange={handleDateChange}
            min={new Date().toISOString().split("T")[0]}
            required
          />
          {dateError && <p className="text-sm text-red-600">{dateError}</p>}
          <p className="text-sm text-gray-500 flex flex-col">
            <span>Monday–Tuesday: 10 AM–7 PM</span>
            <span>Wednesday–Thursday: 10 AM–6 PM</span>
            <span>Saturday–Sunday: 2 PM–6 PM</span>
            <span className="text-red-500">Closed on Fridays</span>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="time" className="text-sm font-medium text-gray-700">
            Preferred Time:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
            type="time"
            name="time"
            min="10:00"
            max="19:00"
            value={message.time}
            onChange={handleChange}
            required
          />
          <div className="bg-cyan-50 border border-cyan-200 rounded-md p-3 text-sm text-cyan-800">
            <p className="font-semibold mb-1">Spa Working Hours:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Monday–Tuesday: 10 AM–7 PM</li>
              <li>Wednesday–Thursday: 10 AM–6 PM</li>
              <li>Saturday–Sunday: 2 PM–6 PM</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message">Message:</label>
          <textarea
            className="w-full p-2 border rounded border-gray-300 focus:ring-2 focus:ring-cyan-600 outline-none"
            placeholder="Message"
            name="message"
            value={message.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="text-white text-[0.95rem] bg-cyan-800 w-full py-2 rounded hover:bg-cyan-700 transition-all duration-300 ease-in-out flex justify-center items-center gap-2"
        >
          {loading ? <ClipLoader size={20} color="#ffffff" /> : "BOOK NOW"}
        </button>

        {successMessage && (
          <p className="text-green-600 text-sm mt-2 text-center">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="text-red-600 text-sm mt-2 text-center">
            {errorMessage}
          </p>
        )}
      </form>

      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl shadow-2xl bg-white p-6 space-y-6 border-t-4 border-cyan-800">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Confirm Your Booking
            </Dialog.Title>
            <div className="text-sm space-y-1 text-gray-700">
              <p>
                <strong>Name:</strong> {message.name}
              </p>
              <p>
                <strong>Email:</strong> {message.email}
              </p>
              <p>
                <strong>Service:</strong> {message.service}
              </p>
              <p>
                <strong>Date:</strong> {message.date}
              </p>
              <p>
                <strong>Time:</strong> {message.time}
              </p>
              <p>
                <strong>Message:</strong> {message.message}
              </p>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 border"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-cyan-800 text-white rounded hover:bg-cyan-700 shadow"
                onClick={handleConfirm}
              >
                Confirm Booking
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Page;
