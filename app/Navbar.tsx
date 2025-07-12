"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../public/logo.png";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";

const Navbar = () => {
  const navlinks = ["HOME", "ABOUT US", "SERVICES", "CONTACT"];
  const [open, setOpen] = useState(false);

  const handleMenuToggle = () => {
    setOpen((prev) => !prev);
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="flex bg-orange-50 transition-colors duration-500 fixed left-0 right-0 top-0 z-50 px-5 md:px-10">
      <div className="flex justify-between items-center w-full">
        <div>
          <Link href="/">
            <Image width={150} height={0} src={logo} alt="EBS logo" />
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-10">
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
                  {navlink}
                </Link>
              </li>
            ))}
          </ul>

          {/* Book Now button for desktop */}
          <Link
            href="/signUp"
            className="text-white hidden md:block bg-cyan-900 hover:bg-cyan-700 transition duration-300 px-4 py-2"
          >
            CONNEXION
          </Link>

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
