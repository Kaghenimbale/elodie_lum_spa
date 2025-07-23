"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { db } from "@/firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import TestimonialForm from "./TestimonialForm";
import Link from "next/link";
import useScrollLock from "@/hooks/useScrollLock";
import { IoClose } from "react-icons/io5";

type Testimonial = {
  id: string;
  name: string;
  message: string;
  rating: number;
  createdAt: any; // Firestore timestamp
};

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "testimonials"),
      orderBy("createdAt", "desc")
    );

    // Subscribe to realtime updates
    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const testimonialsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Testimonial, "id">),
        }));

        setTestimonials(testimonialsData);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <p className="w-[100vw] h-[100vh] flex items-center justify-center">
        <ClipLoader color="#164E63" size={50} />
      </p>
    );

  if (testimonials.length === 0)
    return <p className="text-center mt-4">No testimonials yet.</p>;
  return (
    <Fragment>
      <div className="max-w-4xl mx-auto p-4 md:p-10 space-y-2 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <Image
            src="/apostrophe.png"
            alt="testimonial"
            width={150}
            height={0}
          />
          <h2 className="text-3xl font-bold mb-6 text-center">
            What Our customer say About Us
          </h2>
        </div>

        {testimonials.map(({ id, name, message, rating }) => (
          <div key={id} className="flex flex-col items-center gap-5">
            <p className="text-gray-700 text-center">{message}</p>
            <div className="flex gap-2">
              <div className="ml-auto flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-xl ${
                      rating >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                    aria-hidden="true"
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="font-semibold text-lg">By {name}</p>
            </div>
          </div>
        ))}

        <>
          <button
            type="button"
            onClick={() => setDisplay(true)}
            className="bg-cyan-700 hover:bg-cyan-600 text-white px-4 py-2 rounded"
          >
            Rate Our Service
          </button>

          {display && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-3xl bg-black/30">
              <button
                type="button"
                onClick={() => setDisplay(false)}
                className="absolute right-10 top-10 bg-cyan-700 hover:bg-cyan-600 text-white px-4 py-2 rounded"
              >
                <IoClose />
              </button>
              <TestimonialForm />
            </div>
          )}
        </>
      </div>
    </Fragment>
  );
};

export default Testimonial;
