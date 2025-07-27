"use client";

import Image from "next/image";
import SpaServices from "../services/SpaServices";

const Beauty = () => {
  return (
    <section className="py-10 md:py-20 flex flex-col items-center gap-16 md:gap-28 bg-white">
      {/* Heading Section */}
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <h2 className="text-[1.8rem] md:text-[2.25rem] font-bold">
          ELODIA BEAUTY & SPA
        </h2>
        <p className="max-w-3xl text-gray-700 font-thin">
          Your beauty truly matters to us — it’s at the heart of everything we
          do. At ELODIA BEAUTY & SPA, we offer a luxurious space where elegance
          meets comfort. Each detail is designed to help you relax, recharge,
          and shine. Whether it's your first visit or your tenth, you'll feel
          right at home. Step into a world of splendor made just for you.
        </p>
      </div>

      {/* Services Section */}
      <SpaServices />

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 px-4">
        {[
          {
            icon: "/bol.png",
            title: "Hair Removal",
            description:
              "Say goodbye to unwanted hair with our gentle waxing services. Designed for all skin types, our treatments leave your skin smooth, clean, and glowing for weeks.",
          },
          {
            icon: "/detente.png",
            title: "Basic Elodia Facial",
            description:
              "Refresh your face with our signature facial that combines deep cleansing and warm volcanic stones. Ideal for tired or dull skin, it restores hydration and natural radiance.",
          },
          {
            icon: "/sauna2.png",
            title: "Massage",
            description:
              "Let tension melt away with our customized massages. Whether you're seeking stress relief or muscle recovery, our techniques help you feel lighter, relaxed, and renewed.",
          },
        ].map(({ icon, title, description }, index) => (
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
