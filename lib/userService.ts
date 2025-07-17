// lib/userService.ts
import { db } from "@/firebase/config";
import { collection, setDoc, doc } from "firebase/firestore";

// Generate a simple 8-character alphanumeric code
function generateReferralCode() {
  return Math.random().toString(36).substring(2, 10);
}

export async function createUserInFirestore(user: any) {
  const code = generateReferralCode();

  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    referralCode: code,
    points: 0,
    createdAt: new Date(),
  });

  return code;
}
