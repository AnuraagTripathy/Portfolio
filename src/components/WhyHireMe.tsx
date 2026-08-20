"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import {
  Boxes,
  BrainCircuit,
  MessageSquareHeart,
  Trophy,
  TrendingUp,
  Users,
  Wand2,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const stats = [
  {
    icon: Trophy,
    value: 7,
    suffix: "",
    label: "hackathons won",
    note: "75% win rate.",
    bar: "from-pastel-lemon via-pastel-peach to-pastel-rose",
  },
  {
    icon: TrendingUp,
    value: 350,
    prefix: "$",
    suffix: "K",
    label: "revenue driven",
    note: "Solo, in 6 months.",
    bar: "from-pastel-mint via-pastel-sky to-pastel-lilac",
  },
] as const;

const traits = [
  { icon: Zap, lead: "Quick and effective", body: "things ship fast and on time." },
  { icon: BrainCircuit, lead: "Always learning", body: "new stack, new domain, no problem." },
  { icon: Wand2, lead: "Works independently", body: "I use AI, and ask only when it matters." },
  { icon: Users, lead: "Built for real users", body: "not demos." },
  { icon: Boxes, lead: "End to end", body: "frontend, API, model, infra." },
  { icon: MessageSquareHeart, lead: "No ego", body: "tell me it's wrong and I'll change it." },
] as const;

/** Counts up to `value` the first time it scrolls into view. */
function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

/** "Why you should hire me" — two headline numbers and six one-line reasons. */
export function WhyHireMe() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-ink-soft">The pitch</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Why you should <span className="wavy-underline">hire me</span>
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="relative overflow-hidden rounded-2xl bg-surface px-6 py-5 shadow-card ring-1 ring-line/15 transition duration-300 hover:-translate-y-1 hover:shadow-lift dark:shadow-none dark:ring-line/10 dark:hover:ring-accent/20">
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${s.bar}`} />
                <div className="flex items-center gap-4">
                  <s.icon className="size-5 shrink-0 text-accent" aria-hidden />
                  <p className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                    <Counter value={s.value} prefix={"prefix" in s ? s.prefix : ""} suffix={s.suffix} />
                  </p>
                  <div className="min-w-0">
                    <p className="font-quirk text-lg leading-tight text-accent">{s.label}</p>
                    <p className="text-sm leading-tight text-ink-muted">{s.note}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {traits.map((t, i) => (
            <li key={t.lead}>
              <Reveal
                delay={(i % 2) * 0.06}
                className="flex items-center gap-3 text-sm leading-snug sm:text-[0.95rem]"
              >
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface text-accent ring-1 ring-line/15 dark:ring-line/10">
                  <t.icon className="size-3.5" aria-hidden />
                </span>
                <span className="text-ink-muted">
                  <span className="font-medium text-ink">{t.lead}</span> — {t.body}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
