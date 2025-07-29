"use client";

import Image from "next/image";
import SpaServices from "../services/SpaServices";
import { useTranslations } from "next-intl";

const Beauty = () => {
  const t = useTranslations("beauty");
  const services = t.raw("services") as {
    icon: any;
    title: string;
    description: string;
  }[];
  return (
    <section className="py-10 md:py-20 flex flex-col items-center gap-16 md:gap-28 bg-white">
      {/* Heading Section */}
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <h2 className="text-[1.8rem] md:text-[2.25rem] font-bold">
          ELODIA BEAUTY & SPA
        </h2>
        <p className="max-w-3xl text-gray-700 font-thin">{t("description")}</p>
      </div>

      {/* Services Section */}
      <SpaServices />

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 px-4">
        {services.map(({ icon, title, description }, index) => (
          <div
            key={index}
            className="w-full max-w-sm mx-auto flex flex-col items-center text-center gap-6 opacity-80 hover:opacity-100 transition-opacity duration-300"
          >
            <Image
              src={icon}
              alt={title}
              width={100}
              height={100}
              className="object-contain"
              priority
            />
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-sm text-gray-600 font-light">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Beauty;
