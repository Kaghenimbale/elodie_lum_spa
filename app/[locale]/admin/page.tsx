"use client";

import { useEffect, useState, useMemo } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import { useTranslations } from "next-intl";
import { Dialog } from "@headlessui/react";

export default function AdminPage() {
  const t = useTranslations("admin");
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  // Filters state
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterService, setFilterService] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const adminEmail = "kaghenimbale@gmail.com";

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        if (user.email === adminEmail) {
          const querySnapshot = await getDocs(collection(db, "bookings"));
          const results: any[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            results.push({
              id: doc.id,
              ...data,
              createdAtFormatted:
                data.createdAt instanceof Timestamp
                  ? data.createdAt.toDate().toLocaleString()
                  : "N/A",
              dateFormatted: data.date || "TBD",
            });
          });
          setBookings(results);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async () => {
    if (!selectedBookingId) return;
    try {
      await deleteDoc(doc(db, "bookings", selectedBookingId));
      setBookings((prev) => prev.filter((b) => b.id !== selectedBookingId));
    } catch (error) {
      console.error("Error deleting booking:", error);
    } finally {
      setConfirmDialogOpen(false);
      setSelectedBookingId(null);
    }
  };

  // Filter bookings with memoization
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      return (
        (b.name?.toLowerCase() || "").includes(filterName.toLowerCase()) &&
        (b.email?.toLowerCase() || "").includes(filterEmail.toLowerCase()) &&
        (b.service?.toLowerCase() || "").includes(
          filterService.toLowerCase()
        ) &&
        (filterDate === "" || b.date === filterDate)
      );
    });
  }, [bookings, filterName, filterEmail, filterService, filterDate]);

  if (!user)
    return (
      <p className="w-[100vw] h-[100vh] flex items-center justify-center">
        <ClipLoader color="#164E63" />
      </p>
    );

  if (user.email !== adminEmail)
    return (
      <p className="p-4 text-center bg-red-100 text-red-700 rounded-md w-[100vw] h-[100vh] flex items-center justify-center">
        ⛔️ {t("accessDenied")}
      </p>
    );

  return (
    <div className="p-6 w-full max-w-7xl mx-auto mt-24 flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold text-cyan-900">
        📋 {t("bookedServices")}
      </h1>

      {/* Filters */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder={t("filterName")}
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder={t("filterEmail")}
          value={filterEmail}
          onChange={(e) => setFilterEmail(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder={t("filterService")}
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="date"
          placeholder={t("filterDate")}
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      {filteredBookings.length === 0 ? (
        <p className="text-gray-600">{t("noBookedServices")}</p>
      ) : (
        <>
          {/* Mobile view */}
          <div className="md:hidden space-y-4 mt-6 w-full">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="border border-gray-300 rounded-lg shadow p-4 bg-white space-y-2"
              >
                <p>
                  <span className="font-semibold">{t("name")}:</span> {b.name}
                </p>
                <p>
                  <span className="font-semibold">{t("email")}:</span> {b.email}
                </p>
                <p>
                  <span className="font-semibold">{t("service")}:</span>{" "}
                  {b.service}
                </p>
                <p>
                  <span className="font-semibold">{t("bookingDate")}:</span>{" "}
                  {b.createdAtFormatted}
                </p>
                <p>
                  <span className="font-semibold">{t("serviceDate")}:</span>{" "}
                  {b.dateFormatted}
                </p>
                <p>
                  <span className="font-semibold">{t("time")}:</span> {b.time}
                </p>
                <p>
                  <span className="font-semibold">{t("message")}:</span>{" "}
                  {b.message || t("none")}
                </p>
                <button
                  onClick={() => {
                    setSelectedBookingId(b.id);
                    setConfirmDialogOpen(true);
                  }}
                  className="mt-3 bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
                >
                  {t("delete")}
                </button>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto mt-6 w-full">
            <table className="min-w-full border border-gray-300 rounded-xl bg-white shadow">
              <thead className="bg-cyan-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">{t("name")}</th>
                  <th className="px-4 py-3 text-left">{t("email")}</th>
                  <th className="px-4 py-3 text-left">{t("service")}</th>
                  <th className="px-4 py-3 text-left">{t("bookingDate")}</th>
                  <th className="px-4 py-3 text-left">{t("serviceDate")}</th>
                  <th className="px-4 py-3 text-left">{t("time")}</th>
                  <th className="px-4 py-3 text-left">{t("message")}</th>
                  <th className="px-4 py-3 text-left">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr
                    key={b.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{b.name}</td>
                    <td className="px-4 py-3">{b.email}</td>
                    <td className="px-4 py-3">{b.service}</td>
                    <td className="px-4 py-3">{b.createdAtFormatted}</td>
                    <td className="px-4 py-3">{b.dateFormatted}</td>
                    <td className="px-4 py-3">{b.time}</td>
                    <td className="px-4 py-3">{b.message || t("none")}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          setSelectedBookingId(b.id);
                          setConfirmDialogOpen(true);
                        }}
                        className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
                      >
                        {t("delete")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <Dialog.Title className="text-lg font-semibold text-gray-800 mb-4">
              {t("confirmDelete")}
            </Dialog.Title>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDialogOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                {t("delete")}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
