"use client";

import Link from "next/link";
import Form from "./Letter/Form";
import {
  FaCcMastercard,
  FaCcPaypal,
  FaCcStripe,
  FaCcVisa,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const date = new Date();

  const handleStripePayment = async () => {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <footer className="bg-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10">
        {/* Email Signup */}
        <div className="flex flex-col gap-6 max-w-3xl w-full text-center items-center">
          <h2 className="text-[1.5rem] md:text-[1.8rem] font-bold">
            Join our email list for exclusive offers and the latest news.
          </h2>
          <Form />
        </div>

        {/* Divider */}
        <div className="w-full max-w-3xl h-[1px] bg-gray-400" />

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 max-w-7xl w-full justify-items-center md:justify-items-start text-center md:text-left">
          {/* About */}
          <div className="flex flex-col gap-5 max-w-xs">
            <h3 className="text-xl font-bold">ELODIA BEAUTY & SPA</h3>
            <p className="font-thin">
              Explore luxury treatments designed to enhance your natural beauty
              and boost your confidence.
            </p>
            <Link
              href="/signIn"
              className="inline-block w-fit bg-cyan-800 text-white text-sm px-5 py-2 rounded hover:bg-cyan-700 transition"
            >
              SIGN IN
            </Link>
          </div>

          {/* Important Links */}
          <div className="flex flex-col gap-3 max-w-xs">
            <h3 className="text-xl font-bold">Important Links</h3>
            <ul className="space-y-2 list-none">
              {["Services", "Contact", "About_Us"].map((item) => (
                <li key={item}>
                  <Link
                    href={item.toLocaleLowerCase()}
                    className="font-thin hover:underline hover:opacity-80 transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4 max-w-xs font-thin">
            <h3 className="text-xl font-bold text-center md:text-left">
              Contact Us
            </h3>
            <address className="not-italic whitespace-pre-line">
              598 Concession str, Hamilton, <br />
              Ontario, L8V 1B3, Canada
            </address>
            <Link
              href="mailto:Elodiabspa@gmail.com"
              className="hover:underline"
            >
              Elodiabspa@gmail.com
            </Link>
            <Link href="tel:+14376650194" className="hover:underline">
              Phone: +1 (437) 665-0194
            </Link>
            <ul className="flex gap-6 mt-4 justify-center md:justify-start">
              <li>
                <Link
                  href="https://www.instagram.com/elodia_beauty_and_spa"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-900 hover:text-cyan-700 transition text-2xl"
                >
                  <FaInstagram />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.facebook.com/profile.php?id=61567223621147"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-900 hover:text-cyan-700 transition text-2xl"
                >
                  <FaFacebook />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.tiktok.com/@elodiabeautyandspa"
                  aria-label="TikTok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-900 hover:text-cyan-700 transition text-2xl"
                >
                  <FaTiktok />
                </Link>
              </li>
              <li>
                <Link
                  href="https://"
                  aria-label="whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-900 hover:text-cyan-700 transition text-2xl"
                >
                  <FaWhatsapp />
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours + Payments */}
          <div className="flex flex-col gap-6 max-w-xs">
            <h3 className="text-xl font-bold text-center md:text-left">
              Opening Hours
            </h3>
            <div className="space-y-2 font-thin">
              <div className="flex justify-between">
                <span>Monday to Tuesday</span>
                <span>10 AM - 7 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Wednesday to Thursday</span>
                <span>10 AM - 6 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>2 AM - 6 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>2 AM - 6 PM</span>
              </div>
            </div>

            <ul className="flex gap-4 justify-center md:justify-start mt-4">
              {[
                {
                  label: "Visa",
                  icon: <FaCcVisa />,
                  onClick: handleStripePayment, // Add handlers if needed
                },
                {
                  label: "PayPal",
                  icon: <FaCcPaypal />,
                  onClick: () => {}, // Add handlers if needed
                },
                {
                  label: "Stripe",
                  icon: <FaCcStripe />,
                  onClick: handleStripePayment,
                },
                {
                  label: "Mastercard",
                  icon: <FaCcMastercard />,
                  onClick: () => {}, // Add handlers if needed
                },
              ].map(({ label, icon, onClick }) => (
                <li key={label}>
                  <button
                    aria-label={`Pay with ${label}`}
                    onClick={onClick}
                    className="p-1 rounded hover:bg-cyan-100 transition"
                    style={{
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    type="button"
                  >
                    <span
                      className="text-cyan-950 text-xl"
                      style={{ width: 20, height: 20 }}
                    >
                      {icon}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full max-w-3xl h-[1px] bg-gray-400" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row gap-2 justify-center text-center font-thin text-sm text-gray-600">
          <span>&copy;{date.getFullYear()}</span>
          <Link href="/">elodiabeauty&spa</Link>
          <Link href="/policies/privacy-policy">Privacy policy</Link>
          <Link href="/policies/terms-of-service">Terms of service</Link>
          <Link href="/policies/refund-policy">Refund policy</Link>
          <Link href="/contact">Contact information</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
