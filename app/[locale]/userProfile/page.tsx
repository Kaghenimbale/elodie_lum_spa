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
import { useTranslations } from "next-intl";
import ReferEarn from "../components/ReferEarn";

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [refereeData, setRefereeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copyMessage, setCopyMessage] = useState("");
  const [convertedDollar, setConvertedDollar] = useState<number | null>(null); // new state
  const t = useTranslations("userCard");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(true);

      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);

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

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ClipLoader color="#164E63" size={50} />
      </div>
    );
  }

  const referralLink = userData
    ? `${window.location.origin}/signUp?ref=${userData.referralCode}`
    : "";

  const handleConvertPoints = () => {
    if (!userData || !userData.points) return;
    const dollars = userData.points / 10; // 10 points = $1
    setConvertedDollar(dollars);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
        {/* Refer & Earn Section */}
        <div className="w-full lg:w-1/2 bg-white shadow-lg p-6 rounded-xl">
          <ReferEarn />
        </div>

        {/* User Card */}
        <div className="w-full lg:w-1/2 bg-white shadow-lg p-6 rounded-xl flex flex-col gap-5 justify-center lg:mt-20">
          <div className="w-full flex flex-col gap-5 items-center justify-center">
            <div className="bg-cyan-800 w-16 h-16 flex items-center justify-center rounded-full">
              <BiUser className="text-white text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-center">{t("title")}</h3>
          </div>

          {!user ? (
            <p className="text-red-600 text-center font-medium">
              {t("loginRequired")}
            </p>
          ) : !userData ? (
            <p className="text-yellow-700 bg-yellow-100 p-2 rounded-md text-center">
              {t("userNotFound")}
            </p>
          ) : (
            <>
              <p>
                <strong>{t("email")}:</strong> {user.email}
              </p>
              <p>
                <strong>{t("referralCode")}:</strong> {userData.referralCode}
              </p>
              <p>
                <strong>{t("referredBy")}:</strong>{" "}
                {userData.referredBy || t("none")}
              </p>
              <p>
                <strong>{t("points")}:</strong> {userData.points}
              </p>

              {/* Button to convert points */}
              <button
                onClick={handleConvertPoints}
                className="mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
              >
                {t("convertPoints")}
              </button>

              {convertedDollar !== null && (
                <p className="mt-2 text-blue-700 font-medium">
                  {t("dollarEquivalent")}: ${convertedDollar.toFixed(2)}
                </p>
              )}

              {refereeData && (
                <div className="mt-4 bg-gray-100 p-4 rounded-md">
                  <h3 className="font-semibold mb-1">{t("refereeInfo")}</h3>
                  <p>
                    <strong>{t("refereeEmail")}:</strong> {refereeData.email}
                  </p>
                  <p>
                    <strong>{t("refereeReferralCode")}:</strong>{" "}
                    {refereeData.referralCode}
                  </p>
                </div>
              )}

              {/* Referral Share Section */}
              <div className="mt-4 p-4 bg-blue-50 rounded-md flex flex-col gap-2">
                <p>
                  <strong>{t("shareReferral")}:</strong>
                </p>
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="w-full p-2 border rounded border-gray-300 outline-none"
                />
                <div className="flex gap-2 mt-2 items-center">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(referralLink);
                      setCopyMessage(t("linkCopied"));
                      setTimeout(() => setCopyMessage(""), 3000);
                    }}
                    className="bg-cyan-800 text-white py-2 px-4 rounded hover:bg-cyan-700 transition"
                  >
                    {t("copyLink")}
                  </button>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(referralLink)}`}
                    target="_blank"
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                  >
                    {t("shareWhatsApp")}
                  </a>
                </div>

                {copyMessage && (
                  <p className="text-green-600 mt-2 font-medium">
                    {copyMessage}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
