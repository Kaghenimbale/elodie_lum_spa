"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { IoLanguage } from "react-icons/io5"; // You can choose any icon you like

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState("en");

  useEffect(() => {
    const segments = pathname.split("/");
    if (segments[1] === "en" || segments[1] === "fr") {
      setCurrentLocale(segments[1]);
    }
  }, [pathname]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.replace(newPath);
  };

  return (
    <div className="relative w-fit text-white">
      <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
        <BiWorld className="text-white text-lg" />
      </div>

      <select
        onChange={handleChange}
        value={currentLocale}
        className="pl-8 pr-4 py-2 bg-cyan-900 text-white rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all"
      >
        <option value="en">EN</option>
        <option value="fr">FR</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
