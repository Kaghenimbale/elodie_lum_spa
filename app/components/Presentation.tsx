import React from "react";

const Presentation = () => {
  return (
    <div className="bg-[url('/bg3.jpg')] bg-center bg-no-repeat h-[85vh] flex col justify-center items-center">
      <div className="w-[60vw] flex flex-col gap-12">
        <h1 className="text-white text-6xl">
          Your Your beauty truly matters to us and we you'll love to stay here
          at AB&S, a place of splendor made for you.
        </h1>
        <button className="w-fit bg-white text-cyan-900 hover:bg-cyan-900 hover:text-white transition-all duration-300 ease-in-out">
          VIEW MORE
        </button>
      </div>
    </div>
  );
};

export default Presentation;
