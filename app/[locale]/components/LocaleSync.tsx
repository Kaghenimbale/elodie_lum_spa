"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LocaleSync({ locale }: { locale: string }) {
  const router = useRouter();

  useEffect(() => {
    const savedLocale = localStorage.getItem("preferredLocale");
    if (savedLocale && savedLocale !== locale) {
      router.replace(`/${savedLocale}`);
    }
  }, [locale, router]);

  return null;
}
