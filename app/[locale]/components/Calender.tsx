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
import { useLocale, useTranslations } from "next-intl";

type Service = {
  id: string;
  name: string;
  price: number;
  name_fr?: string;
  name_en?: string;
};

type FormData = {
  name: string;
  email: string;
  service: string;
  time: string;
  message: string;
};

const spaHours = [
  { daysOfWeek: [1, 2, 5], startTime: "10:00", endTime: "19:00" },
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [payNow, setPayNow] = useState<boolean | null>(null);
  const locale = useLocale();
  const t = useTranslations("calendar"); // namespace for translation

  useEffect(() => {
    getServices().then((data: any[]) => {
      const fullServices = data.map((item) => ({
        id: item.id,
        name: item.name ?? "Unknown Service",
        price: item.price ?? 0,
        name_fr: item.name_fr,
        name_en: item.name_en,
      }));
      setServices(fullServices);
    });
  }, []);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.dateStr);
    setShowModal(true);
    setMessage(null);
    setPayNow(null);
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
      setMessage({ type: "error", text: t("fillFields") });
      return;
    }

    const selectedService = services.find((s) => s.name === formData.service);
    if (!selectedService) {
      setMessage({ type: "error", text: t("serviceNotFound") });
      return;
    }

    const payload = {
      ...formData,
      date: selectedDate,
      price: selectedService.price,
      payNow,
    };

    try {
      setLoading(true);

      if (payNow) {
        // Stripe Checkout flow
        const res = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || t("paymentError"));

        const stripe = await (
          await import("@stripe/stripe-js")
        ).loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        if (stripe) stripe.redirectToCheckout({ sessionId: data.id });
      } else {
        // Book without payment
        const res = await fetch("/api/book-service", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(t("bookingError"));

        setMessage({ type: "success", text: t("bookingConfirmed") });
        setShowModal(false);
        setPayNow(null);
      }
    } catch (err: any) {
      console.error(err);
      setMessage({ type: "error", text: err.message || t("bookingError") });
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
            setPayNow(null);
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
              {t("bookFor")} {selectedDate}
            </Dialog.Title>

            <div className="space-y-3">
              <input
                name="name"
                placeholder={t("name")}
                className="w-full border p-2 rounded"
                onChange={handleInputChange}
                value={formData.name}
                disabled={loading}
              />
              <input
                name="email"
                placeholder={t("email")}
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
                <option value="">{t("selectService")}</option>
                {services.map((s) => (
                  <option key={s.id} value={s.name}>
                    {locale === "fr" ? s.name_fr : s.name_en} (${s.price})
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
                placeholder={t("message")}
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

            {payNow === null ? (
              <div className="flex flex-col gap-2 mt-4">
                <p className="text-center font-medium">{t("choosePayment")}</p>
                <div className="flex justify-center gap-2">
                  <button
                    className="px-4 py-2 bg-cyan-700 text-white rounded"
                    onClick={() => setPayNow(true)}
                  >
                    {t("payNow")}
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                    onClick={() => setPayNow(false)}
                  >
                    {t("bookWithoutPayment")}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end items-center gap-2 mt-4">
                {loading && <ClipLoader size={25} color="#0e7490" />}
                <button
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => {
                    if (!loading) {
                      setShowModal(false);
                      setMessage(null);
                      setPayNow(null);
                    }
                  }}
                  disabled={loading}
                >
                  {t("cancel")}
                </button>
                <button
                  className="px-4 py-2 bg-cyan-700 text-white rounded disabled:opacity-60"
                  onClick={handleBooking}
                  disabled={loading}
                >
                  {loading
                    ? t("processing")
                    : payNow
                      ? t("confirmAndPay")
                      : t("confirmBooking")}
                </button>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default CalendarBooking;
