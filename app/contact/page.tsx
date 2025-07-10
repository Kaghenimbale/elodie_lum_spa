import React from "react";
import Location from "./Location";
import Form from "../services/Form";

const page = () => {
  return (
    <div className="pt-[4.5rem] pb-16 flex flex-col gap-5 px-4 lg:px-0 items-center justify-center">
      <div className="w-[100%] h-[100vh] lg:h-[80vh] bg-[url('/bg-contact.jpg')] bg-cover bg-bottom flex items-center justify-center">
        <h2 className="text-[2rem] md:text-[3.5rem] text-white">Contact Us</h2>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0 lg:justify-between lg:w-[70vw]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h3 className="text-xl">EB & SPA</h3>
            <div className="flex flex-col gap-4 font-thin">
              <span>Goma, Himbi Av du lac N°123</span>
              <span>elodiabeautyspa@gmail.com</span>
              <span>Phone: +1 (437) 665-0194</span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-xl">Opening Hours</h3>
            <div>
              <div className="flex justify-between w-[15rem] font-thin">
                <span>Monday to Friday</span>
                <span>09:00 - 20:00</span>
              </div>
              <div className="flex justify-between w-[15rem] font-thin">
                <span>Saturday</span>
                <span>09:00 - 18:00</span>
              </div>
              <div className="flex justify-between w-[15rem] font-thin">
                <span>Sunday</span>
                <span>09:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-red-500">
          <Location /> LOCATION
        </div>
      </div>
      <form action="" className="flex flex-col gap-4">
        <h2 className="text-[1.8rem] md:text-[2rem] font-thin">
          Drop Us a Line
        </h2>
        <input
          className="p-4 w-[90vw] md:w-[25rem] border-[1px] border-gray-400"
          type="name"
          placeholder="Name"
          name="name"
          required
        />

        <input
          className="p-4 w-[90vw]  md:w-[25rem] border-[1px] border-gray-400"
          type="email"
          placeholder="Email address"
          name="email"
          required
        />

        <select
          name="service"
          className="font-thin p-4 w-[90vw]  md:w-[25rem] border-[1px] border-gray-400"
        >
          <option className="font-thin" value="">
            Type of service
          </option>
          <option className="font-thin" value="body and soul">
            BODY AND SOUL
          </option>
          <option className="font-thin" value="OIL THERAPY">
            OIL THERAPY
          </option>
          <option className="font-thin" value="DAY SPA">
            DAY SPA
          </option>
          <option className="font-thin" value="SAUNA">
            SAUNA
          </option>
          <option className="font-thin" value="FACIAL">
            FACIAL
          </option>
          <option className="font-thin" value="MASSAGE">
            MASSAGE
          </option>
        </select>

        <input
          className="p-4 w-[90vw] md:w-[25rem] border-[1px] border-gray-400 font-thin"
          type="date"
          placeholder="Prefered Date"
          name="date"
          required
        />

        <textarea
          className="p-4 w-[90vw] md:w-[25rem] h-[10rem] border-[1px] border-gray-400 font-thin"
          placeholder="Message"
          name="message"
          required
        ></textarea>
        <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
          SEND
        </button>
      </form>
    </div>
  );
};

export default page;
