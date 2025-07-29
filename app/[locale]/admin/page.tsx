// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { ClipLoader } from "react-spinners";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  const adminEmail = "kaghenimbale@gmail.com"; // Ton email pro

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        if (user.email === adminEmail) {
          // Charger les réservations
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
        ⛔️ Accès refusé
      </p>
    );

  return (
    <div className="p-6 w-[100vw] mt-20 flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">📋 Booked services</h1>
      {bookings.length === 0 ? (
        <p>No booked services.</p>
      ) : (
        /* MOBILE: stacked cards */
        <>
          <div className="md:hidden space-y-4 mt-6">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="border border-gray-300 rounded-lg shadow p-4 bg-white"
              >
                <p>
                  <span className="font-semibold">Nom:</span> {b.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {b.email}
                </p>
                <p>
                  <span className="font-semibold">Service:</span> {b.service}
                </p>
                <p>
                  <span className="font-semibold">Date:</span> {b.date}
                </p>
                <p>
                  <span className="font-semibold">Time:</span> {b.time}
                </p>
                <p>
                  <span className="font-semibold">Message:</span>{" "}
                  {b.message || "Aucun"}
                </p>
              </div>
            ))}
          </div>
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-xl bg-white">
              <thead className="bg-cyan-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Nom</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Service</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-left">Message</th>
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
                    <td className="px-4 py-3">{b.message || "Aucun"}</td>
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
