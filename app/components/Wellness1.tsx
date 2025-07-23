import Image from "next/image";

const Wellness1 = () => {
  return (
    <div className="py-10 flex flex-col items-center">
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 lg:gap-20 py-20">
        <div className="flex flex-col gap-5 md:gap-10 p-4 md:p-0 ">
          <h3 className="text-[2rem] font-bold">Your Wellbeing</h3>
          <p className="md:w-[30vw] font-thin">
            Prioritize your inner harmony and outer radiance with our exclusive
            wellbeing experience. This carefully curated journey begins with
            your entrance to the blue lagoon, followed by a purifying silica mud
            mask for both face and body. Indulge in complete comfort with the
            use of soft towels and a plush bathrobe, ensuring a truly
            restorative escape.
          </p>
          <ul className="list-disc font-thin">
            <li>Entrance to the blue lagoon</li>
            <li>Silica mud mask (face and body)</li>
            <li>Use of soft towel and bathrobe</li>
          </ul>
          <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out px-4 py-2 rounded">
            BOOK NOW
          </button>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="relative flex justify-center overflow-hidden w-[18rem] lg:w-[500px] h-[400px] z-10">
            <Image
              src="/bg4.jpg"
              alt=""
              priority
              width={600}
              height={0}
              className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
            />
          </div>
          <div className="absolute bg-orange-50 -z-0 w-[30rem] h-[25rem] -top-10"></div>
        </div>
      </div>

      <div className="mx-auto px-4 py-10 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            icon: "/aroma.png",
            title: "Deluxe Aroma Therapy",
            price: "$48",
            desc: "Relax and rejuvenate with essential oil blends.",
          },
          {
            icon: "/bol2.png",
            title: "Sauna Relax",
            price: "$36",
            desc: "Promotes muscle relaxation and cleansing.",
          },
          {
            icon: "/massage-des-pieds.png",
            title: "Geothermal Spa",
            price: "$36",
            desc: "Therapeutic mineral bath experience.",
          },
          {
            icon: "/bois.png",
            title: "Finnish Sauna",
            price: "$36",
            desc: "Purify and revitalize in classic sauna.",
          },
          {
            icon: "/massage2.png",
            title: "Face Masks",
            price: "$48",
            desc: "Hydrate and revitalize your skin.",
          },
          {
            icon: "/detente.png",
            title: "Full Body Massage",
            price: "$48",
            desc: "Deep relaxation and muscle tension relief.",
          },
          {
            icon: "/sauna4.png",
            title: "Extended Aroma Therapy",
            price: "$48",
            desc: "Enhance well-being through aromatic oils.",
          },
          {
            icon: "/sauna2.png",
            title: "Aroma Therapy Express",
            price: "$36",
            desc: "Quick aromatic refresh for mind and spirit.",
          },
        ].map(({ icon, title, price, desc }, i) => (
          <div
            key={i}
            className="flex gap-6 items-start hover:opacity-80 transition-opacity"
          >
            <Image
              src={icon}
              alt={title}
              width={80}
              height={80}
              className="shrink-0"
            />
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <h3 className="text-lg font-semibold">{title}</h3>
                <span className="text-sm text-gray-600">from {price}</span>
              </div>
              <div className="w-full border-b border-gray-300" />
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wellness1;
