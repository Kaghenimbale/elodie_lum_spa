import Image from "next/image";

const Wellness = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 lg:gap-20 py-20">
      <div className="relative flex items-center justify-center">
        <div className="relative flex justify-center overflow-hidden w-[18rem] lg:w-[500px] h-[400px] z-10">
          <Image
            src="/bg1.jpg"
            alt=""
            priority
            width={600}
            height={0}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
        </div>
        <div className="absolute bg-orange-50 -z-0 w-[30rem] h-[25rem] -top-10"></div>
      </div>
      <div className="flex flex-col gap-5 md:gap-10 p-4 md:p-0 ">
        <h3 className="text-[2rem] font-bold">Wellness & Spa</h3>
        <p className="md:w-[30vw] font-thin">
          Escape to our serene Wellness & Spa. Discover a haven where
          tranquility meets rejuvenation. Our expert treatments are designed to
          soothe your senses, relax your mind, and revitalize your body. Indulge
          in an experience tailored for your ultimate well-being.
        </p>
        <button className="text-white text-[0.9rem] bg-cyan-800 w-fit px-4 py-2 rounded hover:bg-cyan-700 transition-all duration-300 ease-in-out">
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

export default Wellness;
