"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { Dialog } from "@headlessui/react";
import { getServices } from "@/lib/getServices";
import { ClipLoader } from "react-spinners";

type Service = {
  id: string;
  name: string;
  price: number;
};

type FormData = {
  name: string;
  email: string;
  service: string;
  time: string;
  message: string;
};

const spaHours = [
  { daysOfWeek: [1, 2], startTime: "10:00", endTime: "19:00" },
  { daysOfWeek: [3, 4], startTime: "10:00", endTime: "18:00" },
  { daysOfWeek: [6, 0], startTime: "14:00", endTime: "18:00" },
];

const CalendarBooking = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    service: "",
    time: "",
    message: "",
  });

  // Loading and message state for booking
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    getServices().then((data: any[]) => {
      const fullServices = data.map((item) => ({
        id: item.id,
        name: item.name ?? "Unknown Service",
        price: item.price ?? 0,
      }));
      setServices(fullServices);
    });
  }, []);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setShowModal(true);
    setMessage(null); // reset message each time modal opens
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = async () => {
    setMessage(null);

    if (
      !formData.name ||
      !formData.email ||
      !formData.service ||
      !formData.time
    ) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const selectedService = services.find((s) => s.name === formData.service);
    if (!selectedService) {
      setMessage({ type: "error", text: "Selected service not found." });
      return;
    }

    const payload = {
      ...formData,
      date: selectedDate,
      price: selectedService.price,
    };

    try {
      setLoading(true);
      const res = await fetch("/api/book-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage({
          type: "error",
          text: "Booking failed: " + (errorData.message || "Try again later."),
        });
      } else {
        setMessage({ type: "success", text: "Booking successful!" });
        setFormData({
          name: "",
          email: "",
          service: "",
          time: "",
          message: "",
        });

        // Optionally auto-close modal after success
        setTimeout(() => {
          setShowModal(false);
          setMessage(null);
        }, 2000);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Unexpected error occurred." });
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <FullCalendar
        locale={frLocale}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth",
        }}
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        hiddenDays={[5]}
        businessHours={spaHours}
        selectConstraint="businessHours"
        events={events}
        dateClick={handleDateClick}
      />

      <Dialog
        open={showModal}
        onClose={() => {
          if (!loading) {
            setShowModal(false);
            setMessage(null);
          }
        }}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
            <Dialog.Title className="text-xl font-semibold mb-4">
              Book for {selectedDate}
            </Dialog.Title>

            <div className="space-y-3">
              <input
                name="name"
                placeholder="Name"
                className="w-full border p-2 rounded"
                onChange={handleInputChange}
                value={formData.name}
                disabled={loading}
              />
              <input
                name="email"
                placeholder="Email"
                type="email"
                className="w-full border p-2 rounded"
                onChange={handleInputChange}
                value={formData.email}
                disabled={loading}
              />
              <select
                name="service"
                className="w-full border p-2 rounded"
                onChange={handleInputChange}
                value={formData.service}
                disabled={loading}
              >
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} (${s.price})
                  </option>
                ))}
              </select>
              <input
                name="time"
                type="time"
                className="w-full border p-2 rounded"
                onChange={handleInputChange}
                value={formData.time}
                disabled={loading}
              />
              <textarea
                name="message"
                placeholder="Message"
                className="w-full border p-2 rounded"
                onChange={handleInputChange}
                value={formData.message}
                disabled={loading}
              />
            </div>

            {message && (
              <p
                className={`mt-3 text-center font-semibold ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message.text}
              </p>
            )}

            <div className="flex justify-end items-center gap-2 mt-4">
              {loading && <ClipLoader size={25} color="#0e7490" />}
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => {
                  if (!loading) {
                    setShowModal(false);
                    setMessage(null);
                  }
                }}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-cyan-700 text-white rounded disabled:opacity-60"
                onClick={handleBooking}
                disabled={loading}
              >
                Confirm
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default CalendarBooking;
