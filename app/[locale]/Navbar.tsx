"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { Dialog } from "@headlessui/react";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ClipLoader from "react-spinners/ClipLoader";
import { useLocale } from "next-intl";

const Navbar = () => {
  const locale = useLocale();

  const commonLinks1 = [
    { key: "home", en: "HOME", fr: "ACCUEIL" },
    { key: "about_us", en: "ABOUT US", fr: "À PROPOS" },
    { key: "services", en: "SERVICES", fr: "SERVICES" },
    { key: "contact", en: "CONTACT", fr: "CONTACT" },
  ];

  const userLinks1 = [
    { key: "userProfile", en: "User Profile", fr: "Profil Utilisateur" },
  ];

  const adminLinks1 = [
    { key: "admin", en: "Admin", fr: "Admin" },
    { key: "manage-services", en: "Manage Services", fr: "Gérer les Services" },
  ];

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const userModalRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userModalRef.current &&
        !userModalRef.current.contains(event.target as Node)
      ) {
        setShowUserModal(false);
      }
    };
    if (showUserModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserModal]);

  const handleLogout = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await signOut(auth);
      setMessage("Logged out successfully.");
      router.push("/signIn");
    } catch (error: any) {
      console.error("Logout error:", error.message);
      setMessage("Error logging out. Please try again.");
    } finally {
      setLoading(false);
      setShowUserModal(false);
    }
  };

  const isLoggedIn = !!user;
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const navlinks1 = [
    ...commonLinks1,
    ...(authReady && isLoggedIn ? (isAdmin ? adminLinks1 : userLinks1) : []),
  ];

  return (
    <>
      <nav className="bg-orange-50 fixed top-0 left-0 right-0 z-50 shadow-md px-5 md:px-10 py-3 h-[6.5rem]">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <Link href={`/${locale}`}>
            <Image
              width={100}
              height={40}
              src="/logo.png"
              priority
              alt="EBS logo"
            />
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-6 xl:gap-12 items-center">
              {navlinks1.map((navlink) => (
                <li key={navlink.key}>
                  <Link
                    href={`/${locale}${navlink.key === "home" ? "" : "/" + navlink.key}`}
                    prefetch
                    className="text-gray-800 hover:text-cyan-800 transition-colors font-medium"
                  >
                    {locale === "fr" ? navlink.fr : navlink.en}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language Switcher Desktop */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* User profile (desktop) */}
            {authReady && user && (
              <div className="hidden md:flex items-center gap-3 relative">
                <button
                  onClick={() => setShowUserModal(!showUserModal)}
                  aria-label="User menu"
                >
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="Profile"
                      width={35}
                      height={35}
                      className="rounded-full border border-gray-300"
                      priority
                    />
                  ) : (
                    <span className="text-2xl font-bold rounded-full flex items-center justify-center w-[3rem] h-[3rem] bg-cyan-800 text-white">
                      {user.email![0].toUpperCase()}
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* Connexion Button (desktop) */}
            {authReady && !user && (
              <Link
                href="/signIn"
                prefetch
                className="text-white hidden md:block bg-cyan-800 hover:bg-cyan-700 transition px-5 py-2 rounded-md font-medium"
              >
                Connexion
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden"
              aria-label="Open menu"
            >
              <MdMenu className="text-4xl text-black" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          className="md:hidden"
        >
          <div className="fixed inset-0 bg-white/90 backdrop-blur-xl flex items-center justify-center px-6 z-50">
            <Dialog.Panel className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-xl p-6 relative">
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-700"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <IoCloseCircle className="text-3xl hover:text-red-600 transition" />
              </button>

              <nav className="flex flex-col items-center gap-6 mt-10">
                {navlinks1.map((navlink) => (
                  <Link
                    key={navlink.key}
                    href={`/${locale}${navlink.key === "home" ? "" : "/" + navlink.key}`}
                    prefetch
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-gray-800 hover:text-cyan-800 transition"
                  >
                    {locale === "fr" ? navlink.fr : navlink.en}
                  </Link>
                ))}

                {authReady && user ? (
                  <>
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt="Profile"
                        width={50}
                        height={50}
                        className="rounded-full border border-gray-300"
                        priority
                      />
                    ) : (
                      <span className="text-2xl font-bold rounded-full flex items-center justify-center w-[3rem] h-[3rem] bg-cyan-800 text-white">
                        {user.email![0].toUpperCase()}
                      </span>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                      disabled={loading}
                      className={`w-full text-white bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? (
                        <ClipLoader size={18} color="#fff" />
                      ) : (
                        "Logout"
                      )}
                    </button>
                  </>
                ) : (
                  <Link
                    href={`/${locale}/signIn`}
                    onClick={() => setOpen(false)}
                    prefetch
                    className="bg-cyan-800 hover:bg-cyan-700 text-white px-4 py-2 rounded transition"
                  >
                    Connexion
                  </Link>
                )}
                <LanguageSwitcher />
              </nav>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Toast */}
        {message && (
          <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
            {message}
          </div>
        )}
      </nav>

      {/* User Modal Desktop */}
      {showUserModal && (
        <div
          ref={userModalRef}
          className="fixed top-20 right-4 bg-white shadow-lg rounded-lg p-4 w-64 max-h-60 overflow-auto border z-50"
        >
          <div className="flex justify-center mb-2">
            {user?.photoURL ? (
              <Image
                src={user.photoURL}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full border border-gray-300"
                priority
              />
            ) : (
              <span className="text-2xl font-bold rounded-full flex items-center justify-center w-[3rem] h-[3rem] bg-cyan-800 text-white">
                {user?.email![0].toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex h-[7px] w-[7px] rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="text-sm text-gray-800 font-medium">Connected</span>
          </div>
          <p className="font-semibold text-gray-800 truncate">
            {user?.displayName || user?.email}
          </p>
          <p className="text-sm text-gray-500 mt-1 truncate">{user?.email}</p>

          <button
            onClick={handleLogout}
            disabled={loading}
            className={`mt-4 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {loading ? <ClipLoader size={18} color="#fff" /> : "Logout"}
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
