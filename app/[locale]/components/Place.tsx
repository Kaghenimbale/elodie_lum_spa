"use client";

import { useTranslations } from "next-intl";

const Place = () => {
  const t = useTranslations("place");
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/bg5.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="relative z-10 px-4 py-20 md:py-40 max-w-4xl text-center space-y-8">
        <h3 className="text-[1.8rem] md:text-[2.25rem] font-bold">
          {t("title")}
        </h3>
        <p className="text-white/90 leading-relaxed text-sm sm:text-base">
          {t("description")}
        </p>
        <button className="mt-4 px-6 py-2 rounded bg-white text-cyan-900 font-medium hover:bg-cyan-800 hover:text-white transition-all duration-300">
          {t("link")}
        </button>
      </div>
    </section>
  );
};

export default Place;
