"use client";

import { useEffect, useState } from "react";
import { getServices } from "@/lib/getServices";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

const SpaServices = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      setServices(data);
      setLoading(false);
    };

    fetchServices();
  }, []);

  if (loading)
    return (
      <p className="w-[100vw] h-[100vh] flex items-center justify-center">
        <ClipLoader color="#164E63" size={50} />
      </p>
    );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center p-4">
      {services.map((service) => (
        <div
          className="relative flex justify-center overflow-hidden md:w-[14rem] lg:w-[18rem] xl:w-[23rem] h-[500px]"
          key={service.id}
        >
          <Image
            src={service.imageUrl}
            alt={service.name}
            width={400}
            height={500}
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
          />
          <div className="w-[15rem] md:w-[350px] h-[250px] absolute bottom-6 bg-white flex flex-col gap-2 justify-center items-center">
            <h3 className="">{service.name}</h3>
            <p className="font-thin text-center">{service.description}</p>
            <span>${service.price}.00 CAD</span>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              READ MORE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpaServices;
