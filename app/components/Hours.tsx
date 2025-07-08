import React from "react";
import Calender from "./Calender";

const Hours = () => {
  return (
    <div className="flex items-center justify-center bg-[url('/bg2.jpg')] bg-cover bg-no-repeat bg-center py-4 lg:py-10">
      <div className="md:w-[90vw] xl:w-[70vw] flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between">
        <div className="flex flex-col gap-10 p-4 md:p-0">
          <h3 className="text-[2rem] md:text-[3.5rem] text-center md:text-left">
            Working Hours
          </h3>
          <p className="md:w-[30rem] font-thin">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A nemo
            sapiente molestias ratione, voluptatem at est sit reiciendis amet
            obcaecati.
          </p>
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
        <div className="w-[18rem] md:w-[25rem] p-1">
          <Calender />
        </div>
      </div>
    </div>
  );
};

export default Hours;
