"use client";

import Image from "next/image";
import React from "react";

const Post = () => {
  const date = new Date();
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 md:px-0 gap-10">
      <h2 className="text-[2rem] md:text-[4rem]">Latest Posts</h2>
      <p className="font-thin md:w-[30rem] text-center">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio
        voluptatum numquam optio necessitatibus rem explicabo iusto ullam! Ea,
        qui sed.
      </p>
      <div className="flex flex-col items-center justify-between lg:flex-row gap-4 lg:w-[80vw]">
        <div className="flex flex-col items-center justify-center gap-4 lg:w-[20rem]">
          <div className="relative flex group">
            <div className="w-[15rem] md:w-[20rem]">
              <Image
                src="/post1.jpg"
                alt="post"
                width={350}
                height={0}
                className="-z-10"
              />
            </div>
            <div className="bg-orange-50 w-[20rem] opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-1000 absolute -top-4 right-8 -z-0"></div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 font-thin">
              <span>6 JULY 2025</span>
              <span>|</span>
              <span>BY ASAN WHITESAN</span>
            </div>
            <h3 className="text-3xl text-gray-700">Healing Spa</h3>
            <p className="font-thin">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus
              dolore sapiente vel ipsa incidunt facilis!
            </p>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 lg:w-[20rem]">
          <div className="relative flex group">
            <div className="w-[15rem] md:w-[20rem]">
              <Image
                src="/post4.jpg"
                alt="post"
                width={350}
                height={0}
                className="-z-10"
              />
            </div>
            <div className="bg-orange-50 w-[20rem] opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-1000 absolute -top-4 right-8 -z-0"></div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 font-thin">
              <span>15 MAY 2025</span>
              <span>|</span>
              <span>BY ASAN WHITESAN</span>
            </div>
            <h3 className="text-3xl text-gray-700">Ressort & Spa</h3>
            <p className="font-thin">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus
              dolore sapiente vel ipsa incidunt facilis!
            </p>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 lg:w-[20rem]">
          <div className="relative flex group">
            <div className="w-[15rem] md:w-[20rem]">
              <Image
                src="/post3.jpg"
                alt="post"
                width={350}
                height={0}
                className="-z-10"
              />
            </div>
            <div className="bg-orange-50 w-[20rem] opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-1000 absolute -top-4 right-8 -z-0"></div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 font-thin">
              <span>4 APRIL 2025</span>
              <span>|</span>
              <span>BY ASAN WHITESAN</span>
            </div>
            <h3 className="text-3xl text-gray-700">Blue lagoon</h3>
            <p className="font-thin">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus
              dolore sapiente vel ipsa incidunt facilis!
            </p>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
