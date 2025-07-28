"use client";

import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { useState, FormEvent } from "react";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { createUserInFirestore } from "@/lib/userService";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { ClipLoader } from "react-spinners";

const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
    setErrorMessage("");
    setSuccessMessage("");

    if (data.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const methods = await fetchSignInMethodsForEmail(auth, data.email);

      if (methods.includes("google.com")) {
        setErrorMessage(
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

      setSuccessMessage("Account created successfully!");
      router.push("/userProfile");
    } catch (error: any) {
      setErrorMessage(error.message);
      console.error("Error creating user:", error.message);
    } finally {
      setLoading(false);
      setData({ email: "", password: "", referralCode: "" });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const referralCode = await createUserInFirestore(
        user,
        data.referralCode || null
      );

      await fetch("/api/send-referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          referralCode,
        }),
      });

      setSuccessMessage("Account created successfully!");

      if (user.email === "kaghenimbale@gmail.com") {
        router.push("/admin");
      } else {
        router.push("/userProfile");
      }
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      setErrorMessage("Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 border rounded-lg shadow-lg w-full max-w-md space-y-2 bg-white my-36"
      >
        <div className="w-full flex justify-center">
          <div className="bg-slate-100 shadow-md w-16 h-16 flex items-center justify-center rounded-full hover:shadow-lg transition-shadow duration-300">
            <BiUser className="text-3xl text-slate-700" />
          </div>
        </div>

        <h2 className="text-[1.8rem] md:text-[2rem] font-bold">
          Create a New account
        </h2>

        {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green-600 text-sm">{successMessage}</p>
        )}

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
          className="flex justify-center items-center gap-2 text-white text-[0.9rem] bg-cyan-800 shadow-sm shadow-cyan-950 hover:bg-cyan-700 transition-all duration-300 ease-in-out px-4 py-2"
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "Create account"}
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
