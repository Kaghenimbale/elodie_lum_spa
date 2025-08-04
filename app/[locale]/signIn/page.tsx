"use client";

import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { useState, FormEvent } from "react";
import {
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { ClipLoader } from "react-spinners";
import { useTranslations } from "next-intl";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "info";
    text: string;
  } | null>(null);

  const t = useTranslations("signIn");

  // New state for password reset
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setMessage(null); // clear message on input
    setResetError(null);
    setResetEmailSent(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setResetError(null);
    setResetEmailSent(false);

    try {
      const methods = await fetchSignInMethodsForEmail(auth, data.email);

      if (methods.includes("google.com") && !methods.includes("password")) {
        setMessage({
          type: "info",
          text: "This email is registered using Google. Please use 'Sign in with Google'.",
        });
        return;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      if (user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.push("/admin");
      } else {
        router.push("/userProfile");
      }
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage(null);
    setResetError(null);
    setResetEmailSent(false);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google user logged in:", user.email);
      router.push("/userProfile");
    } catch (error) {
      setMessage({ type: "error", text: "Failed to sign in with Google" });
    } finally {
      setLoading(false);
    }
  };

  // New handler for password reset
  const handlePasswordReset = async () => {
    setResetError(null);
    setResetEmailSent(false);

    if (!data.email) {
      setResetError("Please enter your email address first.");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, data.email);
      setResetEmailSent(true);
    } catch (error: any) {
      setResetError(error.message || "Failed to send password reset email.");
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

        <h2 className="text-[1.8rem] md:text-[2rem] font-bold">{t("title")}</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">{t("emailLabel")}</label>
          <input
            className="w-full p-2 border rounded border-gray-400"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder={t("emailPlaceholder")}
            required
          />
        </div>

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

        <div className="flex justify-end mt-1 mb-4">
          <button
            type="button"
            onClick={handlePasswordReset}
            disabled={loading}
            className="text-sm text-blue-600 hover:underline focus:outline-none"
          >
            {t("forgotPassword")}
          </button>
        </div>

        {message && (
          <div
            className={`p-2 text-sm rounded ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {message.text === "error" ? t("errorMessage") : t("warningMessage")}
          </div>
        )}

        {resetEmailSent && (
          <div className="p-2 text-sm rounded bg-green-100 text-green-700">
            {t("resetSent")}
          </div>
        )}

        {resetError && (
          <div className="p-2 text-sm rounded bg-red-100 text-red-700">
            {t("resetError")}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white text-[0.9rem] bg-cyan-800 shadow-sm shadow-cyan-950 hover:bg-cyan-700 transition-all duration-300 ease-in-out px-4 py-2 flex justify-center items-center gap-2 rounded ${
            loading ? "cursor-not-allowed opacity-80" : ""
          }`}
        >
          {loading ? (
            <>
              <ClipLoader size={18} color="#fff" />
              <span className="sr-only">{t("loading")}</span>
            </>
          ) : (
            t("loginNow")
          )}
        </button>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex items-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded shadow hover:shadow-md transition duration-200"
          >
            <FcGoogle className="text-2xl" />
            {t("googleSignIn")}
          </button>
        </div>

        <span className="flex gap-2 justify-center">
          {t("noAccount")}
          <Link href="/signUp" prefetch className="text-blue-700 underline">
            {t("signUp")}
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Page;
