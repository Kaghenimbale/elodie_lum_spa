import Calender from "./Calender";

const Hours = () => {
  return (
    <div className="flex items-center justify-center bg-[url('/bg2.jpg')] bg-cover bg-no-repeat bg-center py-4 lg:py-10">
      <div className="md:w-[90vw] xl:w-[70vw] flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between">
        <div className="flex flex-col gap-10 p-4 md:p-0">
          <h3 className="text-[2rem] text-center md:text-left font-bold">
            Working Hours
          </h3>
          <p className="md:w-[30rem] font-thin">
            We’re here to welcome you throughout the week with flexible hours
            designed to suit your lifestyle.Whether you're planning a quick
            treatment or a full pampering session, there’s always time to relax
            at ELODIA Beauty and Spa.
          </p>
          <div className="w-[20rem]">
            <div className="flex justify-between font-thin">
              <span>Monday to Tuesday</span>
              <span className="text-nowrap">10 AM - 7 PM</span>
            </div>
            <div className="flex justify-between font-thin">
              <span>Wednesday to Thursday</span>
              <span className="text-nowrap">10 AM - 6 PM</span>
            </div>
            <div className="flex justify-between font-thin">
              <span>Saturday</span>
              <span className="text-nowrap">2 AM - 6 PM</span>
            </div>
            <div className="flex justify-between font-thin">
              <span>Sunday</span>
              <span className="text-nowrap">2 AM - 6 PM</span>
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
