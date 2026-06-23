"use client";

import { useEffect } from "react";

export const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

export const useKeyboardShortcuts = (
  handlers: Record<string, () => void>
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (handlers[key]) {
        e.preventDefault();
        handlers[key]();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlers]);
};

export const generateGlitchChar = () => {
  const chars = "!@#$%^&*()[]{}";
  return chars[Math.floor(Math.random() * chars.length)];
};

export const typeText = async (
  text: string,
  onUpdate: (text: string) => void,
  speed = 30
) => {
  for (let i = 0; i <= text.length; i++) {
    onUpdate(text.slice(0, i));
    await new Promise((resolve) => setTimeout(resolve, speed));
  }
};
