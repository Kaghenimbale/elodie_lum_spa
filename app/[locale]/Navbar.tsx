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

const Navbar = () => {
  const commonLinks = ["HOME", "ABOUT US", "SERVICES", "CONTACT"];
  const userLinks = ["userProfile"];
  const adminLinks = ["admin", "manage-services"];

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

  // Close user modal when clicking outside
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
      router.push("/signUp");
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

  const navlinks = [
    ...commonLinks,
    ...(authReady && isLoggedIn ? (isAdmin ? adminLinks : userLinks) : []),
  ];

  return (
    <>
      <nav className="flex bg-orange-50 transition-colors duration-500 fixed left-0 right-0 top-0 z-50 px-5 md:px-10 py-3">
        <div className="flex justify-between items-center w-full">
          <Link href="/">
            <Image
              width={140}
              height={0}
              src="/logo.png"
              priority
              alt="EBS logo"
            />
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop nav */}
            <ul className="hidden md:flex gap-4 xl:gap-14 items-center">
              {navlinks.map((navlink) => (
                <li key={navlink}>
                  <Link
                    href={
                      navlink.toLowerCase() === "home"
                        ? "/"
                        : "/" + navlink.toLowerCase().replace(" ", "_")
                    }
                  >
                    {["admin", "userProfile", "manage-services"].includes(
                      navlink
                    )
                      ? navlink.toUpperCase()
                      : navlink}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Authenticated user (Desktop) */}
            {authReady && user && (
              <div className="hidden md:flex items-center gap-3 relative">
                <button
                  onClick={() => setShowUserModal(!showUserModal)}
                  aria-label="User menu"
                  type="button"
                >
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="Profile"
                      width={35}
                      height={35}
                      priority
                      className="rounded-full border border-gray-300"
                    />
                  ) : (
                    <span className="text-2xl font-bold rounded-full flex items-center justify-center w-[3rem] h-[3rem] bg-cyan-800 text-white">
                      {user.email![0].toUpperCase()}
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* Connexion button */}
            {authReady && !user && (
              <Link
                href="/signUp"
                className="text-white hidden md:block bg-cyan-900 hover:bg-cyan-700 transition duration-300 px-4 py-2 rounded"
              >
                CONNEXION
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(true)}
              type="button"
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
          className="relative z-50 md:hidden"
        >
          <div className="fixed inset-0 bg-white/90 backdrop-blur-2xl flex items-center justify-center px-6">
            <Dialog.Panel className="w-full max-w-sm flex flex-col items-center gap-8">
              {navlinks.map((navlink) => (
                <Link
                  key={navlink}
                  href={
                    navlink.toLowerCase() === "home"
                      ? "/"
                      : "/" + navlink.toLowerCase().replace(" ", "_")
                  }
                  onClick={() => setOpen(false)}
                  className="text-xl font-medium"
                >
                  {navlink}
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
                    className={`flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ${
                      loading ? "cursor-not-allowed opacity-70" : ""
                    }`}
                  >
                    {loading ? <ClipLoader size={18} color="#fff" /> : "Logout"}
                  </button>
                </>
              ) : (
                <Link
                  href="/signUp"
                  onClick={() => setOpen(false)}
                  className="bg-cyan-900 text-white px-4 py-2 rounded hover:bg-cyan-700"
                >
                  CONNEXION
                </Link>
              )}

              <button
                type="button"
                className="absolute top-6 right-6"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <IoCloseCircle className="text-3xl" />
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Toast Message */}
        {message && (
          <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
            {message}
          </div>
        )}

        <LanguageSwitcher />
      </nav>

      {/* User modal OUTSIDE navbar */}
      {showUserModal && (
        <div
          ref={userModalRef}
          className="
            fixed
            top-16
            right-4
            bg-white
            shadow-lg
            rounded-lg
            p-4
            w-64
            max-w-[16rem]
            max-h-60
            overflow-auto
            border
            z-50
          "
        >
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
