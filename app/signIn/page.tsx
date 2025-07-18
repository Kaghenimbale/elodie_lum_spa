"use client";

import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { useState, FormEvent } from "react";
import {
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const Page = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // ✅ First check what methods are available for this email
      const methods = await fetchSignInMethodsForEmail(auth, data.email);

      if (methods.includes("google.com") && !methods.includes("password")) {
        alert(
          "This email is registered using Google. Please use 'Sign in with Google'."
        );
        return;
      }

      // ✅ Otherwise, proceed with email/password login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // console.log("Logged in:", userCredential.user.email);
      onAuthStateChanged(auth, (user) => {
        if (user?.email === "kaghenimbale@gmail.com") {
          router.push("/admin");
        } else {
          router.push("/userProfile");
        }
      });
    } catch (error: any) {
      console.error("Login error:", error.message);
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google user logged in:", user.email);
      router.push("/userProfile");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Failed to sign in with Google");
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-slate-100 shadow-black shadow-sm p-6"
      >
        <div className="w-[100%] flex justify-center">
          <div className="bg-slate-200 shadow-black shadow-sm w-[4rem] h-[4rem] flex items-center justify-center rounded-full">
            <BiUser className="text-[3rem]" />
          </div>
        </div>

        <h2 className="text-[1.8rem] md:text-[2rem] font-bold">
          Login to your account
        </h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="p-4 md:w-[25rem] border border-gray-400"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="mail@example.com"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            className="p-4 md:w-[25rem] border border-gray-400"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white text-[0.9rem] bg-cyan-800 shadow-sm shadow-cyan-950 hover:bg-cyan-700 transition-all duration-300 ease-in-out px-4 py-2"
        >
          Login Now
        </button>

        {/* Google Login Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded shadow hover:shadow-md transition duration-200"
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>
        </div>

        <span className="flex gap-2">
          If you don't have an account, please
          <Link href="/signUp" className="text-blue-700 underline">
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Page;
