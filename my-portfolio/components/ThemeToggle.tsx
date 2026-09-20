"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  // SSR default is "dark". The useEffect will correct this immediately on the client
  // if the inline script in layout.tsx set it to "light" before React hydrated.
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Read the value already set by the inline script (Task 2.1)
    const stored = document.documentElement.dataset.theme as "light" | "dark";
    setTheme(stored === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      // Ignore if localStorage is blocked
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative flex items-center justify-center w-11 h-11 rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent hover:bg-surface transition-colors duration-150 ${
        className ?? ""
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={shouldReduceMotion ? { opacity: 0 } : { rotate: 90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { rotate: -90, scale: 0, opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
          // Ensure it takes no extra layout space causing shifts during transition
          className="absolute"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
