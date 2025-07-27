"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

const Presentation = () => {
  const t = useTranslations("Presentation");
  return (
    <section className="relative h-[85vh] mt-16 bg-[url('/bg3.webp')] bg-cover bg-center flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content */}
      <div className="relative z-10 px-4 w-full max-w-6xl flex flex-col items-start gap-6 text-white text-wrap break-words">
        <h1 className="text-[1.5rem] md:text-[2.5rem] font-bold leading-snug break-words">
          {t("title")}
        </h1>
        <Link
          href="/about_us"
          className="px-6 py-3 rounded bg-white text-cyan-900 hover:bg-cyan-900 hover:text-white transition-all duration-300"
        >
          {t("link")}
        </Link>
      </div>
    </section>
  );
};

export default Presentation;
