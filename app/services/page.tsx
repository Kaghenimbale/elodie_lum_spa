import Image from "next/image";
import React from "react";
import Form from "./Form";

const page = () => {
  return (
    <div className="pt-28 pb-16 flex flex-col gap-5 items-center px-4 md:px-0">
      <div className="flex flex-col gap-5 items-center justify-center">
        <h2 className="text-[3rem] font-extralight text-center md:text-start">
          Spa Packages and Body Treatments
        </h2>
        <p className="md:w-[60rem] font-thin text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore,
          harum adipisci? Sint in corrupti eaque repellendus pariatur placeat
          aliquid optio dicta nisi nesciunt cupiditate libero voluptate possimus
          distinctio voluptates quibusdam sapiente obcaecati qui non id,
          voluptatem enim adipisci. Nulla voluptatum id sit veniam beatae illo
          aspernatur asperiores doloribus ab ex!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 md:flex-row lg:w-[70vw]">
        <div className="w-[10rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image src="/soul.png" alt="icons sauna" width={70} height={30} />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-thin">BODY AND SOUL</h3>
          </div>
        </div>
        <div className="w-[10rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image src="/aroma.png" alt="icons sauna" width={70} height={30} />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-thin">OIL THERAPY</h3>
          </div>
        </div>
        <div className="w-[10rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image src="/massage.png" alt="icons sauna" width={70} height={30} />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-thin">DAY SPA</h3>
          </div>
        </div>
        <div className="w-[10rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image src="/bol2.png" alt="icons sauna" width={70} height={30} />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-thin">SAUNA</h3>
          </div>
        </div>
        <div className="w-[10rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image src="/detente.png" alt="icons sauna" width={70} height={30} />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-thin">FACIAL</h3>
          </div>
        </div>
        <div className="w-[10rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image
            src="/massage-des-pieds.png"
            alt="icons sauna"
            width={70}
            height={30}
          />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-thin">MASSAGE</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center p-4">
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
      <div className="flex flex-col lg:flex-row gap-10">
        <Form />
        <div className="bg-gray-50 md:w-[55rem] flex flex-col gap-5 p-6">
          <h2 className="text-[2rem] font-thin">EB & SPA Center</h2>
          <p className="font-thin">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis,
            veritatis pariatur unde voluptatem est molestias error saepe debitis
            laborum, nemo temporibus minima qui eaque iure dolore numquam
            veniam? Perspiciatis labore exercitationem error explicabo atque
            optio suscipit, ullam similique nobis harum dolor beatae, tempore
            dolorum voluptate voluptas sint sapiente! Obcaecati, autem!
          </p>
          <div className="font-thin">
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Lorem ipsum dolor sit amet.</li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
