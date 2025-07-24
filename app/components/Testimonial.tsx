"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import { ClipLoader } from "react-spinners";
import TestimonialForm from "./TestimonialForm";
import { IoClose } from "react-icons/io5";

type Testimonial = {
  id: string;
  name: string;
  message: string;
  rating: number;
  createdAt: any;
};

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(
          collection(db, "testimonials"),
          orderBy("createdAt", "desc"),
          limit(10)
        );
        const snapshot = await getDocs(q);
        const testimonialsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Testimonial, "id">),
        }));
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error("Failed to load testimonials", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-auto flex items-center justify-center">
        <ClipLoader color="#164E63" size={50} />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="max-w-4xl mx-auto p-4 md:p-10 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <Image
            src="/apostrophe.png"
            alt="testimonial"
            width={150}
            height={150}
            loading="lazy"
          />
          <h2 className="text-3xl font-bold mt-4 text-center">
            What Our Customers Say About Us
          </h2>
        </div>

        {testimonials.length === 0 ? (
          <p className="text-center mt-4">No testimonials yet.</p>
        ) : (
          <div className="w-full flex flex-col gap-6">
            {testimonials.map(({ id, name, message, rating }) => (
              <div
                key={id}
                className="flex flex-col items-center gap-3 border rounded-lg p-4 shadow-md"
              >
                <p className="text-gray-700 text-center">{message}</p>
                <div className="flex gap-2 items-center">
                  <div className="flex space-x-1">
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
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setDisplay(true);
            document.body.style.overflow = "hidden";
          }}
          className="bg-cyan-700 hover:bg-cyan-600 text-white px-4 py-2 rounded"
        >
          Rate Our Service
        </button>
      </div>

      {display && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-3xl bg-black/30">
          <button
            type="button"
            onClick={() => {
              setDisplay(false);
              document.body.style.overflow = "";
            }}
            className="absolute right-10 top-10 bg-cyan-700 hover:bg-cyan-600 text-white px-4 py-2 rounded"
          >
            <IoClose size={24} />
          </button>
          <TestimonialForm />
        </div>
      )}
    </Fragment>
  );
};

export default Testimonial;
