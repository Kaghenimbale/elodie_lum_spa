import { db } from "@/firebase/config";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

export const createUserInFirestore = async (
  user: any,
  referralCode?: string | null
) => {
  const userRef = doc(db, "users", user.uid);

  const newUser = {
    uid: user.uid,
    email: user.email,
    referralCode: generateReferralCode(),
    referredBy: referralCode || null, // just record who referred them
    points: 0,
    referralPaymentsCount: 0,
  };

  // 1. Save new user to Firestore
  await setDoc(userRef, newUser);

  // 2. If referral code was used, only save "referredBy"
  if (referralCode) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("referralCode", "==", referralCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn("Referral code not found.");
    }
  }

  return newUser.referralCode;
};

function generateReferralCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
