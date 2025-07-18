"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { BiUser } from "react-icons/bi";
import { ClipLoader } from "react-spinners";

const page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [refereeData, setRefereeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(true);

      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);

          // Fetch referee data if user was referred
          if (data.referredBy) {
            const q = query(
              collection(db, "users"),
              where("referralCode", "==", data.referredBy)
            );
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              setRefereeData(querySnapshot.docs[0].data());
            }
          }
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <p className="w-[100vw] h-[100vh] flex items-center justify-center">
        <ClipLoader color="#164E63" size={50} />
      </p>
    );

  if (!user) {
    return (
      <div className="p-4 text-center bg-red-100 text-red-700 rounded-md w-[100vw] h-[100vh] flex items-center justify-center">
        🚫 Please log in to view your profile.
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="p-4 text-center bg-yellow-100 text-yellow-700 rounded-md">
        ⚠️ User data not found.
      </div>
    );
  }
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-xl mt-4 w-[100vw] h-[80vh] flex flex-col gap-5 justify-center">
      <div className="w-full flex flex-col gap-5 items-center justify-center">
        <div className="bg-cyan-800 w-[4rem] h-[4rem] flex items-center justify-center rounded-full">
          <BiUser className="text-white text-4xl" />
        </div>
        <h3 className="text-2xl font-bold">EB & Spa User Card</h3>
      </div>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Your Referral Code:</strong> {userData.referralCode}
      </p>
      <p>
        <strong>Referred By:</strong> {userData.referredBy || "None"}
      </p>
      <p>
        <strong>Points:</strong> {userData.points}
      </p>

      {refereeData && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md">
          <h3 className="font-semibold mb-1">👥 Referee Info</h3>
          <p>
            <strong>Email:</strong> {refereeData.email}
          </p>
          <p>
            <strong>Referral Code:</strong> {refereeData.referralCode}
          </p>
        </div>
      )}
    </div>
  );
};

export default page;
