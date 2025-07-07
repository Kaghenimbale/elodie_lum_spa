import Image from "next/image";
import React from "react";

const Wellness1 = () => {
  return (
    <div>
      <div className="flex w-[100%] justify-center items-center gap-20 py-20">
        <div className="flex flex-col gap-10">
          <h3 className="text-4xl font-medium">Your Wellbeing</h3>
          <p className="w-[30vw] font-thin">
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
        </div>
        <div className="relative flex items-center justify-center">
          <div className="relative flex justify-center overflow-hidden w-[600px] h-[400px] z-10">
            <Image
              src="/bg4.jpg"
              alt=""
              width={600}
              height={0}
              className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
            />
          </div>
          <div className="absolute bg-orange-50 -z-0 w-[30rem] h-[30rem] -top-10"></div>
        </div>
      </div>
      <div className="w-[100%] flex justify-center gap-20">
        <div className="flex flex-col gap-10">
          <div className="flex gap-10">
            <Image src="/aroma.png" alt="icon" width={70} height={0} />
            <div className="flex flex-col gap-4 hover:cursor-text">
              <div className="flex justify-between w-[30rem]">
                <h3 className="">Aroma Therapy</h3>
                <div className="underline w-[15rem] border-b-[1px] border-gray-300"></div>
                <span>
                  from <span>$48</span>
                </span>
              </div>
              <p className="font-thin">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="flex gap-10">
            <Image src="/bol2.png" alt="icon" width={70} height={0} />
            <div className="flex flex-col gap-4 hover:cursor-text">
              <div className="flex justify-between w-[30rem]">
                <h3 className="">Sauna relax</h3>
                <div className="underline w-[15rem] border-b-[1px] border-gray-300"></div>
                <span>
                  from <span>$36</span>
                </span>
              </div>
              <p className="font-thin">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="flex gap-10">
            <Image
              src="/massage-des-pieds.png"
              alt="icon"
              width={70}
              height={0}
            />
            <div className="flex flex-col gap-4 hover:cursor-text">
              <div className="flex justify-between w-[30rem]">
                <h3 className="">Geothermal spa</h3>
                <div className="underline w-[15rem] border-b-[1px] border-gray-300"></div>
                <span>
                  from <span>$36</span>
                </span>
              </div>
              <p className="font-thin">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="flex gap-10">
            <Image src="/bois.png" alt="icon" width={70} height={0} />
            <div className="flex flex-col gap-4 hover:cursor-text">
              <div className="flex justify-between w-[30rem]">
                <h3 className="">Finnish sauna</h3>
                <div className="underline w-[15rem] border-b-[1px] border-gray-300"></div>
                <span>
                  from <span>$36</span>
                </span>
              </div>
              <p className="font-thin">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex gap-10">
            <Image src="/massage2.png" alt="icon" width={70} height={0} />
            <div className="flex flex-col gap-4 hover:cursor-text">
              <div className="flex justify-between w-[30rem]">
                <h3 className="">Face masks</h3>
                <div className="underline w-[15rem] border-b-[1px] border-gray-300"></div>
                <span>
                  from <span>$48</span>
                </span>
              </div>
              <p className="font-thin">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="flex gap-10">
            <Image src="/detente.png" alt="icon" width={70} height={0} />
            <div className="flex flex-col gap-4 hover:cursor-text">
              <div className="flex justify-between w-[30rem]">
                <h3 className="">Full body massage</h3>
                <div className="underline w-[15rem] border-b-[1px] border-gray-300"></div>
                <span>
                  from <span>$48</span>
                </span>
              </div>
              <p className="font-thin">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="flex gap-10">
            <Image src="/sauna4.png" alt="icon" width={70} height={0} />
            <div className="flex flex-col gap-4 hover:cursor-text">
              <div className="flex justify-between w-[30rem]">
                <h3 className="">Aroma Therapy</h3>
                <div className="underline w-[15rem] border-b-[1px] border-gray-300"></div>
                <span>
                  from <span>$48</span>
                </span>
              </div>
              <p className="font-thin">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <div className="flex gap-10">
            <Image src="/sauna1.png" alt="icon" width={70} height={0} />
            <div className="flex flex-col gap-4 hover:cursor-text">
              <div className="flex justify-between w-[30rem]">
                <h3 className="">Aroma Therapy</h3>
                <div className="underline w-[15rem] border-b-[1px] border-gray-300"></div>
                <span>
                  from <span>$36</span>
                </span>
              </div>
              <p className="font-thin">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wellness1;
