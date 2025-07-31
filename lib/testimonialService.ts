// lib/testimonialService.ts
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const submitTestimonial = async ({
  userId,
  name,
  email,
  rating,
  message,
  message_fr,
}: {
  userId: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  message_fr: string;
}) => {
  try {
    await addDoc(collection(db, "testimonials"), {
      userId,
      name,
      email,
      rating,
      message,
      message_fr, // Save French version
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    throw error;
  }
};
