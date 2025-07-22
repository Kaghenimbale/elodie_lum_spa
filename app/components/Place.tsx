const Place = () => {
  return (
    <div className="bg-[url('/bg5.jpg')] bg-cover bg-center flex items-center">
      <div className="p-4 md:p-20 flex flex-col gap-8">
        <h3 className="text-white text-[2rem] font-bold">
          A Place of true splendor
        </h3>
        <p className="text-white md:w-[60vw]">
          where your journey to relaxation, beauty, and self-confidence begins.
          Here, you’ll discover a curated selection of luxurious treatments,
          personalized spa packages, and expert care tailored just for you. Our
          website is your guide to everything we offer — from rejuvenating
          facials and body therapies to exclusive promotions and effortless
          appointment booking. Designed with elegance and simplicity, our online
          space reflects the peaceful atmosphere you’ll find inside our spa.
          Take your time, explore our services, and book your moment of splendor
          today. Because at ELODIA BEAUTY & SPA, your beauty and well-being
          truly matter.
        </p>
        <button className="w-fit bg-white text-cyan-900 hover:bg-cyan-900 hover:text-white transition-all duration-300 ease-in-out">
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

export default Place;
