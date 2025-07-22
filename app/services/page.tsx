"use client";

import Image from "next/image";
import Form from "./Form";
import SpaServices from "./SpaServices";

const page = () => {
  return (
    <div className="pt-28 pb-16 flex flex-col gap-5 items-center px-4 md:px-0">
      <div className="flex flex-col gap-5 items-center justify-center">
        <h2 className="text-[3rem] font-extralight text-center md:text-start">
          Spa Packages and Body Treatments
        </h2>
        <p className="md:w-[60rem] font-thin text-center text-xl">
          Explore luxury treatments designed to enhance your natural beauty and
          boost your confidence. At our spa, every service is crafted to help
          you feel renewed, radiant, and deeply relaxed. Whether you're seeking
          a moment of calm, a full-body transformation, or a complete wellness
          escape, our carefully curated spa packages deliver the results you
          deserve. Our body treatments are more than skin-deep — they detoxify,
          smooth, and invigorate your entire being. From nourishing body wraps
          to exfoliating scrubs and sculpting therapies, each session is
          customized to your needs and desired outcomes. Indulge in the harmony
          of beauty and wellness — because self-care is not a luxury, it’s a
          necessity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 md:flex-row lg:w-[70vw]">
        <div className="w-[10rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image src="/soul.png" alt="icons sauna" width={70} height={30} />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-thin">BODY AND SOUL</h3>
          </div>
        </div>
        <div className="w-[10rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image src="/aroma.png" alt="icons sauna" width={70} height={30} />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-thin">OIL THERAPY</h3>
          </div>
        </div>
        <div className="w-[10rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image src="/massage.png" alt="icons sauna" width={70} height={30} />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-thin">DAY SPA</h3>
          </div>
        </div>
        <div className="w-[10rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image src="/bol2.png" alt="icons sauna" width={70} height={30} />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-thin">SAUNA</h3>
          </div>
        </div>
        <div className="w-[10rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image src="/detente.png" alt="icons sauna" width={70} height={30} />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-thin">FACIAL</h3>
          </div>
        </div>
        <div className="w-[10rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image
            src="/massage-des-pieds.png"
            alt="icons sauna"
            width={70}
            height={30}
          />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-thin">MASSAGE</h3>
          </div>
        </div>
      </div>

      <div>
        <SpaServices />
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <Form />
        <div className="bg-gray-50 md:w-[50rem] flex flex-col gap-5 p-6">
          <h2 className="text-[2rem] font-thin">EB & SPA Center</h2>
          <p className="font-thin">
            Indulge in luxury treatments tailored to reveal your natural beauty
            and elevate your self-confidence. Our expert team combines science
            and artistry to deliver personalized care in a serene, spa-like
            setting. From rejuvenating facials to advanced body treatments, each
            service is designed with your well-being in mind. Experience the
            perfect blend of elegance, innovation, and results-driven care.
            Because you deserve to feel radiant, confident, and completely
            refreshed.
          </p>
          <div className="font-thin">
            <li>Luxury Experience</li>
            <li>Confidence Boosting</li>
            <li>Natural Beauty Enhancement </li>
            <li>Personalized Care</li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
