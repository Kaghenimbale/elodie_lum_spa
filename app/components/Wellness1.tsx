import Image from "next/image";

const Wellness1 = () => {
  return (
    <div className="py-10 flex flex-col items-center">
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 lg:gap-20 py-20">
        <div className="flex flex-col gap-5 md:gap-10 p-4 md:p-0 ">
          <h3 className="text-[2rem] lg:text-[3.5rem] font-medium">
            Your Wellbeing
          </h3>
          <p className="md:w-[30vw] font-thin">
            Prioritize your inner harmony and outer radiance with our exclusive
            wellbeing experience. This carefully curated journey begins with
            your entrance to the blue lagoon, followed by a purifying silica mud
            mask for both face and body. Indulge in complete comfort with the
            use of soft towels and a plush bathrobe, ensuring a truly
            restorative escape.
          </p>
          <ul className="list-disc font-thin">
            <li>Entrance to the blue lagoon</li>
            <li>Silica mud mask (face and body)</li>
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

      <div className="md:w-[80vw] lg:w-[65vw] flex flex-col lg:flex-row justify-between gap-20">
        <div className="flex flex-col gap-10">
          <div className="flex gap-10">
            <Image src="/aroma.png" alt="icon" width={50} height={0} />
            <div className="flex flex-col gap-4 hover:cursor-text">
              <div className="flex justify-between lg:w-[22rem]">
                <h3 className="">Deluxe Aroma Therapy,</h3>
                <div className="underline w-full lg:w-[10rem] border-b-[1px] border-gray-300"></div>
                <span>
                  from <span>$48</span>
                </span>
              </div>
              <p className="font-thin">
                Relax and rejuvenate with essential oil blends.
              </p>
            </div>
          </div>
          <div className="flex gap-10">
            <Image src="/bol2.png" alt="icon" width={50} height={0} />
            <div className="flex flex-col gap-4 hover:cursor-text">
              <div className="flex justify-between lg:w-[22rem]">
                <h3 className="">Sauna relax</h3>
                <div className="underline w-full lg:w-[10rem] border-b-[1px] border-gray-300"></div>
                <span>
                  from <span>$36</span>
                </span>
              </div>
              <p className="font-thin">
                Promotes muscle relaxation and cleansing.
              </p>
            </div>
          </div>
          <div className="flex gap-10">
            <Image
              src="/massage-des-pieds.png"
              alt="icon"
              width={50}
              height={0}
            />
            <div className="flex flex-col gap-4 hover:cursor-text">
              <div className="flex justify-between lg:w-[22rem]">
                <h3 className="">Geothermal spa</h3>
                <div className="underline w-full lg:w-[10rem] border-b-[1px] border-gray-300"></div>
                <span>
                  from <span>$36</span>
                </span>
              </div>
              <p className="font-thin">Therapeutic mineral bath experience.</p>
            </div>
          </div>
          <div className="flex gap-10">
            <Image src="/bois.png" alt="icon" width={50} height={0} />
            <div className="flex flex-col gap-4 hover:cursor-text">
              <div className="flex justify-between lg:w-[22rem]">
                <h3 className="">Finnish sauna</h3>
                <div className="underline w-full lg:w-[10rem] border-b-[1px] border-gray-300"></div>
                <span>
                  from <span>$36</span>
                </span>
              </div>
              <p className="font-thin">
                Purify and revitalize in classic sauna.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex gap-10">
            <Image src="/massage2.png" alt="icon" width={50} height={0} />
            <div className="flex flex-col gap-4 hover:cursor-text">
              <div className="flex justify-between lg:w-[22rem]">
                <h3 className="">Face masks</h3>
                <div className="underline w-full lg:w-[10rem] border-b-[1px] border-gray-300"></div>
                <span>
                  from <span>$48</span>
                </span>
              </div>
              <p className="font-thin">Hydrate and revitalize your skin.</p>
            </div>
          </div>
          <div className="flex gap-10">
            <Image src="/detente.png" alt="icon" width={50} height={0} />
            <div className="flex flex-col gap-4 hover:cursor-text">
              <div className="flex justify-between lg:w-[22rem]">
                <h3 className="text-nowrap">Full body massage</h3>
                <div className="underline w-full lg:w-[10rem] border-b-[1px] border-gray-300"></div>
                <span>
                  from <span>$48</span>
                </span>
              </div>
              <p className="font-thin">
                Deep relaxation and muscle tension relief.
              </p>
            </div>
          </div>
          <div className="flex gap-10">
            <Image src="/sauna4.png" alt="icon" width={50} height={0} />
            <div className="flex flex-col gap-4 hover:cursor-text">
              <div className="flex justify-between lg:w-[22rem]">
                <h3 className="">Extended Aroma Therapy</h3>
                <div className="underline w-full lg:w-[10rem] border-b-[1px] border-gray-300"></div>
                <span>
                  from <span>$48</span>
                </span>
              </div>
              <p className="font-thin">
                Enhance well-being through aromatic oils.
              </p>
            </div>
          </div>
          <div className="flex gap-10">
            <Image src="/sauna2.png" alt="icon" width={50} height={0} />
            <div className="flex flex-col gap-4 hover:cursor-text">
              <div className="flex justify-between lg:w-[22rem]">
                <h3 className="">Aroma Therapy Express,</h3>
                <div className="underline w-full lg:w-[10rem] border-b-[1px] border-gray-300"></div>
                <span>
                  from <span>$36</span>
                </span>
              </div>
              <p className="font-thin">
                Quick aromatic refresh for mind and spirit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wellness1;
