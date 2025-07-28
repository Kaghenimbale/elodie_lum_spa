import { usePathname, useRouter } from "next/navigation";
import React from "react";

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    if (!newLocale) return;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.replace(newPath);
  };
  return (
    <div className="">
      <select
        className="outline-none w-[55px] h-[35px] p-2 fixed top-28 bg-cyan-950 text-white right-4 rounded-sm mg:right-10"
        name=""
        id=""
        value="🌐"
        onChange={handleChange}
      >
        <option value="">🌐</option>
        <option value="fr">Fr</option>
        <option value="en">En</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
