// lib/getServices.ts
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

export async function getServices() {
  const snapshot = await getDocs(collection(db, "services"));
  const services = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return services;
}
