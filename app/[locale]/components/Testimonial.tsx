"use client";

import Image from "next/image";
import { useEffect, useState, Fragment } from "react";
import { db, auth } from "@/firebase/config";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { ClipLoader } from "react-spinners";
import TestimonialForm from "./TestimonialForm";
import { IoClose } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch testimonials
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

  // Check authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      setIsAdmin(currentUser?.email === adminEmail);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
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

        {loading ? (
          <ClipLoader color="#164E63" />
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

        {/* Show only to admin */}
        {isAdmin && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="bg-cyan-700 hover:bg-cyan-600 text-white px-4 py-2 rounded"
          >
            Rate Our Service
          </button>
        )}
      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="relative w-full max-w-xl rounded-lg bg-white p-6 shadow-xl">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                  <IoClose size={24} />
                </button>
                <TestimonialForm />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Testimonial;
