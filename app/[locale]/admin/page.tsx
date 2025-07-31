"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import { useTranslations } from "next-intl";

export default function AdminPage() {
  const t = useTranslations("admin");
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  const adminEmail = "kaghenimbale@gmail.com"; // Your admin email

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        if (user.email === adminEmail) {
          // Load bookings
          const querySnapshot = await getDocs(collection(db, "bookings"));
          const results: any[] = [];
          querySnapshot.forEach((doc) =>
            results.push({ id: doc.id, ...doc.data() })
          );
          setBookings(results);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user)
    return (
      <p className="w-[100vw] h-[100vh] flex items-center justify-center">
        <ClipLoader color="#164E63" size={50} />
      </p>
    );

  if (user.email !== adminEmail)
    return (
      <p className="p-4 text-center bg-red-100 text-red-700 rounded-md w-[100vw] h-[100vh] flex items-center justify-center">
        ⛔️ {t("accessDenied")}
      </p>
    );

  return (
    <div className="p-6 w-[100vw] mt-20 flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">📋 {t("bookedServices")}</h1>
      {bookings.length === 0 ? (
        <p>{t("noBookedServices")}</p>
      ) : (
        <>
          {/* MOBILE: stacked cards */}
          <div className="md:hidden space-y-4 mt-6">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="border border-gray-300 rounded-lg shadow p-4 bg-white"
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
                  <span className="font-semibold">{t("date")}:</span> {b.date}
                </p>
                <p>
                  <span className="font-semibold">{t("time")}:</span> {b.time}
                </p>
                <p>
                  <span className="font-semibold">{t("message")}:</span>{" "}
                  {b.message || t("none")}
                </p>
              </div>
            ))}
          </div>

          {/* DESKTOP: table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-xl bg-white">
              <thead className="bg-cyan-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">{t("name")}</th>
                  <th className="px-4 py-3 text-left">{t("email")}</th>
                  <th className="px-4 py-3 text-left">{t("service")}</th>
                  <th className="px-4 py-3 text-left">{t("date")}</th>
                  <th className="px-4 py-3 text-left">{t("time")}</th>
                  <th className="px-4 py-3 text-left">{t("message")}</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{b.name}</td>
                    <td className="px-4 py-3">{b.email}</td>
                    <td className="px-4 py-3">{b.service}</td>
                    <td className="px-4 py-3">{b.date}</td>
                    <td className="px-4 py-3">{b.time}</td>
                    <td className="px-4 py-3">{b.message || t("none")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
