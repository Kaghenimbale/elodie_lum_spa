"use client";

import { useTranslations } from "next-intl";
import Calender from "./Calender";

const Hours = () => {
  const t = useTranslations("hours");
  const schedule = t.raw("schedule") as {
    days: any;
    hours: string;
  }[]; // returns the full array

  return (
    <section className="flex items-center justify-center bg-[url('/bg2.jpg')] bg-cover bg-no-repeat bg-center py-16 px-4">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12 bg-white/80 backdrop-blur-md rounded-lg p-6 md:p-10 shadow-xl">
        {/* Working Hours Text */}
        <div className="flex flex-col gap-8 w-full lg:w-1/2">
          <h3 className="text-3xl font-bold text-cyan-950 text-center lg:text-left">
            {t("title")}
          </h3>
          <p className="text-gray-700 font-light leading-relaxed text-center lg:text-left">
            {t("description")}
          </p>

          {/* Schedule */}
          <div className="w-full max-w-md space-y-2 mx-auto lg:mx-0">
            {schedule.map(({ days, hours }, i) => (
              <div
                key={i}
                className="flex justify-between font-light text-gray-800"
              >
                <span>{days}</span>
                <span className="whitespace-nowrap">{hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="w-full max-w-sm">
          <Calender />
        </div>
      </div>
    </section>
  );
};

export default Hours;
