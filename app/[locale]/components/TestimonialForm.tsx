"use client";

import { useState, FormEvent, useEffect } from "react";
import { submitTestimonial } from "@/lib/testimonialService";
import { auth } from "@/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import ClipLoader from "react-spinners/ClipLoader";

const TestimonialForm = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [messageFr, setMessageFr] = useState(""); // French message
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.displayName) {
        setName(currentUser.displayName);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!user) {
      setErrorMessage("You must be logged in to submit a testimonial.");
      return;
    }

    if (!message.trim() || !messageFr.trim() || rating === 0 || !name.trim()) {
      setErrorMessage(
        "Please provide name, rating, and both English and French messages."
      );
      return;
    }

    setLoading(true);

    try {
      await submitTestimonial({
        userId: user.uid,
        name: name.trim(),
        email: user.email || "",
        rating,
        message: message.trim(),
        message_fr: messageFr.trim(),
      });

      setSuccessMessage("Testimonial submitted successfully!");
      setMessage("");
      setMessageFr("");
      setRating(0);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to submit testimonial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold">Submit a Testimonial</h2>

      {successMessage && (
        <p className="text-green-600 font-semibold">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-600 font-semibold">{errorMessage}</p>
      )}

      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
          placeholder="Your name"
        />
      </div>

      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-2xl w-fit ${
              rating >= star ? "text-yellow-500" : "text-gray-300"
            }`}
            aria-label={`${star} Star`}
          >
            ★
          </button>
        ))}
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 font-medium">
          Testimonial in English
        </label>
        <textarea
          id="message"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter the testimonial in English"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          required
        />
      </div>

      <div>
        <label htmlFor="messageFr" className="block mb-1 font-medium">
          Témoignage en Français
        </label>
        <textarea
          id="messageFr"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Entrez le témoignage en français"
          value={messageFr}
          onChange={(e) => setMessageFr(e.target.value)}
          rows={3}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-cyan-700 hover:bg-cyan-600 text-white px-4 py-2 rounded disabled:opacity-50 flex items-center justify-center"
      >
        {loading ? (
          <>
            <ClipLoader size={20} color="white" />
            <span className="ml-2">Submitting...</span>
          </>
        ) : (
          "Submit Testimonial"
        )}
      </button>
    </form>
  );
};

export default TestimonialForm;
