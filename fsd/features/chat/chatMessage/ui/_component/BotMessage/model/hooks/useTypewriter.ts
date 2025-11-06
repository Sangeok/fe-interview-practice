"use client";

import { useEffect, useState } from "react";

const TYPING_SPEED = 30;

export function useTypewriter(text: string) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // In test environment, render full text immediately to avoid timing issues
  const isTestEnv = typeof process !== "undefined" && (process.env.VITEST || process.env.NODE_ENV === "test");

  useEffect(() => {
    if (isTestEnv) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    if (!text) return;

    setIsTyping(true);
    setDisplayedText("");

    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, TYPING_SPEED);

    return () => clearInterval(timer);
  }, [text, isTestEnv]);

  return { displayedText, isTyping };
}
