"use client";

import Calender from "./Calender";

const Hours = () => {
  return (
    <section className="flex items-center justify-center bg-[url('/bg2.jpg')] bg-cover bg-no-repeat bg-center py-16 px-4">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12 bg-white/80 backdrop-blur-md rounded-lg p-6 md:p-10 shadow-xl">
        {/* Working Hours Text */}
        <div className="flex flex-col gap-8 w-full lg:w-1/2">
          <h3 className="text-3xl font-bold text-cyan-950 text-center lg:text-left">
            Working Hours
          </h3>
          <p className="text-gray-700 font-light leading-relaxed text-center lg:text-left">
            We’re here to welcome you throughout the week with flexible hours
            designed to suit your lifestyle. Whether you're planning a quick
            treatment or a full pampering session, there’s always time to relax
            at ELODIA Beauty and Spa.
          </p>

          {/* Schedule */}
          <div className="w-full max-w-md space-y-2 mx-auto lg:mx-0">
            {[
              { days: "Monday to Tuesday", hours: "10 AM - 7 PM" },
              { days: "Wednesday to Thursday", hours: "10 AM - 6 PM" },
              { days: "Saturday", hours: "2 PM - 6 PM" },
              { days: "Sunday", hours: "2 PM - 6 PM" },
            ].map(({ days, hours }, i) => (
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
