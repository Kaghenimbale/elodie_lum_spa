"use client";

import { useState, FormEvent, useEffect } from "react";
import { submitTestimonial } from "@/lib/testimonialService";
import { auth } from "@/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";

const TestimonialForm = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Get current user on mount and prefill name
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

    if (!user) {
      alert("You must be logged in to submit a testimonial.");
      return;
    }

    if (!message.trim() || rating === 0 || !name.trim()) {
      alert("Please provide your name, a rating, and a message.");
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
      });
      alert("Thank you for your testimonial!");
      setMessage("");
      setName("");
      setRating(0);
      // Optionally keep the name if you want user to reuse it
    } catch (error) {
      alert("Failed to submit testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold">Leave a Testimonial</h2>

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

      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Your testimonial message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-cyan-700 hover:bg-cyan-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Testimonial"}
      </button>
    </form>
  );
};

export default TestimonialForm;
