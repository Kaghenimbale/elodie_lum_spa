"use client";

import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
    setData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-slate-100 shadow-sm shadow-slate-100 p-4"
      >
        <h2 className="text-[1.8rem] md:text-[2rem] font-bold">Sign In</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email:</label>
          <input
            className="p-4 md:w-[25rem] border-[1px] border-gray-400"
            type="email"
            placeholder="mail@example.com"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password:</label>
          <input
            className="p-4 md:w-[25rem] border-[1px] border-gray-400"
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out"
        >
          Sign In
        </button>
        <span className="flex gap-2">
          If you don't have an account, Please
          <Link href="/signUp" className="text-blue-700 underline">
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default page;
