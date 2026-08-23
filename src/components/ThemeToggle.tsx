"use client";

import { Moon, Sun } from "lucide-react";
import { useThemePreference } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { ready, effective, setManual, resetToClock } = useThemePreference();

  if (!ready) {
    return (
      <span
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line/15 bg-surface/80"
        aria-hidden
      />
    );
  }

  const dark = effective === "dark";

  return (
    <button
      type="button"
      title="Switch theme. Alt+click: follow local time again (6am to 7pm light)."
      onClick={(e) => {
        if (e.altKey) {
          resetToClock();
          return;
        }
        setManual(dark ? "light" : "dark");
      }}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line/15 bg-surface/80 text-ink shadow-soft transition hover:border-accent/30 hover:text-accent dark:bg-surface/60"
      aria-label={dark ? "Switch to light mode (pinned)" : "Switch to dark mode (pinned)"}
    >
      {dark ? <Sun className="size-[18px]" strokeWidth={1.75} /> : <Moon className="size-[18px]" strokeWidth={1.75} />}
    </button>
  );
}
