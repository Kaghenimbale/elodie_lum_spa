"use client";

import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { useState, FormEvent } from "react";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { createUserInFirestore } from "@/lib/userService";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    referralCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const methods = await fetchSignInMethodsForEmail(auth, data.email);

      if (methods.includes("google.com")) {
        alert(
          "This email is already registered with Google. Please use 'Sign in with Google'."
        );
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const referralCode = await createUserInFirestore(
        userCredential.user,
        data.referralCode || null
      );

      await fetch("/api/send-referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userCredential.user.email,
          referralCode,
        }),
      });

      // console.log("Referral code:", referralCode);

      alert("Account created successfully!");
      router.push("/userProfile");
    } catch (error: any) {
      console.error("Error creating user:", error.message);
      alert(error.message);
    }

    setData({ email: "", password: "", referralCode: "" });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // 1. Create user profile in Firestore (generates referralCode)
      const referralCode = await createUserInFirestore(
        user,
        data.referralCode || null
      );

      // 2. Send referral email to user
      await fetch("/api/send-referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          referralCode,
        }),
      });

      alert("Account created successfully!");

      // ✅ Use the user object immediately to route
      if (user.email === "kaghenimbale@gmail.com") {
        router.push("/admin");
      } else {
        router.push("/userProfile");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Failed to sign in with Google");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 border rounded-lg shadow-lg w-full max-w-md space-y-2 bg-white my-36"
      >
        <div className="w-[100%] flex justify-center top-7">
          <div className="bg-slate-200 shadow-black shadow-sm w-[4rem] h-[4rem] flex items-center justify-center rounded-full">
            <BiUser className="text-[3rem]" />
          </div>
        </div>
        <h2 className="text-[1.8rem] md:text-[2rem] font-bold">
          Create a New account
        </h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            className="w-full p-2 border rounded border-gray-400"
            type="email"
            placeholder="mail@example.com"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="password" className="font-medium">
            Password
          </label>

          <div className="relative w-full">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={data.password}
              onChange={handleChange}
              required
              className="w-full p-2 pr-10 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-gray-800"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <IoEyeOff className="text-xl" />
              ) : (
                <IoEye className="text-xl" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="referralCode">Referral Code (optional)</label>
          <input
            className="w-full p-2 border rounded border-gray-400"
            type="text"
            placeholder="Enter referral code"
            name="referralCode"
            value={data.referralCode}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="text-white text-[0.9rem] bg-cyan-800 shadow-sm shadow-cyan-950 hover:bg-cyan-700 transition-all duration-300 ease-in-out px-4 py-2"
        >
          Create account
        </button>

        <div className="flex w-fit justify-center top-7">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded shadow hover:shadow-md transition duration-200"
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>
        </div>

        <span className="flex gap-2">
          Already have an account?
          <Link href="/signIn" className="text-blue-700 underline">
            Sign In
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Page;
