// lib/getServices.ts
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase/config";

export type ServiceType = {
  id: string;
  name_en: string;
  name_fr: string;
  description_en: string;
  description_fr: string;
  imageUrl: string;
  price: number;
};

export const getServices = async (): Promise<ServiceType[]> => {
  try {
    const snapshot = await getDocs(collection(db, "services"));

    const services: ServiceType[] = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        name_en: data.name_en,
        name_fr: data.name_fr,
        description_en: data.description_en,
        description_fr: data.description_fr,
        imageUrl: data.imageUrl,
        price: data.price,
      };
    });

    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};
