"use client";

const Presentation = () => {
  return (
    <div className="bg-center h-[85vh] mt-16 bg-[url('/bg3.jpg')] flex col justify-center items-center transition-colors duration-500">
      <div className="flex flex-col gap-12 w-[90vw] md:w-[65vw]">
        <h1 className="text-white text-[2rem] md:text-[3.5rem]">
          At Elodia Beauty & SPA, your beauty is our priority. Welcome to a
          haven of splendor created especially for you.
        </h1>
        <button className="w-fit bg-white text-cyan-900 hover:bg-cyan-900 hover:text-white transition-all duration-300 ease-in-out">
          VIEW MORE
        </button>
      </div>
    </div>
  );
};

export default Presentation;
