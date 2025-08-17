// lib/rewards.ts
import { db } from "@/firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

export async function rewardReferrer(
  referralCode: string,
  bookingPrice: number
) {
  try {
    // find referrer by referral code
    const q = query(
      collection(db, "users"),
      where("referralCode", "==", referralCode)
    );
    const snap = await getDocs(q);

    if (snap.empty) return;

    const referrerDoc = snap.docs[0].ref;
    const rewardPoints = Math.floor(bookingPrice * 0.05 * 10); // (price*0.05)*10

    await updateDoc(referrerDoc, {
      points: increment(rewardPoints),
    });

    console.log("✅ Referrer rewarded with", rewardPoints, "points");
  } catch (err) {
    console.error("Error rewarding referrer:", err);
  }
}
