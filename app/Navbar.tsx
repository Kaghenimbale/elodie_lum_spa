"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";

const Navbar = () => {
  // const navlinks = ["HOME", "ABOUT US", "SERVICES", "CONTACT"];
  const commonLinks = ["HOME", "ABOUT US", "SERVICES", "CONTACT"];
  const userLinks = ["userProfile"];
  const adminLinks = ["admin", "manage-services"];
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  const isLoggedIn = !!user;
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const navlinks = [
    ...commonLinks,
    ...(isLoggedIn ? (isAdmin ? adminLinks : userLinks) : []),
  ];

  const handleMenuToggle = () => {
    setOpen((prev) => !prev);
  };

  // Listen for Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    setHasMounted(true);
    return () => unsubscribe();
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
      router.push("/signUp");
    } catch (error: any) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <nav className="flex bg-orange-50 transition-colors duration-500 fixed left-0 right-0 top-0 z-50 px-5 md:px-10 py-3">
      <div className="flex justify-between items-center w-full">
        <Link href="/">
          <Image width={150} height={0} src="/logo.png" alt="EBS logo" />
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          {/* Desktop Links */}
          <ul className="hidden md:flex gap-4 xl:gap-14 items-center">
            {navlinks.map((navlink) => (
              <li key={navlink}>
                <Link
                  href={
                    navlink.toLowerCase() === "home"
                      ? "/"
                      : navlink.toLowerCase().replace(" ", "_")
                  }
                >
                  {navlink === "admin" ||
                  navlink === "userProfile" ||
                  navlink === "manage-services"
                    ? navlink.toLocaleUpperCase()
                    : navlink}
                </Link>
              </li>
            ))}
          </ul>

          {/* Authenticated user display */}
          {hasMounted && user && (
            <div className="hidden md:flex items-center gap-3">
              {/* Profile Picture if available */}
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  width={35}
                  height={35}
                  className="rounded-full border border-gray-300"
                />
              ) : (
                <span className="text-2xl font-bold rounded-full flex items-center justify-center w-[3rem] h-[3rem] bg-cyan-800 text-white">
                  {user.email![0].toLocaleUpperCase()}
                </span>
              )}

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
              >
                Logout
              </button>
            </div>
          )}

          {/* Connexion button if not logged in */}
          {!user && (
            <Link
              href="/signUp"
              className="text-white hidden md:block bg-cyan-900 hover:bg-cyan-700 transition duration-300 px-4 py-2 rounded"
            >
              CONNEXION
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            onClick={handleMenuToggle}
            type="button"
            className="md:hidden"
          >
            <MdMenu className="text-4xl text-black" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 bg-white backdrop-blur-3xl z-50 flex flex-col items-center justify-center gap-8 text-cyan-900">
          {navlinks.map((navlink) => (
            <Link
              key={navlink}
              href={
                navlink.toLowerCase() === "home"
                  ? "/"
                  : navlink.toLowerCase().replace(" ", "_")
              }
              onClick={() => setOpen(false)}
              className="text-xl"
            >
              {navlink}
            </Link>
          ))}

          {/* Auth info in mobile menu */}
          {hasMounted && user ? (
            <>
              {/* Profile Picture */}
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  width={50}
                  height={50}
                  className="rounded-full border border-gray-300"
                />
              ) : (
                <span className="text-center text-2xl font-bold rounded-full flex items-center justify-center w-[3rem] h-[3rem] bg-cyan-800 text-white">
                  {user.email![0].toLocaleUpperCase()}
                </span>
              )}

              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
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
          >
            <IoCloseCircle className="text-3xl" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
function useAuthContext(): { userlogged: any; isAdmin: any } {
  throw new Error("Function not implemented.");
}
