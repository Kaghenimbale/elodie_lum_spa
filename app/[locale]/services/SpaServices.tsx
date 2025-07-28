"use client";

import { useEffect, useState } from "react";
import { getServices } from "@/lib/getServices";
import { deleteService, updateService } from "@/lib/services";
import { ClipLoader } from "react-spinners";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/config";
import { usePathname } from "next/navigation";
import { IKImage } from "imagekitio-react";
import { useTranslations } from "next-intl";
import { Dialog } from "@headlessui/react";

const SpaServices = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("services");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any | null>(null);

  // Separate state for editing service form
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  // Booking form & status
  const [bookingFormData, setBookingFormData] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    hour: "",
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
        service: selectedService.name,
        date: "",
        hour: "",
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
    setEditFormData({
      name: service.name,
      description: service.description,
      price: service.price,
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    await updateService(editingId, editFormData);
    setServices((prev) =>
      prev.map((s) => (s.id === editingId ? { ...s, ...editFormData } : s))
    );

    setEditingId(null);
    setEditFormData({
      name: "",
      description: "",
      price: "",
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

    if (day === 5) return []; // Friday closed

    if (day === 0 || day === 6) {
      return ["14:00", "15:00", "16:00", "17:00", "18:00"];
    } else if (day === 3 || day === 4) {
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
    } else if (day === 1 || day === 2) {
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
      !bookingFormData.hour.trim()
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
      const res = await fetch("/api/book-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingFormData.name,
          email: bookingFormData.email,
          service: bookingFormData.service,
          date: bookingFormData.date,
          time: bookingFormData.hour,
          message: bookingFormData.message,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess("Booking request sent successfully! ✅");
        setBookingFormData({
          name: "",
          email: "",
          service: selectedService?.name || "",
          date: "",
          hour: "",
          message: "",
        });
        setShowConfirmButton(false);

        // Close modal after 3 seconds
        setTimeout(() => {
          setShowModal(false);
          setSuccess("");
        }, 3000);
      } else {
        setError("Something went wrong 😔");
        console.error(result.error);
      }
    } catch (err) {
      console.error("Booking error:", err);
      setError("Error sending booking request");
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
      ) : (
        services.map((service) => (
          <div
            key={service.id}
            className="relative flex justify-center overflow-hidden w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg h-[500px]"
          >
            <IKImage
              src={`${service.imageUrl}?tr=w-400,h-500,q-80,f-auto`}
              alt={service.name}
              loading="lazy"
              lqip={{ active: true }}
              className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
            />

            <div className="absolute bottom-6 bg-white p-4 shadow-lg rounded-lg w-[90%] max-w-md mx-auto flex flex-col gap-2 justify-center items-center">
              {editingId === service.id ? (
                <>
                  <input
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    placeholder="Name"
                    className="border p-1 w-full"
                  />
                  <textarea
                    name="description"
                    value={editFormData.description}
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
                    {service.name}
                  </h3>
                  <p className="font-thin text-center text-sm w-full break-words overflow-wrap hyphens-auto">
                    {service.description}
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
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <Dialog.Panel className="w-full max-w-3xl rounded-xl shadow-2xl bg-white p-4 md:p-6 space-y-6 border-t-4 border-cyan-800">
            <Dialog.Title className="text-2xl font-bold text-gray-900 text-center">
              {selectedService?.name}
            </Dialog.Title>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <IKImage
                src={`${selectedService?.imageUrl}?tr=w-500,h-400,q-80,f-auto`}
                alt={selectedService?.name}
                loading="lazy"
                lqip={{ active: true }}
                className="rounded-xl object-cover w-full h-full max-h-[400px] shadow"
              />

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  value={bookingFormData.name}
                  onChange={handleBookingChange}
                  className="w-full border p-2 rounded-md"
                  disabled={bookingLoading}
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  value={bookingFormData.email}
                  onChange={handleBookingChange}
                  className="w-full border p-2 rounded-md"
                  disabled={bookingLoading}
                />
                <input
                  type="text"
                  name="service"
                  readOnly
                  value={bookingFormData.service}
                  className="w-full border p-2 rounded-md bg-gray-100"
                />
                <input
                  type="date"
                  name="date"
                  required
                  min={getToday()}
                  value={bookingFormData.date}
                  onChange={handleBookingChange}
                  className="w-full border p-2 rounded-md"
                  disabled={bookingLoading}
                />
                <select
                  name="hour"
                  required
                  value={bookingFormData.hour}
                  onChange={handleBookingChange}
                  className="w-full border p-2 rounded-md"
                  disabled={bookingLoading}
                >
                  <option value="">Select Hour</option>
                  {getAvailableHours(bookingFormData.date).map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
                <textarea
                  name="message"
                  placeholder="Message (optional)"
                  value={bookingFormData.message}
                  onChange={handleBookingChange}
                  rows={3}
                  className="w-full border p-2 rounded-md"
                  disabled={bookingLoading}
                />

                {!showConfirmButton ? (
                  <button
                    type="submit"
                    onClick={handleBookNowClick}
                    disabled={bookingLoading}
                    className="w-full bg-cyan-900 text-white py-2 rounded-md hover:bg-cyan-700 transition"
                  >
                    {bookingLoading ? (
                      <ClipLoader size={20} color="#fff" />
                    ) : (
                      "Book Now"
                    )}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleConfirmBooking}
                      disabled={bookingLoading}
                      className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                    >
                      {bookingLoading ? (
                        <ClipLoader size={20} color="#fff" />
                      ) : (
                        "Confirm Booking"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowConfirmButton(false)}
                      disabled={bookingLoading}
                      className="w-full mt-2 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition"
                    >
                      Cancel
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
