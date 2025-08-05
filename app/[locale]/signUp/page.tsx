"use client";

import Link from "next/link";
import { useEffect, useState, FormEvent } from "react";
import { BiUser } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase/config";
import { createUserInFirestore } from "@/lib/userService";

const Page = () => {
  const router = useRouter();
  const t = useTranslations("signUp");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
    referralCode: "",
  });

  // Force sign out on mount
  useEffect(() => {
    signOut(auth);
    localStorage.clear();
  }, []);

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
        setLoading(false);
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
      console.error("Error creating user:", error);
      setErrorMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
      setData({ email: "", password: "", referralCode: "" });
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      setLoading(true);
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
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 md:px-12 lg:px-24 bg-gray-50">
      {/* Left side: Welcome Text */}
      <div className="md:w-1/2 max-w-md mb-10 md:mb-0 md:pr-12">
        <h1 className="text-[2.25rem] font-extrabold text-cyan-800 mb-4">
          {t("signupSectionTitle")}
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          {t("signupSectionDescription")}
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>{t("signupFeature1")}</li>
          <li>{t("signupFeature2")}</li>
          <li>{t("signupFeature3")}</li>
          <li>{t("signupFeature4")}</li>
        </ul>
      </div>

      {/* Right side: Signup Form */}
      <div className="md:w-1/2 max-w-md w-full">
        <form
          onSubmit={handleSubmit}
          className="p-6 border rounded-lg shadow-lg bg-white space-y-4"
        >
          <div className="w-full flex justify-center">
            <div className="bg-slate-100 shadow-md w-16 h-16 flex items-center justify-center rounded-full hover:shadow-lg transition-shadow duration-300">
              <BiUser className="text-3xl text-slate-700" />
            </div>
          </div>

          <h2 className="text-[1.8rem] md:text-[2rem] font-bold text-center">
            {t("title")}
          </h2>

          {errorMessage && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm">{successMessage}</p>
          )}

          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email">{t("emailLabel")}</label>
            <input
              className="w-full p-2 border rounded border-gray-400"
              type="email"
              placeholder={t("emailPlaceholder")}
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="password" className="font-medium">
              {t("passwordLabel")}
            </label>
            <div className="relative w-full">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("passwordPlaceholder")}
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

          {/* Referral Code */}
          <div className="flex flex-col gap-2">
            <label htmlFor="referralCode">{t("referralLabel")}</label>
            <input
              className="w-full p-2 border rounded border-gray-400"
              type="text"
              placeholder={t("referralPlaceholder")}
              name="referralCode"
              value={data.referralCode || ""}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white text-[0.9rem] bg-cyan-800 shadow-sm shadow-cyan-950 hover:bg-cyan-700 transition-all duration-300 ease-in-out px-4 py-2 flex justify-center items-center gap-2 rounded ${
              loading ? "cursor-not-allowed opacity-80" : ""
            }`}
          >
            {loading ? (
              <>
                <ClipLoader size={20} color="#fff" />
                <span className="sr-only">{t("loading")}</span>
              </>
            ) : (
              t("submit")
            )}
          </button>

          {/* Google Login */}
          <div className="flex justify-center top-7">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded shadow hover:shadow-md transition duration-200"
            >
              <FcGoogle className="text-2xl" />
              {t("googleLogin")}
            </button>
          </div>

          <span className="flex gap-2 justify-center">
            {t("alreadyAccount")}
            <Link href="/signIn" prefetch className="text-blue-700 underline">
              {t("signInLink")}
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Page;
