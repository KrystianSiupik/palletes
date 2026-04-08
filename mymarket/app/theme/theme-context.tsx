"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { themes, ThemeName, ThemeColors } from "./themes";

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("corporate");

  useEffect(() => {
    // Załaduj zapisany motyw z localStorage
    const savedTheme = localStorage.getItem("pallettes-theme") as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const setTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
    localStorage.setItem("pallettes-theme", theme);
  };

  const colors = themes[currentTheme];

  // Ustaw CSS variables dla aktualnego motywu
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      if (key !== "name") {
        const cssVarName = `--theme-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        root.style.setProperty(cssVarName, value);
      }
    });
  }, [colors]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
