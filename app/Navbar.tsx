import Image from "next/image";
import React from "react";
import logo from "../public/logo.png";
import Link from "next/link";

const Navbar = () => {
  const navlinks = ["HOME", "ABOUT US", "BLOG", "CONTACT"];
  return (
    <div className="flex justify-center bg-gray-100">
      <div className="flex justify-between items-center w-[95vw] mx-auto">
        <div>
          <Link href="/">
            <Image height={50} width={200} src={logo} alt="EBS logo" />
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
                    className="text-cyan-900"
                  >
                    {navlink}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            className="font-bold bg-blue-300 text-white hover:bg-cyan-900"
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
