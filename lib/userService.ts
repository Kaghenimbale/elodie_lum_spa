import { db } from "@/firebase/config";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

export const createUserInFirestore = async (
  user: any,
  referralCode?: string | null
): Promise<{ referralCode: string; isNewUser: boolean }> => {
  const userRef = doc(db, "users", user.uid);

  // 1. Check if user already exists
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return { referralCode: docSnap.data().referralCode, isNewUser: false };
  }

  // 2. Create new user
  const newUser = {
    uid: user.uid,
    email: user.email,
    referralCode: generateReferralCode(),
    referredBy: referralCode || null,
    points: 0,
    referralPaymentsCount: 0,
  };

  await setDoc(userRef, newUser);

  // 3. Validate referral code
  if (referralCode) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("referralCode", "==", referralCode));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.warn("Referral code not found.");
    }
  }

  return { referralCode: newUser.referralCode, isNewUser: true };
};

function generateReferralCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
