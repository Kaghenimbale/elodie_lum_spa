import Image from "next/image";
import Testimonial from "../components/Testimonial";

const page = () => {
  return (
    <div className="pt-28 pb-16 flex flex-col gap-5 px-4 lg:px-0">
      <div className="flex flex-col gap-5 items-center justify-center">
        <h2 className="text-[1rem] lg:text-[3rem] font-extralight">
          Welcome to Elodia Beauty & Spa
        </h2>
        <p className="lg:w-[60rem] font-thin text-center">
          Welcome to EB & Spa. Imagine stepping into a haven where the everyday
          stresses melt away, and a renewed sense of well-being takes over.
          Revival Med Spa offers this escape at our convenient locations across
          NYC, Brooklyn, and Long Island. We’ve thoughtfully combined the
          peaceful ambiance of a luxury spa with the transformative power of
          cutting-edge medical aesthetics and wellness solutions to provide you
          with an unparalleled experience. At Revival Med Spa, our mission is
          simple: to empower you to look and feel your absolute best through
          personalized care and the most advanced treatments available.
        </p>
      </div>

      <div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 lg:gap-20 py-20">
          <div className="relative flex items-center justify-center">
            <div className="relative flex justify-center overflow-hidden w-[18rem] lg:w-[500px] h-[400px] z-10">
              <Image
                src="/bg1.jpg"
                alt=""
                width={600}
                height={0}
                className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
              />
            </div>
            <div className="absolute bg-orange-50 -z-0 w-[30rem] h-[25rem] -top-10"></div>
          </div>
          <div className="flex flex-col gap-5 md:gap-10 p-4 md:p-0 ">
            <h3 className="text-[2rem] lg:text-[3.5rem] font-extralight">
              AB & Spa
            </h3>
            <p className="md:w-[30vw] font-thin">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
              provident excepturi placeat obcaecati praesentium ullam facilis
              totam harum. Deserunt praesentium, sequi illum id accusamus
              temporibus molestiae reiciendis natus explicabo ex!
            </p>
            <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
              BOOK NOW
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 lg:gap-20 py-20">
        <div className="flex flex-col gap-5 md:gap-10 p-4 md:p-0 ">
          <h3 className="text-[2rem] lg:text-[3.5rem] font-extralight">
            Your Wellbeing
          </h3>
          <p className="md:w-[30vw] font-thin">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam
            provident excepturi placeat obcaecati praesentium ullam facilis
            totam harum. Deserunt praesentium, sequi illum id accusamus
            temporibus molestiae reiciendis natus explicabo ex!
          </p>
          <ul className="list-disc font-thin">
            <li>Entrance to the blue lagoon</li>
            <li>Silica mud mask(face and body)</li>
            <li>Use of soft towel and bathrobe</li>
          </ul>
          <button className="text-white text-[0.9rem] bg-cyan-800 w-fit hover:bg-cyan-700 transition-all duration-300 ease-in-out">
            BOOK NOW
          </button>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="relative flex justify-center overflow-hidden w-[18rem] lg:w-[500px] h-[400px] z-10">
            <Image
              src="/bg4.jpg"
              alt=""
              width={600}
              height={0}
              className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
            />
          </div>
          <div className="absolute bg-orange-50 -z-0 w-[30rem] h-[25rem] -top-10"></div>
        </div>
      </div>

      <Testimonial />
      <div className="flex flex-col gap-5 items-center justify-center">
        <h2 className="text-[3rem] font-extralight">OUR TEAM</h2>
        <p className="md:w-[70rem] font-thin text-center">
          Our Expert Team & Comprehensive Services. Our team of skilled and
          licensed practitioners are passionate about helping you achieve your
          unique aesthetic and wellness goals. We offer a comprehensive menu of
          services tailored to your individual needs, including: Advanced
          Aesthetic Treatments: Customized facials, chemical peels,
          microdermabrasion, Diamond Glow, and more. Revitalizing Laser
          Therapies: Hair removal, skin resurfacing, vein treatments, and more.
          The Latest in Injectables: Botox, dermal fillers, and other advanced
          cosmetic injectables to restore volume, smooth lines, and enhance your
          natural features. Luxurious Face & Body Care: Relaxing massages, body
          wraps, and specialized treatments. Revitalizing IV Shots & Drips:
          Boost your energy, immunity, and overall wellness from the inside out.
          Weight Loss Programs: Personalized plans to help you achieve your
          weight management goals safely and effectively. And More!
        </p>
      </div>
    </div>
  );
};

export default page;
