"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Wellness = () => {
  const t = useTranslations("wellness");
  const locale = useLocale();
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-12 px-4 md:px-10 py-20 bg-white relative z-0">
      {/* Image & Background Box */}
      <div className="relative flex items-center justify-center">
        {/* Decorative Background Box */}
        <div className="absolute w-[300px] md:w-[500px] h-[400px] bg-orange-50 -z-10 rounded-md -top-10 -left-10"></div>

        {/* Image */}
        <div className="relative overflow-hidden w-[280px] md:w-[400px] lg:w-[500px] h-[400px] rounded shadow-lg">
          <Image
            src="/bg1.jpg"
            alt="Wellness & Spa"
            priority
            width={600}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-6 md:gap-8 max-w-xl text-center md:text-left">
        <h3 className="text-[1.8rem] md:text-[2.25rem] font-bold text-cyan-950">
          {t("title")}
        </h3>
        <p className="text-gray-600 font-light leading-relaxed">
          {t("description")}
        </p>
        <Link
          href="services"
          className="self-center md:self-start text-white text-sm font-medium bg-cyan-800 px-6 py-2 rounded hover:bg-cyan-700 transition-all duration-300"
          locale={locale}
        >
          {t("link")}
        </Link>
      </div>
    </section>
  );
};

export default Wellness;
