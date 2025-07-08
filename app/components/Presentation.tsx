"use client";
import React, { useEffect, useState } from "react";

const Presentation = () => {
  // const [bg, setbg] = useState(0);
  // const backgrounds = ["/bg3.jpg", "/bg7.jpg", "/bg9.jpg"];
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setbg((prev) => (prev + 1) % backgrounds.length);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);
  // console.log(bg);
  return (
    <div
      className="bg-center h-[85vh] mt-16 bg-[url('/bg3.jpg')] flex col justify-center items-center transition-colors duration-500"
      // style={{ backgroundImage: `url(${backgrounds[bg]})` }}
    >
      <div className="flex flex-col gap-12 w-[90vw] md:w-[65vw]">
        <h1 className="text-white text-[2rem] md:text-[4rem]">
          Your beauty truly matters to us and you'll love to stay here at AB&S,
          a place of splendor made for you.
        </h1>
        <button className="w-fit bg-white text-cyan-900 hover:bg-cyan-900 hover:text-white transition-all duration-300 ease-in-out">
          VIEW MORE
        </button>
      </div>
    </div>
  );
};

export default Presentation;
