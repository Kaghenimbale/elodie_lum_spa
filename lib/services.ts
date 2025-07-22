// lib/services.ts
import { db } from "@/firebase/config";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

// Update service

export const updateService = async (id: string, updatedData: any) => {
  const docRef = doc(db, "services", id);
  await updateDoc(docRef, updatedData);
};

// Delete service
export const deleteService = async (id: string) => {
  const serviceRef = doc(db, "services", id);
  await deleteDoc(serviceRef);
};
