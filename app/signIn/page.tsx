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
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-[1.8rem] md:text-[2rem] font-thin">Sign In</h2>

        <input
          className="p-4 md:w-[25rem] border-[1px] border-gray-400"
          type="email"
          placeholder="Email address"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />

        <input
          className="p-4 md:w-[25rem] border-[1px] border-gray-400"
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out"
        >
          Sign In
        </button>
        <span className="flex gap-2">
          Don't have an account ?
          <Link href="/signUp" className="text-blue-700 underline">
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default page;
