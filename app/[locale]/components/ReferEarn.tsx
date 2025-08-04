import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const ReferEarn = () => {
  const t = useTranslations("referAndEarn1");

  const howItWorks = t.raw("howItWorks") as string[];
  return (
    <section className="bg-white py-12 px-6 sm:px-10 lg:px-20 mt-10 lg:mt-20">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-[2.25rem] font-bold text-gray-800">{t("title")}</h2>

        <h3 className="text-2xl text-cyan-900 font-semibold">
          {t("subtitle")}
        </h3>

        <p className="text-gray-600 text-lg">{t("highlighted.question")}</p>

        <p className="text-gray-700">
          {t("highlighted.rewards").split("free services")[0]}
          <span className="font-semibold text-green-600">free services</span>
          {t("highlighted.rewards").split("free services")[1]}
        </p>

        <div className="mt-10 text-left bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            {t("sectionTitle")}
          </h4>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            {howItWorks.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <Link
          className="inline-block text-white text-sm font-medium bg-cyan-800 px-6 py-2 rounded hover:bg-cyan-700 transition-all duration-300"
          href="/signUp"
        >
          {t("callToAction")}
        </Link>

        <p className="text-cyan-900 font-medium text-lg mt-6">
          {t("reminder")}
        </p>
      </div>
    </section>
  );
};

export default ReferEarn;
