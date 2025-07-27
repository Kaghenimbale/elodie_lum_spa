"use client";

const Place = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/bg5.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="relative z-10 px-4 py-20 md:py-40 max-w-4xl text-center space-y-8">
        <h3 className="text-[1.8rem] md:text-[2.25rem] font-bold">
          A Place of True Splendor
        </h3>
        <p className="text-white/90 leading-relaxed text-sm sm:text-base">
          Where your journey to relaxation, beauty, and self-confidence begins.
          Here, you’ll discover a curated selection of luxurious treatments,
          personalized spa packages, and expert care tailored just for you. Our
          website is your guide to everything we offer — from rejuvenating
          facials and body therapies to exclusive promotions and effortless
          appointment booking. Designed with elegance and simplicity, our online
          space reflects the peaceful atmosphere you’ll find inside our spa.
          Take your time, explore our services, and book your moment of splendor
          today. Because at <strong>ELODIA BEAUTY & SPA</strong>, your beauty
          and well-being truly matter.
        </p>
        <button className="mt-4 px-6 py-2 rounded bg-white text-cyan-900 font-medium hover:bg-cyan-800 hover:text-white transition-all duration-300">
          BOOK NOW
        </button>
      </div>
    </section>
  );
};

export default Place;
