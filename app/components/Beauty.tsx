import Image from "next/image";

const Beauty = () => {
  return (
    <div className="py-10 md:py-20 flex flex-col gap-10 md:gap-28 items-center">
      <div className="flex flex-col items-center gap-4 md:gap-10 p-4 md:p-0">
        <h2 className="text-[2rem] md:text-[3.5rem] text-center">
          ELODIA BEAUTY AND SPA CENTER
        </h2>
        <p className="md:w-[50vw] text-center md:text-xl font-thin">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quae earum
          maiores itaque, blanditiis iure quidem eum sapiente veritatis atque
          ullam rem harum perferendis dolore numquam omnis ducimus ea! Harum
          modi, minus voluptas a quas laboriosam fugit temporibus voluptatum
          adipisci!
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
          <div className="w-[15rem] md:w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center">
            <h3 className="">Mineral Salt Scrub</h3>
            <p className="font-thin text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
              exercitationem!
            </p>
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
          <div className="w-[15rem] md:w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center">
            <h3 className="">Geothermal Spa</h3>
            <p className="font-thin text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
              exercitationem!
            </p>
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
          <div className="w-[15rem] md:w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center">
            <h3 className="">Mineral Baths</h3>
            <p className="font-thin text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
              exercitationem!
            </p>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 md:flex-row">
        <div className="w-[20rem] flex items-center flex-col gap-6">
          <Image
            src="/massage2.png"
            alt="icons sauna"
            width={100}
            height={30}
          />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-medium">Finnish Sauna</h3>
            <p className="text-center font-thin">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, a.
            </p>
          </div>
        </div>
        <div className="w-[20rem] flex items-center flex-col gap-6">
          <Image src="/bol.png" alt="icons sauna" width={100} height={30} />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-medium">Scrub Program</h3>
            <p className="text-center font-thin">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, a.
            </p>
          </div>
        </div>
        <div className="w-[20rem] flex items-center flex-col gap-6">
          <Image src="/detente.png" alt="icons sauna" width={100} height={30} />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-medium">Volcanic Stones</h3>
            <p className="text-center font-thin">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, a.
            </p>
          </div>
        </div>
        <div className="w-[20rem] flex items-center flex-col gap-6">
          <Image src="/sauna2.png" alt="icons sauna" width={100} height={30} />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-medium">Daily Massage</h3>
            <p className="text-center font-thin">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, a.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beauty;
