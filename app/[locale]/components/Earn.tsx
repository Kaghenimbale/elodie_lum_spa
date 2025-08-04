"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Earn = () => {
  const t = useTranslations("referAndEarn");
  const locale = useLocale();
  const benefits = t.raw("benefits") as { icon: string; text: string }[];
  return (
    <>
      <section className="relative bg-orange-50 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
          {/* Left: Text Content */}
          <div className="w-full max-w-xl">
            <h2 className="text-[2.25rem] font-bold text-gray-800 mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-700 mb-6">{t("description")}</p>

            <ul className="mb-6 space-y-3">
              {benefits.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-gray-700 font-semibold mt-1">
                    {item.icon}
                  </span>
                  <span className="text-gray-700">{item.text}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/refer-earn"
              className="inline-block text-white text-sm font-medium bg-cyan-800 px-6 py-2 rounded hover:bg-cyan-700 transition-all duration-300"
              locale={locale}
            >
              {t("button")}
            </Link>
          </div>

          {/* Right: Image */}
          <div className="relative w-full h-80 md:h-[400px]">
            <Image
              src="/refer-and-earn.jpeg"
              alt="Refer and Earn"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Earn;
