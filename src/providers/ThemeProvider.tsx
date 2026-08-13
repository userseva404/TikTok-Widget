"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";

export type Theme = "light" | "dark" | "OS";

interface IThemeContext {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

interface Props {
  children?: React.ReactNode;
}

export function ThemeProvider({ children }: Props) {
  const [theme, setThemeState] = useState<Theme>("OS");
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    (() => setMounted(true))();
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      (() => setThemeState(storedTheme))();
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useLayoutEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    const applyTheme = (currentTheme: Theme) => {
      if (currentTheme === "OS") {
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        root.setAttribute("data-theme", systemPrefersDark ? "dark" : "light");
      } else {
        root.setAttribute("data-theme", currentTheme);
      }
    };

    applyTheme(theme);

    if (theme === "OS") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleSystemChange = () => applyTheme("OS");

      mediaQuery.addEventListener("change", handleSystemChange);
      return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
