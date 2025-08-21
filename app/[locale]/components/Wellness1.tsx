"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Wellness1 = () => {
  const t = useTranslations("wellness1");
  const locale = useLocale();

  return (
    <section className="flex flex-col items-center py-16 px-4 space-y-16 bg-white">
      {/* Hero section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 lg:gap-20">
        {/* Text content */}
        <div className="flex flex-col gap-6 md:gap-10 max-w-xl">
          <h3 className="text-3xl font-bold text-cyan-950">{t("title")}</h3>
          <p className="text-gray-700 font-light leading-relaxed">
            {t("description")}
          </p>
          <Link
            href={`${locale}/services`}
            className="self-start bg-cyan-800 text-white text-sm px-5 py-2 rounded hover:bg-cyan-700 transition duration-300"
          >
            {t("link")}
          </Link>
        </div>

        {/* Image */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-[18rem] md:w-[24rem] lg:w-[30rem] h-[20rem] md:h-[24rem] z-10 overflow-hidden rounded-md shadow-lg">
            <Image
              src="/bg4.jpg"
              alt="Spa image"
              fill
              priority
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="absolute bg-orange-50 -z-0 w-[30rem] h-[25rem] -top-10 rounded-full blur-md"></div>
        </div>
      </div>
    </section>
  );
};

export default Wellness1;
