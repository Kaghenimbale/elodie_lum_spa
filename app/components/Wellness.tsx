import Image from "next/image";
import React from "react";

const Wellness = () => {
  return (
    <div className="flex w-[100%] justify-center items-center gap-20">
      <div className="relative flex justify-center overflow-hidden w-[600px] h-[400px]">
        <Image
          src="/bg1.jpg"
          alt=""
          width={600}
          height={0}
          className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-10">
        <h3 className="text-4xl font-medium">Wellness & Spa</h3>
        <p className="w-[30vw] font-thin">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
          provident excepturi placeat obcaecati praesentium ullam facilis totam
          harum. Deserunt praesentium, sequi illum id accusamus temporibus
          molestiae reiciendis natus explicabo ex!
        </p>
        <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

export default Wellness;
