"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Wellness1 = () => {
  const t = useTranslations("wellness1");
  const locale = useLocale();
  const items = t.raw("items");
  const services = t.raw("serviceList") as {
    icon: any;
    title: string;
    price: string;
    desc: string;
  }[];

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
          <ul className="list-disc list-inside text-gray-700 font-light space-y-1">
            {items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <Link
            href="/services"
            locale={locale}
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

      {/* Services grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-8 p-4">
        {services.map(({ icon, title, price, desc }, i) => (
          <div
            key={i}
            className="flex gap-6 items-start p-4 rounded hover:bg-gray-50 transition"
          >
            <Image
              src={icon}
              alt={title}
              width={70}
              height={70}
              className="shrink-0"
            />
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <h4 className="text-lg font-semibold text-cyan-900">{title}</h4>
                <span className="text-sm text-gray-600">from {price}</span>
              </div>
              <hr className="border-gray-200 w-full" />
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Wellness1;
