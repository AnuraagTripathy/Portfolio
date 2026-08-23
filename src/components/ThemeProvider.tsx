"use client";

import { createContext, useContext, useMemo } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemePrefContextValue = {
  ready: boolean;
  pref: "dark";
  effective: "dark";
  setManual: (mode: "light" | "dark") => void;
  resetToClock: () => void;
};

const ThemePrefContext = createContext<ThemePrefContextValue | null>(null);

export function useThemePreference() {
  const ctx = useContext(ThemePrefContext);
  if (!ctx) {
    throw new Error("useThemePreference must be used inside ThemeProvider");
  }
  return ctx;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const ctx = useMemo<ThemePrefContextValue>(
    () => ({
      ready: true,
      pref: "dark",
      effective: "dark",
      setManual: () => {},
      resetToClock: () => {},
    }),
    [],
  );

  return (
    <ThemePrefContext.Provider value={ctx}>
      <NextThemesProvider
        attribute="class"
        forcedTheme="dark"
        enableSystem={false}
        defaultTheme="dark"
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </ThemePrefContext.Provider>
  );
}
