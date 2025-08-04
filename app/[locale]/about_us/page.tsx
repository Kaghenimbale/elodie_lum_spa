import Image from "next/image";
import Testimonial from "../components/Testimonial";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const page = () => {
  const t = useTranslations("about-us");
  const t1 = useTranslations("wellness1");
  const items = t1.raw("items");
  const locale = useLocale();
  return (
    <div className="pt-28 pb-16 flex flex-col gap-5 px-4 lg:px-0">
      <div className="flex flex-col gap-5 items-center justify-center">
        <h2 className="text-[2rem] font-bold">{t("title")}</h2>
        <p className="lg:w-[60rem] font-thin text-center">{t("description")}</p>
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
            <h3 className="text-[2rem] font-bold">AB & Spa</h3>
            <p className="md:w-[30vw] font-thin">{t("about-us-abs")}</p>
            <Link
              href="/services"
              locale={locale}
              className="text-white text-[0.9rem] bg-cyan-800 w-fit px-4 py-2 rounded hover:bg-cyan-700 transition-all duration-300 ease-in-out"
            >
              {t("link")}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 lg:gap-20 py-20">
        <div className="flex flex-col gap-5 md:gap-10 p-4 md:p-0 ">
          <h3 className="text-[2rem] font-bold">{t1("title")}</h3>
          <p className="md:w-[30vw] font-thin">{t("description1")}</p>
          <ul className="list-disc font-thin list-item">
            {items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <Link
            href="/services"
            locale={locale}
            className="text-white text-[0.9rem] bg-cyan-800 w-fit px-4 py-2 rounded hover:bg-cyan-700 transition-all duration-300 ease-in-out"
          >
            {t("link")}
          </Link>
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
        <h2 className="text-[2rem] font-bold">{t("team-title")}</h2>
        <p className="md:w-[70rem] font-thin text-center">
          {t("team-description")}
        </p>
      </div>
    </div>
  );
};

export default page;
