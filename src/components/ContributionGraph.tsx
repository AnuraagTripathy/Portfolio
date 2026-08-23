"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import "react-github-calendar/tooltips.css";
import { Reveal } from "@/components/motion/Reveal";
import { useThemePreference } from "@/components/ThemeProvider";

const USERNAME = "AnuraagTripathy";

/** Black → magenta → cyan (not GitHub green). */
const theme = {
  light: ["#111113", "#3a0a32", "#ff2bd6", "#00f5ff", "#f5ff3a"],
  dark: ["#111113", "#3a0a32", "#ff2bd6", "#00f5ff", "#f5ff3a"],
};

export function ContributionGraph() {
  const { effective } = useThemePreference();
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [canvasHeight, setCanvasHeight] = useState<number | undefined>();

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas || !mounted) return;

    const measure = () => {
      const naturalWidth = canvas.scrollWidth;
      if (naturalWidth <= 0) return;
      // Stretch to the full content width (up or down) — no leftover gutter.
      const next = frame.clientWidth / naturalWidth;
      setScale(next);
      setCanvasHeight(canvas.scrollHeight * next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [mounted, effective]);

  return (
    <section className="pb-20 pt-4 sm:pb-24 sm:pt-6">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-xl">
          <h2 className="font-quirk text-3xl leading-none text-accent sm:text-4xl">
            Ship, ship, ship!
          </h2>
          <p className="mt-3 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            Get the hell off of localhost.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
            Last year on GitHub. The squares are the receipt.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 min-w-0">
          <div
            ref={frameRef}
            className="w-full max-w-full overflow-hidden text-ink-muted"
            style={{ height: canvasHeight }}
          >
            <div
              ref={canvasRef}
              className="w-max max-w-none origin-top-left will-change-transform"
              style={{ transform: `scale(${scale})` }}
            >
              {mounted ? (
                <GitHubCalendar
                  username={USERNAME}
                  year="last"
                  colorScheme={effective}
                  theme={theme}
                  fontSize={12}
                  blockSize={12}
                  blockMargin={3}
                  blockRadius={2}
                  showWeekdayLabels={["mon", "wed", "fri"]}
                  labels={{
                    totalCount: "{{count}} contributions in the last year",
                  }}
                />
              ) : (
                <div className="h-[132px] w-[720px] rounded-lg bg-white/5" aria-hidden />
              )}
            </div>
          </div>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex font-quirk text-lg text-ink-soft transition hover:text-accent"
          >
            @{USERNAME} →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
