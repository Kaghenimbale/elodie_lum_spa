import React from "react";
import Calender from "./Calender";

const Hours = () => {
  return (
    <div className="flex w-[100%] h-[70vh] items-center justify-center bg-[url('/bg2.jpg')] bg-cover bg-no-repeat bg-center">
      <div className="w-[60%] flex justify-between">
        <div className="flex flex-col gap-10">
          <h3 className="text-4xl">Working Hours</h3>
          <p className="w-[30rem] font-thin">
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
        <div>
          <Calender />
        </div>
      </div>
    </div>
  );
};

export default Hours;
