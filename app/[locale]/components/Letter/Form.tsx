"use client";

import { useState } from "react";

const Form = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setMessage("Thanks for subscribing! Check your inbox.");
        setEmail("");
      } else {
        setMessage("Something went wrong. Try again.");
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <input
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 border rounded w-[300px]"
      />
      <button
        type="submit"
        className="bg-cyan-800 text-white px-6 py-2 rounded hover:bg-cyan-700"
      >
        SUBSCRIBE
      </button>
      {message && (
        <p className="text-sm text-center text-green-700">{message}</p>
      )}
    </form>
  );
};

export default Form;
