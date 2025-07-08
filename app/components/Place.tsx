import React from "react";

const Place = () => {
  return (
    <div className="bg-[url('/bg5.jpg')] bg-cover bg-center h-[70vh] flex items-center">
      <div className="p-4 md:px-20 xl:px-96 flex flex-col gap-8">
        <h3 className="text-white text-[2rem] md:text-[4rem]">
          A Place of true splendor
        </h3>
        <p className="text-white md:w-[35vw]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae
          magni, voluptates neque aliquid voluptate ratione delectus eaque
          tempora iusto officia!
        </p>
        <button className="w-fit bg-white text-cyan-900 hover:bg-cyan-900 hover:text-white transition-all duration-300 ease-in-out">
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

export default Place;
