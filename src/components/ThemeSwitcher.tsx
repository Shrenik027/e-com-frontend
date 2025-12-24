"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor, Check } from "lucide-react";

type Theme = "light" | "dark" | "system";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const resolved = saved ?? "system";
    setTheme(resolved);
    applyTheme(resolved, prefersDark);
    setMounted(true);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyTheme("system", media.matches);
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme]);

  const applyTheme = (mode: Theme, systemDark: boolean) => {
    const root = document.documentElement;
    root.classList.remove("light-theme", "dark-theme");

    if (mode === "light") {
      root.classList.add("light-theme");
      root.style.colorScheme = "light";
    } else if (mode === "dark") {
      root.classList.add("dark-theme");
      root.style.colorScheme = "dark";
    } else {
      root.classList.add(systemDark ? "dark-theme" : "light-theme");
      root.style.colorScheme = systemDark ? "dark" : "light";
    }
  };

  const changeTheme = (mode: Theme) => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(mode);
    localStorage.setItem("theme", mode);
    applyTheme(mode, prefersDark);
    setOpen(false);
  };

  if (!mounted) {
    return (
      <button className="p-2.5 rounded-lg bg-background-tertiary text-muted border border-theme">
        <Sun className="w-5 h-5" />
      </button>
    );
  }

  const currentIcon =
    theme === "light" ? (
      <Sun className="w-5 h-5" />
    ) : theme === "dark" ? (
      <Moon className="w-5 h-5" />
    ) : (
      <Monitor className="w-5 h-5" />
    );

  return (
    <div className="relative">
      {/* Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-2.5 rounded-lg
          bg-background-tertiary text-muted
          hover:text-secondary hover:bg-background-secondary
          border border-theme transition-all"
        aria-label="Change theme"
      >
        {currentIcon}
        <span className="hidden lg:inline text-sm font-medium capitalize">
          {theme}
        </span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-xl
              bg-background-tertiary border border-theme
              shadow-xl z-50 overflow-hidden"
          >
            {(["light", "dark", "system"] as Theme[]).map((mode) => (
              <button
                key={mode}
                onClick={() => changeTheme(mode)}
                className="w-full flex items-center justify-between px-4 py-3
                  text-muted hover:text-secondary hover:bg-background-secondary
                  transition-colors"
              >
                <div className="flex items-center gap-3 capitalize">
                  {mode === "light" && <Sun className="w-4 h-4" />}
                  {mode === "dark" && <Moon className="w-4 h-4" />}
                  {mode === "system" && <Monitor className="w-4 h-4" />}
                  <span className="font-medium">{mode}</span>
                </div>
                {theme === mode && <Check className="w-4 h-4 text-brand" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}
