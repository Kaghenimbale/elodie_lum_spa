import Location from "./Location";
import Form from "../services/Form";
import Image from "next/image";

const page = () => {
  return (
    <div className="pt-[4.5rem] pb-16 flex flex-col gap-5 px-4 lg:px-0 items-center justify-center">
      <div className="relative w-full h-[60vh] lg:h-[80vh]">
        <Image
          src="/bg-contact.webp"
          alt="Contact background"
          fill
          priority
          quality={100}
          className="object-cover object-bottom"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-[1.8rem] md:text-[2.25rem] text-white font-bold px-4 text-center max-w-4xl">
            Contact Us
          </h2>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-20 max-w-7xl mx-auto px-4 py-12 w-full lg:w-[70vw]">
        {/* Contact Info */}
        <div className="flex flex-col gap-12 w-full lg:w-1/2 max-w-lg">
          {/* EB & SPA */}
          <div>
            <h3 className="text-xl font-bold mb-4">EB & SPA</h3>
            <div className="flex flex-col gap-3 font-thin text-gray-800">
              <span>
                598 Concession str, Hamilton, Ontario, L8V 1B3, Canada
              </span>
              <span>elodiabspa@gmail.com</span>
              <span>Phone: +1 (289) 206-1802</span>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
            <div className="w-full max-w-sm space-y-3 font-thin text-gray-700">
              {[
                { day: "Monday to Tuesday", hours: "10 AM - 7 PM" },
                { day: "Wednesday to Thursday", hours: "10 AM - 6 PM" },
                { day: "Saturday", hours: "2 AM - 6 PM" },
                { day: "Sunday", hours: "2 AM - 6 PM" },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between">
                  <span>{day}</span>
                  <span className="whitespace-nowrap">{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="">
          <Location />
        </div>
      </div>

      <Form />
    </div>
  );
};

export default page;
