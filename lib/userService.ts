import { db } from "@/firebase/config";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  increment,
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
    referredBy: referralCode || null,
    points: 0,
  };

  // 1. Save new user to Firestore
  await setDoc(userRef, newUser);

  // 2. If referral code was used, find owner
  if (referralCode) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("referralCode", "==", referralCode));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const refereeDoc = querySnapshot.docs[0];
      const refereeRef = doc(db, "users", refereeDoc.id);

      // 3. Increment points
      // await updateDoc(refereeRef, {
      //   points: increment(100),
      // });

      const refereeData = refereeDoc.data();

      // 4. Send them an email notification

      await fetch("/api/referral-earned", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: refereeData.email,
          newUserEmail: user.email,
        }),
      });
    } else {
      console.warn("Referral code not found.");
    }
  }

  return newUser.referralCode;
};

function generateReferralCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
