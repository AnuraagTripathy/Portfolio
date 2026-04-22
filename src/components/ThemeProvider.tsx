"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { getScheduledTheme } from "@/lib/scheduledTheme";

const STORAGE_KEY = "anuraag-theme-pref";

export type ThemePref = "auto" | "light" | "dark";

type ThemePrefContextValue = {
  ready: boolean;
  pref: ThemePref;
  /** Resolved theme shown on screen */
  effective: "light" | "dark";
  /** Pin light or dark (stops following the clock until reset). */
  setManual: (mode: "light" | "dark") => void;
  /** Follow local time again (6:00 to before 19:00 light). */
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

/**
 * Default: follow local clock (light 6:00 AM to before 7:00 PM).
 * User can override with the nav toggle; Alt+click the toggle to follow the clock again.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [pref, setPref] = useState<ThemePref>("auto");
  const [ready, setReady] = useState(false);
  const [autoTick, setAutoTick] = useState(0);

  useLayoutEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === "light" || raw === "dark" || raw === "auto") {
        setPref(raw);
      }
    } catch {
      /* private mode */
    }
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    if (!ready || pref !== "auto") return;
    function tick() {
      setAutoTick((t) => t + 1);
    }
    tick();
    const id = window.setInterval(tick, 30_000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [ready, pref]);

  const effective: "light" | "dark" = useMemo(() => {
    void autoTick;
    if (!ready) return "light";
    return pref === "auto" ? getScheduledTheme() : pref;
  }, [pref, autoTick, ready]);

  const persistPref = useCallback((next: ThemePref) => {
    setPref(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const setManual = useCallback(
    (mode: "light" | "dark") => {
      persistPref(mode);
    },
    [persistPref],
  );

  const resetToClock = useCallback(() => {
    persistPref("auto");
  }, [persistPref]);

  const ctx = useMemo(
    () => ({ ready, pref, effective, setManual, resetToClock }),
    [ready, pref, effective, setManual, resetToClock],
  );

  return (
    <ThemePrefContext.Provider value={ctx}>
      <NextThemesProvider
        attribute="class"
        forcedTheme={effective}
        enableSystem={false}
        defaultTheme="light"
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </ThemePrefContext.Provider>
  );
}
