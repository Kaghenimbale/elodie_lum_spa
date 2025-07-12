import Image from "next/image";

const Beauty = () => {
  return (
    <div className="py-10 md:py-20 flex flex-col gap-10 md:gap-28 items-center">
      <div className="flex flex-col items-center gap-4 md:gap-10 p-4 md:p-0">
        <h2 className="text-[2rem] md:text-[3.5rem] text-center">
          ELODIA BEAUTY AND SPA CENTER
        </h2>
        <p className="md:w-[50vw] text-center md:text-xl font-thin">
          Your beauty truly matters to us — it’s at the heart of everything we
          do. At ELODIA, we offer a luxurious space where elegance meets
          comfort. Each detail is designed to help you relax, recharge, and
          shine. Whether it's your first visit or your tenth, you'll feel right
          at home. Step into a world of splendor made just for you.
        </p>
      </div>
      <div className="flex gap-10 flex-col md:flex-row items-center p-4">
        <div className="relative flex justify-center overflow-hidden md:w-[14rem] lg:w-[18rem] xl:w-[23rem] h-[500px]">
          <Image
            src="/banner1.jpg"
            alt="image beauty spa"
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[15rem] md:w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center p-2">
            <h3 className="">Basic Elodia Facial</h3>
            <p className="font-thin text-center">
              A foundational facial designed to cleanse, hydrate, and refresh
              your skin, leaving you with a healthy glow. Perfect for all skin
              types.
            </p>
            <span>$90.00 CAD</span>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>
        <div className="relative flex justify-center overflow-hidden md:w-[14rem] lg:w-[18rem] xl:w-[23rem] h-[500px]">
          <Image
            src="/banner2.jpg"
            alt="image beauty spa"
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[15rem] md:w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center p-2">
            <h3 className="">EBS Advance Facial</h3>
            <p className="font-thin text-center">
              Targeted treatment for enhanced skin concerns. This advanced
              facial deeply nourishes, firms, and brightens, providing visible
              results.
            </p>
            <span>$150.00 CAD</span>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>
        <div className="relative flex justify-center overflow-hidden md:w-[14rem] lg:w-[18rem] xl:w-[23rem] h-[500px]">
          <Image
            src="/banner3.jpg"
            alt="image beauty spa"
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[15rem] md:w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center p-2">
            <h3 className="">EBS Bio Microneedling</h3>
            <p className="font-thin text-center">
              Innovative microneedling to stimulate collagen production. Reduces
              fine lines, scars, and improves skin texture for a smoother,
              firmer look.
            </p>
            <span>$200.00 CAD</span>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 md:flex-row">
        <div className="w-[20rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image
            src="/massage2.png"
            alt="icons sauna"
            width={100}
            height={30}
          />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-medium">Sauna</h3>
            <p className="text-center font-thin">
              Relax and detox in our authentic Finnish Sauna. Rejuvenate your
              body and mind.
            </p>
          </div>
        </div>
        <div className="w-[20rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image src="/bol.png" alt="icons sauna" width={100} height={30} />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-medium">Hair Removal</h3>
            <p className="text-center font-thin">
              Reveal your skin's natural glow with our quick, effective, and
              long-lasting waxing solutions!
            </p>
          </div>
        </div>
        <div className="w-[20rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image src="/detente.png" alt="icons sauna" width={100} height={30} />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-medium">Basic Elodia Facial</h3>
            <p className="text-center font-thin">
              Experience deep healing warmth with Volcanic Stones. Melt away
              tension.
            </p>
          </div>
        </div>
        <div className="w-[20rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image src="/sauna2.png" alt="icons sauna" width={100} height={30} />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-medium">Massage</h3>
            <p className="text-center font-thin">
              Our expert techniques reduce stress, leaving you feeling relaxed
              and refreshed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beauty;
