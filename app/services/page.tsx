import Image from "next/image";
import React from "react";
import Form from "./Form";

const page = () => {
  return (
    <div className="pt-28 pb-16 flex flex-col gap-5 items-center px-4 md:px-0">
      <div className="flex flex-col gap-5 items-center justify-center">
        <h2 className="text-[3rem] font-extralight text-center md:text-start">
          Spa Packages and Body Treatments
        </h2>
        <p className="md:w-[60rem] font-thin text-center">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center p-4">
        <div className="relative flex justify-center overflow-hidden md:w-[14rem] lg:w-[18rem] xl:w-[23rem] h-[500px]">
          <Image
            src="/banner1.jpg"
            alt="image beauty spa"
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[15rem] md:w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center">
            <h3 className="">Basic Elodia Facial</h3>
            <p className="font-thin text-center">
              A foundational facial designed to cleanse, hydrate, and refresh
              your skin, leaving you with a healthy glow. Perfect for all skin
              types.
            </p>
            <span>$90.00 CAD</span>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>
        <div className="relative flex justify-center overflow-hidden md:w-[14rem] lg:w-[18rem] xl:w-[23rem] h-[500px]">
          <Image
            src="/banner2.jpg"
            alt="image beauty spa"
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[15rem] md:w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center">
            <h3 className="">EBS Advance Facial</h3>
            <p className="font-thin text-center">
              Targeted treatment for enhanced skin concerns. This advanced
              facial deeply nourishes, firms, and brightens, providing visible
              results.
            </p>
            <span>$150.00 CAD</span>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>
        <div className="relative flex justify-center overflow-hidden md:w-[14rem] lg:w-[18rem] xl:w-[23rem] h-[500px]">
          <Image
            src="/banner3.jpg"
            alt="image beauty spa"
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[15rem] md:w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center">
            <h3 className="">EBS Bio Microneedling</h3>
            <p className="font-thin text-center">
              Innovative microneedling to stimulate collagen production. Reduces
              fine lines, scars, and improves skin texture for a smoother,
              firmer look.
            </p>
            <span>$200.00 CAD</span>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>

        <div className="relative flex justify-center overflow-hidden md:w-[14rem] lg:w-[18rem] xl:w-[23rem] h-[500px]">
          <Image
            src="/banner1.jpg"
            alt="image beauty spa"
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[15rem] md:w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center">
            <h3 className="">Basic Elodia Facial</h3>
            <p className="font-thin text-center">
              A foundational facial designed to cleanse, hydrate, and refresh
              your skin, leaving you with a healthy glow. Perfect for all skin
              types.
            </p>
            <span>$90.00 CAD</span>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>
        <div className="relative flex justify-center overflow-hidden md:w-[14rem] lg:w-[18rem] xl:w-[23rem] h-[500px]">
          <Image
            src="/banner2.jpg"
            alt="image beauty spa"
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[15rem] md:w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center">
            <h3 className="">EBS Advance Facial</h3>
            <p className="font-thin text-center">
              Targeted treatment for enhanced skin concerns. This advanced
              facial deeply nourishes, firms, and brightens, providing visible
              results.
            </p>
            <span>$150.00 CAD</span>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>
        <div className="relative flex justify-center overflow-hidden md:w-[14rem] lg:w-[18rem] xl:w-[23rem] h-[500px]">
          <Image
            src="/banner3.jpg"
            alt="image beauty spa"
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[15rem] md:w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center">
            <h3 className="">EBS Bio Microneedling</h3>
            <p className="font-thin text-center">
              Innovative microneedling to stimulate collagen production. Reduces
              fine lines, scars, and improves skin texture for a smoother,
              firmer look.
            </p>
            <span>$200.00 CAD</span>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>

        <div className="relative flex justify-center overflow-hidden md:w-[14rem] lg:w-[18rem] xl:w-[23rem] h-[500px]">
          <Image
            src="/banner1.jpg"
            alt="image beauty spa"
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[15rem] md:w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center">
            <h3 className="">Basic Elodia Facial</h3>
            <p className="font-thin text-center">
              A foundational facial designed to cleanse, hydrate, and refresh
              your skin, leaving you with a healthy glow. Perfect for all skin
              types.
            </p>
            <span>$90.00 CAD</span>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>
        <div className="relative flex justify-center overflow-hidden md:w-[14rem] lg:w-[18rem] xl:w-[23rem] h-[500px]">
          <Image
            src="/banner2.jpg"
            alt="image beauty spa"
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[15rem] md:w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center">
            <h3 className="">EBS Advance Facial</h3>
            <p className="font-thin text-center">
              Targeted treatment for enhanced skin concerns. This advanced
              facial deeply nourishes, firms, and brightens, providing visible
              results.
            </p>
            <span>$150.00 CAD</span>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>
        <div className="relative flex justify-center overflow-hidden md:w-[14rem] lg:w-[18rem] xl:w-[23rem] h-[500px]">
          <Image
            src="/banner3.jpg"
            alt="image beauty spa"
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[15rem] md:w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center">
            <h3 className="">EBS Bio Microneedling</h3>
            <p className="font-thin text-center">
              Innovative microneedling to stimulate collagen production. Reduces
              fine lines, scars, and improves skin texture for a smoother,
              firmer look.
            </p>
            <span>$200.00 CAD</span>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-10">
        <Form />
        <div className="bg-gray-50 md:w-[55rem] flex flex-col gap-5 p-6">
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
