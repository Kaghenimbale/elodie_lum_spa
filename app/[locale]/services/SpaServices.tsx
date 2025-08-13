"use client";

import { useEffect, useState } from "react";
import { getServices } from "@/lib/getServices";
import { deleteService, updateService } from "@/lib/services";
import { ClipLoader } from "react-spinners";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/config";
import { usePathname } from "next/navigation";
import { IKImage } from "imagekitio-react";
import { useLocale, useTranslations } from "next-intl";
import { Dialog } from "@headlessui/react";
import { loadStripe } from "@stripe/stripe-js";

type ServiceType = {
  id: string;
  name_en: string;
  name_fr: string;
  description_en: string;
  description_fr: string;
  imageUrl: string;
  price: number;
};

const SpaServices = () => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("services");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [loadedImages, setLoadedImages] = useState<{ [id: string]: boolean }>(
    {}
  );
  const [paymentOption, setPaymentOption] = useState<
    "no-payment" | "with-payment"
  >("no-payment");

  const locale = useLocale();
  const t1 = useTranslations("modal");

  // Separate state for editing service form
  // const [editFormData, setEditFormData] = useState({
  //   name_en: "",
  //   name_fr: "",
  //   price: "",
  //   description_en: "",
  //   description_fr: "",
  // });

  const [editFormData, setEditFormData] = useState<{
    name_en: string;
    name_fr: string;
    description_en: string;
    description_fr: string;
    price: string; // 👈 on garde string ici, car input.value est toujours une string
  }>({
    name_en: "",
    name_fr: "",
    description_en: "",
    description_fr: "",
    price: "",
  });

  // Booking form & status
  const [bookingFormData, setBookingFormData] = useState({
    name: "",
    email: "",
    service: "",
    price: "",
    date: "",
    time: "",
    message: "",
  });

  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setUserEmail(user.email);
        if (
          process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
          user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
        ) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setUserEmail(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Reset booking form and messages when modal opens with selected service
  useEffect(() => {
    if (selectedService) {
      setBookingFormData({
        name: "",
        email: "",
        service:
          locale === "fr" ? selectedService.name_fr : selectedService.name_en,
        price: selectedService.price || "",
        date: "",
        time: "",
        message: "",
      });
      setError("");
      setSuccess("");
      setShowConfirmButton(false);
    }
  }, [selectedService]);

  const handleDelete = async (id: string) => {
    await deleteService(id);
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleEdit = (service: any) => {
    setEditingId(service.id);
    console.log(service);
    setEditFormData({
      name_en: service.name_en,
      name_fr: service.name_fr,
      price: service.price,
      description_en: service.description_en,
      description_fr: service.description_fr,
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    await updateService(editingId, editFormData);
    setServices((prev) =>
      (prev || []).map((s) =>
        s.id === editingId
          ? {
              ...s,
              ...editFormData,
              price: Number(editFormData.price), // ✅ convert string to number
            }
          : s
      )
    );

    setEditingId(null);
    setEditFormData({
      name_en: "",
      name_fr: "",
      price: "",
      description_en: "",
      description_fr: "",
    });
  };

  // Edit form input change handler
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // Booking form input change handler
  const handleBookingChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setBookingFormData({ ...bookingFormData, [e.target.name]: e.target.value });
  };

  // Get today's date formatted as YYYY-MM-DD
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Return available hours based on selected date and spa schedule
  const getAvailableHours = (dateStr: string) => {
    if (!dateStr) return [];

    const date = new Date(dateStr);
    const day = date.getDay();

    // Saturday (6) or Sunday (0)
    if (day === 0 || day === 6) {
      return ["14:00", "15:00", "16:00", "17:00", "18:00"];
    }

    // Wednesday (3) or Thursday (4)
    if (day === 3 || day === 4) {
      return [
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
      ];
    }

    // Monday (1), Tuesday (2), or Friday (5)
    if (day === 1 || day === 2 || day === 5) {
      return [
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
      ];
    }

    return [];
  };

  // Handle initial Book Now click: validate inputs, show confirm button
  const handleBookNowClick = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !bookingFormData.name.trim() ||
      !bookingFormData.email.trim() ||
      !bookingFormData.date.trim() ||
      !bookingFormData.time.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setShowConfirmButton(true);
  };

  // Handle final Confirm Booking submit
  const handleConfirmBooking = async () => {
    setBookingLoading(true);
    setError("");
    setSuccess("");

    try {
      if (paymentOption === "no-payment") {
        // ✅ Booking without payment
        const res = await fetch("/api/book-service", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingFormData),
        });

        const result = await res.json();

        if (res.ok) {
          setSuccess("✅ Booking confirmed successfully!");
          setShowModal(false);
        } else {
          setError(result.error || "Failed to confirm booking.");
        }
      } else {
        // 💳 Booking with payment
        const res = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingFormData),
        });

        const session = await res.json();

        if (res.ok) {
          const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
          );
          if (stripe) {
            await stripe.redirectToCheckout({ sessionId: session.id });
          }
        } else {
          setError(session.error || "Stripe session creation failed.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong during booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div
      className={
        loading
          ? ""
          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center p-4"
      }
    >
      {loading ? (
        <ClipLoader color="#164E63" />
      ) : services.length === 0 ? (
        <div className="text-center py-8 text-gray-600 text-lg">
          {t("no_services_available")}
        </div>
      ) : (
        services.map((service) => (
          <div
            key={service.id}
            className="relative flex justify-center overflow-hidden w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg h-[500px]"
          >
            {/* Skeleton Loader */}
            {!loadedImages[service.id] && (
              <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-md z-0" />
            )}

            {/* Actual Image */}
            <IKImage
              src={`${service.imageUrl}?tr=w-400,h-500,q-80,f-auto`}
              alt={locale === "fr" ? service.name_fr : service.name_en}
              loading="lazy"
              lqip={{ active: true }}
              className={`object-cover w-full h-full transition-transform duration-300 transform hover:scale-105 ${
                loadedImages[service.id] ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() =>
                setLoadedImages((prev) => ({ ...prev, [service.id]: true }))
              }
            />

            <div className="absolute bottom-6 bg-white p-4 shadow-lg rounded-lg w-[90%] max-w-md mx-auto flex flex-col gap-2 justify-center items-center">
              {editingId === service.id ? (
                <>
                  <input
                    name="name"
                    value={
                      locale === "fr"
                        ? editFormData.name_fr
                        : editFormData.name_en
                    }
                    onChange={handleEditChange}
                    placeholder="Name"
                    className="border p-1 w-full"
                  />
                  <textarea
                    name="description"
                    value={
                      locale === "fr"
                        ? editFormData.description_fr
                        : editFormData.description_en
                    }
                    onChange={handleEditChange}
                    placeholder="Description"
                    className="border p-1 w-full resize-none break-words overflow-wrap"
                    rows={4}
                  />
                  <input
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditChange}
                    placeholder="Price"
                    className="border p-1 w-full"
                  />
                  <button
                    onClick={handleUpdate}
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    {t("save")}
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold break-words text-center">
                    {locale === "fr" ? service.name_fr : service.name_en}
                  </h3>
                  <p className="font-thin text-center text-sm w-full break-words overflow-wrap hyphens-auto">
                    {locale === "fr"
                      ? service.description_fr
                      : service.description_en}
                  </p>

                  <span className="text-center block">
                    ${service.price}.00 CAD
                  </span>
                </>
              )}

              {isAdmin ? (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="bg-blue-700 text-white text-sm hover:bg-cyan-700 transition duration-300 px-4 py-2 rounded"
                  >
                    {t("edit")}
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="bg-red-700 text-white text-sm hover:bg-red-600 transition duration-300 px-4 py-2 rounded"
                  >
                    {t("delete")}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedService(service);
                    setShowModal(true);
                  }}
                  className="text-white bg-cyan-900 hover:bg-cyan-700 transition duration-300 px-4 py-2 rounded"
                >
                  {t("book")}
                </button>
              )}
            </div>
          </div>
        ))
      )}

      <Dialog
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setError("");
          setSuccess("");
          setShowConfirmButton(false);
        }}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Responsive vertical alignment: top on mobile, center on desktop */}
        <div className="fixed inset-0 flex items-start md:items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <Dialog.Panel className="relative w-[90vw] lg:max-w-3xl rounded-xl shadow-2xl bg-white p-4 sm:p-6 space-y-1 border-t-4 border-cyan-800">
            <Dialog.Title className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
              {locale === "fr"
                ? selectedService?.name_fr
                : selectedService?.name_en}
            </Dialog.Title>

            <div className="flex flex-col gap-2 md:grid md:grid-cols-2">
              <IKImage
                src={`${selectedService?.imageUrl}?tr=w-500,h-400,q-80,f-auto`}
                alt={selectedService?.name}
                loading="lazy"
                lqip={{ active: true }}
                className="rounded-xl w-full h-[200px] sm:h-[300px] md:h-full max-h-[400px] shadow 
        object-top sm:object-top md:object-center object-cover"
              />

              <form
                className="p-4 border rounded-xl shadow-xl w-full max-w-md space-y-4 bg-white"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={t1("yourName")}
                  value={bookingFormData.name}
                  onChange={handleBookingChange}
                  className="w-full p-2 border rounded border-gray-300 outline-none"
                  disabled={bookingLoading}
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t1("yourEmail")}
                  value={bookingFormData.email}
                  onChange={handleBookingChange}
                  className="w-full p-2 border rounded border-gray-300 outline-none"
                  disabled={bookingLoading}
                />
                <input
                  type="text"
                  name="service"
                  readOnly
                  value={
                    locale === "fr"
                      ? selectedService?.name_fr || bookingFormData.service
                      : selectedService?.name_en || bookingFormData.service
                  }
                  className="w-full p-2 border rounded border-gray-300 outline-none"
                />

                <input
                  type="text"
                  name="price"
                  readOnly
                  value={`$${bookingFormData.price}.00 CAD`}
                  className="w-full p-2 border rounded border-gray-300 outline-none"
                />
                <div className="flex flex-col gap-2">
                  <label htmlFor="date">{t1("dateLabel")}</label>
                  <input
                    type="date"
                    name="date"
                    required
                    min={getToday()}
                    value={bookingFormData.date}
                    onChange={handleBookingChange}
                    className="w-[15rem] h-[2.8rem] md:w-full p-2 border rounded border-gray-300 outline-none"
                    disabled={bookingLoading}
                  />
                </div>
                <select
                  name="time"
                  required
                  value={bookingFormData.time}
                  onChange={handleBookingChange}
                  className="w-[15rem] h-[2.8rem] md:w-full p-2 border rounded border-gray-300 outline-none"
                  disabled={bookingLoading || !bookingFormData.date}
                >
                  <option value="">{t1("selectHour")}</option>
                  {bookingFormData.date &&
                    getAvailableHours(bookingFormData.date).map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                </select>

                <textarea
                  name="message"
                  placeholder={t1("optionalMessage")}
                  value={bookingFormData.message}
                  onChange={handleBookingChange}
                  rows={3}
                  className="w-full p-2 border rounded border-gray-300 outline-none"
                  disabled={bookingLoading}
                />

                {!showConfirmButton ? (
                  <button
                    type="submit"
                    onClick={handleBookNowClick}
                    disabled={bookingLoading}
                    className="w-full bg-cyan-900 text-white py-3 rounded-md hover:bg-cyan-700 transition"
                  >
                    {bookingLoading ? (
                      <ClipLoader size={20} color="#fff" />
                    ) : (
                      t1("bookNow")
                    )}
                  </button>
                ) : (
                  <>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="paymentOption"
                          value="no-payment"
                          checked={paymentOption === "no-payment"}
                          onChange={() => setPaymentOption("no-payment")}
                        />
                        {t1("bookWithoutPayment")}
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="paymentOption"
                          value="with-payment"
                          checked={paymentOption === "with-payment"}
                          onChange={() => setPaymentOption("with-payment")}
                        />
                        {t1("bookWithPayment")}
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={handleConfirmBooking}
                      disabled={bookingLoading}
                      className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
                    >
                      {bookingLoading ? (
                        <ClipLoader size={20} color="#fff" />
                      ) : (
                        t1("confirmBooking")
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowConfirmButton(false)}
                      disabled={bookingLoading}
                      className="w-full mt-2 bg-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-400 transition"
                    >
                      {t1("cancel")}
                    </button>
                  </>
                )}

                {error && <p className="text-red-600 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}
              </form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default SpaServices;
