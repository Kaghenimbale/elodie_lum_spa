"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../public/logo.png";
import Link from "next/link";

const Navbar = () => {
  const [scrollData, setScrollData] = useState(Number);
  const navlinks = ["HOME", "ABOUT US", "BLOG", "CONTACT"];

  useEffect(() => {
    const handleScroll = () => {
      setScrollData(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`flex justify-center bg-orange-50 transition-color duration-1000 fixed w-[100%] z-50 ${
        scrollData >= 750
          ? ""
          : "bg-transparent text-white transition-color duration-1000 ease-in-out"
      }`}
    >
      <div className="flex justify-between items-center w-[95vw] mx-auto">
        <div>
          <Link href="/">
            <Image width={150} height={0} src={logo} alt="EBS logo" />
          </Link>
        </div>
        <div className="flex gap-5">
          <ul className="flex gap-10 items-center">
            {navlinks.map((navlink) => {
              return (
                <li key={navlink}>
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
          </ul>
          <button
            type="button"
            className="text-white bg-cyan-900 hover:bg-cyan-700 transition-all duration-300 ease-in-out"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
