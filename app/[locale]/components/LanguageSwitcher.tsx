"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState("en");

  // Load saved locale on first render
  useEffect(() => {
    const savedLocale = localStorage.getItem("preferredLocale");
    const segments = pathname?.split("/") || [];

    let detectedLocale = "en"; // default

    if (segments[1] === "en" || segments[1] === "fr") {
      detectedLocale = segments[1];
    }

    // Use saved locale if it exists
    if (savedLocale && savedLocale !== detectedLocale) {
      detectedLocale = savedLocale;
      // Replace URL with saved locale
      segments[1] = savedLocale;
      router.replace(segments.join("/") || "/");
    }

    setCurrentLocale(detectedLocale);
  }, [pathname, router]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    localStorage.setItem("preferredLocale", newLocale);

    const segments = pathname?.split("/") || [];

    if (segments[1] === "en" || segments[1] === "fr") {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }

    router.replace(segments.join("/") || "/");
    setCurrentLocale(newLocale);
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
