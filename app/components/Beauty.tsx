import Image from "next/image";
import React from "react";

const Beauty = () => {
  return (
    <div className="py-10 flex flex-col gap-10 items-center">
      <div className="flex flex-col items-center gap-10">
        <h2 className="text-6xl">ELODIA BEAUTY AND SPA CENTER</h2>
        <p className="w-[50vw] text-center text-2xl font-thin">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quae earum
          maiores itaque, blanditiis iure quidem eum sapiente veritatis atque
          ullam rem harum perferendis dolore numquam omnis ducimus ea! Harum
          modi, minus voluptas a quas laboriosam fugit temporibus voluptatum
          adipisci!
        </p>
      </div>
      <div className="flex gap-10">
        <div className="relative flex justify-center overflow-hidden w-[400px] h-[500px]">
          <Image
            src="/banner1.jpg"
            alt="image beauty spa"
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center">
            <h3 className="">Mineral Salt Scrub</h3>
            <p className="font-thin text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
              exercitationem!
            </p>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700">
              READ MORE
            </button>
          </div>
        </div>
        <div className="relative flex justify-center overflow-hidden w-[400px] h-[500px]">
          <Image
            src="/banner2.jpg"
            alt="image beauty spa"
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center">
            <h3 className="">Mineral Salt Scrub</h3>
            <p className="font-thin text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
              exercitationem!
            </p>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700">
              READ MORE
            </button>
          </div>
        </div>
        <div className="relative flex justify-center overflow-hidden w-[400px] h-[500px]">
          <Image
            src="/banner3.jpg"
            alt="image beauty spa"
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center">
            <h3 className="">Mineral Salt Scrub</h3>
            <p className="font-thin text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
              exercitationem!
            </p>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700">
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beauty;
