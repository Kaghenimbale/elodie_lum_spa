import Image from "next/image";
import SpaServices from "../services/SpaServices";

const Beauty = () => {
  return (
    <div className="py-10 md:py-20 flex flex-col gap-10 md:gap-28 items-center">
      <div className="flex flex-col items-center gap-4 md:gap-10 p-4 md:p-0">
        <h2 className="text-[2rem] text-center">ELODIA BEAUTY & SPA</h2>
        <p className="md:w-[50vw] text-center md:text-xl font-thin">
          Your beauty truly matters to us — it’s at the heart of everything we
          do. At ELODIA BEAUTY & SPA, we offer a luxurious space where elegance
          meets comfort. Each detail is designed to help you relax, recharge,
          and shine. Whether it's your first visit or your tenth, you'll feel
          right at home. Step into a world of splendor made just for you.
        </p>
      </div>

      <div>
        <SpaServices />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div className="w-[20rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image
            src="/bol.png"
            priority
            alt="icons sauna"
            width={100}
            height={30}
          />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-medium">Hair Removal</h3>
            <p className="text-center font-thin">
              Say goodbye to unwanted hair with our gentle waxing services.
              Designed for all skin types, our treatments leave your skin
              smooth, clean, and glowing for weeks.
            </p>
          </div>
        </div>
        <div className="w-[20rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image
            src="/detente.png"
            priority
            alt="icons sauna"
            width={100}
            height={30}
          />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-medium">Basic Elodia Facial</h3>
            <p className="text-center font-thin">
              Refresh your face with our signature facial that combines deep
              cleansing and warm volcanic stones. Ideal for tired or dull skin,
              it restores hydration and natural radiance.
            </p>
          </div>
        </div>
        <div className="w-[20rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100">
          <Image
            src="/sauna2.png"
            priority
            alt="icons sauna"
            width={100}
            height={30}
          />
          <div className="flex flex-col gap-6 items-center">
            <h3 className="text-xl font-medium">Massage</h3>
            <p className="text-center font-thin">
              Let tension melt away with our customized massages. Whether you're
              seeking stress relief or muscle recovery, our techniques help you
              feel lighter, relaxed, and renewed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beauty;
