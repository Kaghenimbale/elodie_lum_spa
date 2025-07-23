"use client";
import { useEffect } from "react";

export default function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const body = document.body;
    const originalStyle = body.style.overflowY;

    if (isLocked) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = originalStyle;
    }

    return () => {
      body.style.overflowY = originalStyle;
    };
  }, [isLocked]);
}
