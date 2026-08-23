"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { roles } from "@/content/experience";

/* =====================================================================
   Working Volumes — the roles as bound books on a shelf.

   Each job is a spine: taller for the longer stints, coloured by where it
   sits in the run. Pull one out (click, or tab to it and hit enter) and the
   volume opens below the plank, so the shelf never reflows under you.
   ===================================================================== */

/* Spines darken as the shelf runs backwards in time, so the newest work
   reads brightest. Swap this list to re-palette the whole shelf. */
const SPINES = [
  "#7b6fd6",
  "#5f8fd6",
  "#4fa79a",
  "#c98a5e",
  "#b06590",
  "#6b6fa8",
  "#4c6b7a",
];

/** Roughly how long the stint ran, in months — drives the spine height. */
function months(start: string, end: string) {
  const parse = (s: string) => {
    const [m, y] = s.split(" ");
    const mi = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].indexOf(m);
    return Number(y) * 12 + (mi < 0 ? 0 : mi);
  };
  return Math.max(1, parse(end) - parse(start));
}

export function Shelf() {
  const [open, setOpen] = useState<string | null>(roles[0].id);
  const reduce = useReducedMotion();

  const active = roles.find((r) => r.id === open) ?? null;

  return (
    <div className="shf">
      <div className="shf-case">
        <div className="shf-row">
          {roles.map((r, i) => {
            const run = months(r.start, r.end);
            // thicker and taller for the longer runs, but never a monolith
            const h = 150 + Math.min(76, run * 7);
            const w = 58 + Math.min(70, run * 8);
            return (
              <button
                key={r.id}
                type="button"
                aria-expanded={open === r.id}
                aria-controls="shf-detail"
                onClick={() => setOpen(open === r.id ? null : r.id)}
                className="shf-vol"
                style={
                  {
                    "--spine": SPINES[i % SPINES.length],
                    "--h": `${h}px`,
                    "--hm": `${Math.round(h * 0.8)}px`,
                    "--w": `${w}px`,
                    "--wm": `${Math.round(w * 0.56)}px`,
                  } as React.CSSProperties
                }
                title={`${r.title} · ${r.company}`}
              >
                <span className="shf-spine-text">
                  {/* only what fits down a spine — the panel carries the rest */}
                  <span>{r.company.split(",")[0].replace(/^University of /, "U. ")}</span>
                </span>
                <span className="shf-mark" aria-hidden>
                  <Image
                    src={r.logoSrc}
                    alt=""
                    width={20}
                    height={20}
                    className="size-full object-cover"
                  />
                </span>
                <span className="sr-only">
                  {r.title} at {r.company}, {r.start} to {r.end}
                </span>
              </button>
            );
          })}
          <div className="shf-plank" aria-hidden />
        </div>
      </div>

      {/* the volume you pulled, opened on the desk */}
      <div id="shf-detail" className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          {active ? (
            <motion.article
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-line/15 bg-surface/85 p-5 shadow-card backdrop-blur-sm sm:p-7 dark:bg-surface/70 dark:shadow-none"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <span
                  className="mt-1 h-12 w-1.5 shrink-0 rounded-full"
                  style={{
                    background: SPINES[roles.indexOf(active) % SPINES.length],
                  }}
                  aria-hidden
                />
                <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-line/15 sm:size-14">
                  <Image
                    src={active.logoSrc}
                    alt={active.company}
                    width={56}
                    height={56}
                    quality={95}
                    className="size-full object-cover object-center"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">
                        {active.title}
                      </h3>
                      <p className="text-sm text-ink-muted">
                        {active.company}
                        <span className="text-ink-soft"> · </span>
                        {active.location}
                      </p>
                    </div>
                    <p className="shrink-0 font-quirk text-base text-ink-soft">
                      {active.start} to {active.end}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                    {active.summary}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                    {active.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-accent/40" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ) : (
            <motion.p
              key="closed"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-10 text-center font-quirk text-lg text-ink-soft"
            >
              Pull a volume off the shelf.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
