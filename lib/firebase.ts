import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "@/firebase/config";

const db = getFirestore(app);

export const fetchReferrerByEmail = async (email: string) => {
  // Find the user by their email
  const q = query(collection(db, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const userDoc = snapshot.docs[0].data();
    const referredByCode = userDoc.referredBy;

    if (referredByCode) {
      // Find the referrer by their referralCode
      const refQuery = query(
        collection(db, "users"),
        where("referralCode", "==", referredByCode)
      );
      const refSnapshot = await getDocs(refQuery);
      if (!refSnapshot.empty) {
        const refUser = refSnapshot.docs[0].data();
        return { name: refUser.email, code: refUser.referralCode }; // or display a name field if exists
      }
    }
  }

  return null; // no referrer
};
