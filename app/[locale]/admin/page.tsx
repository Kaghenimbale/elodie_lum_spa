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
  updateDoc,
} from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import { useTranslations } from "next-intl";
import { Dialog } from "@headlessui/react";

export default function AdminPage() {
  const t = useTranslations("admin");
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [editBookingData, setEditBookingData] = useState<any>({
    name: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  // Filters
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterService, setFilterService] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterType, setFilterType] = useState<
    "all" | "today" | "week" | "custom"
  >("all");

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  // Fetch bookings
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

  // Delete booking
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

  // Update booking
  const handleUpdate = async () => {
    if (!selectedBookingId) return;
    try {
      const bookingRef = doc(db, "bookings", selectedBookingId);
      await updateDoc(bookingRef, editBookingData);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === selectedBookingId ? { ...b, ...editBookingData } : b
        )
      );
    } catch (error) {
      console.error("Error updating booking:", error);
    } finally {
      setEditDialogOpen(false);
      setSelectedBookingId(null);
    }
  };

  // Date helpers
  const isSameDay = (date1: Date, date2: Date) =>
    date1.toDateString() === date2.toDateString();

  const isSameWeek = (date1: Date, date2: Date) => {
    const startOfWeek = new Date(date2);
    startOfWeek.setDate(date2.getDate() - date2.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return date1 >= startOfWeek && date1 <= endOfWeek;
  };

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const bookingDate =
        b.dateFormatted && !isNaN(Date.parse(b.dateFormatted))
          ? new Date(b.dateFormatted)
          : null;

      let dateMatch = true;
      if (filterType === "today" && bookingDate) {
        dateMatch = isSameDay(bookingDate, new Date());
      } else if (filterType === "week" && bookingDate) {
        dateMatch = isSameWeek(bookingDate, new Date());
      } else if (filterType === "custom" && filterDate && bookingDate) {
        dateMatch = isSameDay(bookingDate, new Date(filterDate));
      }

      return (
        (b.name?.toLowerCase() || "").includes(filterName.toLowerCase()) &&
        (b.email?.toLowerCase() || "").includes(filterEmail.toLowerCase()) &&
        (b.service?.toLowerCase() || "").includes(
          filterService.toLowerCase()
        ) &&
        dateMatch
      );
    });
  }, [
    bookings,
    filterName,
    filterEmail,
    filterService,
    filterType,
    filterDate,
  ]);

  if (!user)
    return (
      <p className="w-screen h-screen flex items-center justify-center">
        <ClipLoader color="#164E63" />
      </p>
    );

  if (user.email !== adminEmail)
    return (
      <p className="p-4 text-center bg-red-100 text-red-700 rounded-md w-screen h-screen flex items-center justify-center">
        ⛔️ {t("accessDenied")}
      </p>
    );

  return (
    <div className="p-6 w-full max-w-[90vw] mx-auto mt-24 flex flex-col items-center gap-5">
      <h1 className="text-3xl font-bold text-cyan-900">
        📋 {t("bookedServices")}
      </h1>

      {/* Filters */}
      <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder={t("filterName")}
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-cyan-600"
        />
        <input
          type="text"
          placeholder={t("filterEmail")}
          value={filterEmail}
          onChange={(e) => setFilterEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-cyan-600"
        />
        <input
          type="text"
          placeholder={t("filterService")}
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-cyan-600"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-cyan-600"
        >
          <option value="all">{t("filters.allBookings")}</option>
          <option value="today">{t("filters.todayBookings")}</option>
          <option value="week">{t("filters.thisWeekBookings")}</option>
          <option value="custom">{t("filters.customDate")}</option>
        </select>
        {filterType === "custom" && (
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-cyan-600"
          />
        )}
      </div>

      {/* Results */}
      {filteredBookings.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">
          {t("noBookedServices")}
        </p>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 mt-6 w-full">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="border border-gray-200 rounded-xl shadow-sm p-4 bg-white"
              >
                <h3 className="text-lg font-semibold text-cyan-800 mb-2">
                  {b.service}
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">{t("name")}:</span> {b.name}
                  </p>
                  <p>
                    <span className="font-medium">{t("email")}:</span> {b.email}
                  </p>
                  <p>
                    <span className="font-medium">{t("bookingDate")}:</span>{" "}
                    {b.createdAtFormatted}
                  </p>
                  <p>
                    <span className="font-medium">{t("serviceDate")}:</span>{" "}
                    {b.dateFormatted}
                  </p>
                  <p>
                    <span className="font-medium">{t("time")}:</span> {b.time}
                  </p>
                  {b.message && (
                    <p className="italic text-gray-500">
                      <span className="font-medium">{t("message")}:</span>{" "}
                      {b.message}
                    </p>
                  )}
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setSelectedBookingId(b.id);
                      setEditBookingData({
                        name: b.name,
                        email: b.email,
                        service: b.service,
                        date: b.dateFormatted,
                        time: b.time,
                        message: b.message || "",
                      });
                      setEditDialogOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm shadow-sm"
                  >
                    {t("edit")}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBookingId(b.id);
                      setConfirmDialogOpen(true);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm shadow-sm"
                  >
                    {t("delete")}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="overflow-x-auto w-full">
            <table className="min-w-[1300px] w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <thead className="bg-cyan-900 text-white text-sm uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    {t("name")}
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    {t("email")}
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    {t("service")}
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    {t("bookingDate")}
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    {t("serviceDate")}
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    {t("time")}
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    {t("message")}
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    {t("status")}
                  </th>
                  <th className="px-4 py-3 text-center whitespace-nowrap">
                    {t("actions")}
                  </th>
                  <th className="px-4 py-3 whitespace-nowrap">
                    {t("delivery")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">{b.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{b.email}</td>
                    <td className="px-4 py-3 font-medium text-cyan-800 whitespace-nowrap">
                      {b.service}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {b.createdAtFormatted.slice(0, 10)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {b.dateFormatted}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{b.time}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {b.message || t("none")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          b.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : b.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center items-center gap-2 h-full">
                        <button
                          onClick={() => {
                            setSelectedBookingId(b.id);
                            setEditBookingData({
                              name: b.name,
                              email: b.email,
                              service: b.service,
                              date: b.dateFormatted,
                              time: b.time,
                              message: b.message || "",
                            });
                            setEditDialogOpen(true);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm shadow-sm"
                        >
                          {t("edit")}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBookingId(b.id);
                            setConfirmDialogOpen(true);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm shadow-sm"
                        >
                          {t("delete")}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={b.delivered ? "delivered" : "not-delivered"}
                        onChange={async (e) => {
                          const newDelivered = e.target.value === "delivered";
                          await updateDoc(doc(db, "bookings", b.id), {
                            delivered: newDelivered,
                          });
                          setBookings((prev) =>
                            prev.map((booking) =>
                              booking.id === b.id
                                ? { ...booking, delivered: newDelivered }
                                : booking
                            )
                          );
                        }}
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          b.delivered
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        <option value="not-delivered">
                          {t("notDelivered")}
                        </option>
                        <option value="delivered">{t("delivered")}</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Confirm Delete Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto backdrop-blur-sm"
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

      {/* Edit Booking Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full space-y-4">
            <Dialog.Title className="text-lg font-semibold text-gray-800 mb-2">
              {t("editBooking")}
            </Dialog.Title>

            <input
              type="text"
              placeholder={t("name")}
              value={editBookingData.name}
              onChange={(e) =>
                setEditBookingData({ ...editBookingData, name: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-cyan-600"
            />
            <input
              type="email"
              placeholder={t("email")}
              value={editBookingData.email}
              onChange={(e) =>
                setEditBookingData({
                  ...editBookingData,
                  email: e.target.value,
                })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-cyan-600"
            />
            <input
              type="text"
              placeholder={t("service")}
              value={editBookingData.service}
              onChange={(e) =>
                setEditBookingData({
                  ...editBookingData,
                  service: e.target.value,
                })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-cyan-600"
            />
            <input
              type="date"
              placeholder={t("serviceDate")}
              value={editBookingData.date}
              onChange={(e) =>
                setEditBookingData({ ...editBookingData, date: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-cyan-600"
            />
            <input
              type="time"
              placeholder={t("time")}
              value={editBookingData.time}
              onChange={(e) =>
                setEditBookingData({ ...editBookingData, time: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-cyan-600"
            />
            <textarea
              placeholder={t("message")}
              value={editBookingData.message}
              onChange={(e) =>
                setEditBookingData({
                  ...editBookingData,
                  message: e.target.value,
                })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-cyan-600"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditDialogOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                {t("save")}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
