"use client";
import Image from "next/image";
import { useState } from "react";
import logo from "../public/logo.png";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";

const Navbar = () => {
  const navlinks = ["HOME", "ABOUT US", "BLOG", "CONTACT"];
  const [open, setOpen] = useState(true);

  const handleMenu = () => {
    setOpen((prev) => !prev);
  };
  return (
    <nav
      className={`flex bg-orange-50 transition-color duration-500 fixed left-0 right-0 top-0 z-50 px-5 md:px-10`}
    >
      <div className="flex justify-between items-center w-full">
        <div>
          <Link href="/">
            <Image width={150} height={0} src={logo} alt="EBS logo" />
          </Link>
        </div>
        <div className="flex gap-5">
          <ul
            className={`md:flex flex-row gap-10 items-center ${
              open
                ? "backdrop-blur-3xl text-cyan-900 flex flex-col items-center justify-center fixed left-0 top-0 w-[100vw] h-[100vh]"
                : "hidden lg:flex gap-4"
            }`}
          >
            {navlinks.map((navlink) => {
              return (
                <li key={navlink} onClick={() => setOpen(false)}>
                  <Link
                    href={
                      navlink.toLocaleLowerCase() === "home"
                        ? "/"
                        : navlink.toLocaleLowerCase() === "about us"
                        ? "about_us"
                        : navlink.toLocaleLowerCase()
                    }
                  >
                    {navlink}
                  </Link>
                </li>
              );
            })}
            <button
              type="button"
              className="top-6 right-6 absolute md:hidden"
              onClick={() => setOpen(false)}
            >
              <IoCloseCircle className="text-3xl text-red-600" />
            </button>
          </ul>
          <button
            type="button"
            className="text-white hidden md:block bg-cyan-900 hover:bg-cyan-700 transition-all duration-300 ease-in-out"
          >
            BOOK NOW
          </button>
          <button
            onClick={() => setOpen(true)}
            type="button"
            className="md:hidden w-0"
          >
            <MdMenu className="text-4xl text-black" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
