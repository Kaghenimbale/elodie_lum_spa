"use client";

import Image from "next/image";
import Form from "./Form";
import SpaServices from "./SpaServices";
import { useTranslations } from "next-intl";

const page = () => {
  const t = useTranslations("service");
  const services = t.raw("icons") as {
    icon: any;
    title: string;
  }[];
  const features = t.raw("features") as string[];
  return (
    <div className="pt-36 pb-16 flex flex-col gap-5 items-center px-4 md:px-0">
      <div className="flex flex-col gap-5 items-center justify-center">
        <h2 className="text-[2rem] font-bold text-center md:text-start">
          {t("title")}
        </h2>
        <p className="md:w-[60rem] font-thin text-center">{t("description")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center lg:w-[70vw]">
        {services.map((service, index) => (
          <div
            key={index}
            className="w-[10rem] flex items-center flex-col gap-6 opacity-50 hover:opacity-100"
          >
            <Image
              src={service.icon}
              alt={`icon ${service.title}`}
              width={70}
              height={30}
            />
            <div className="flex flex-col gap-6 items-center">
              <h3 className="text-xl font-thin">{service.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div>
        <SpaServices />
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <Form />
        <div className="bg-gray-50 md:w-[50rem] flex flex-col gap-5 p-6 h-fit">
          <h2 className="text-[2rem] font-bold">{t("title1")}</h2>
          <p className="font-thin">{t("description1")}</p>
          <div className="font-thin">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
