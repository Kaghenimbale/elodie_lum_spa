import React from "react";

const Form = () => {
  return (
    <form action="" className="flex flex-col gap-4">
      <h2 className="text-[1.8rem] md:text-[2rem] font-thin">
        Book an Appointment
      </h2>
      <input
        className="p-4 md:w-[25rem] border-[1px] border-gray-400"
        type="name"
        placeholder="Name"
        name="name"
        required
      />

      <input
        className="p-4 md:w-[25rem] border-[1px] border-gray-400"
        type="email"
        placeholder="Email address"
        name="email"
        required
      />

      <select
        name="service"
        className="font-thin p-4 md:w-[25rem] border-[1px] border-gray-400"
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
        className="p-4 w-full md:w-[25rem] border-[1px] border-gray-400 font-thin"
        type="date"
        placeholder="Prefered Date"
        name="date"
        required
      />
      <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
        MAKE AN APPOINTEMENT
      </button>
    </form>
  );
};

export default Form;
