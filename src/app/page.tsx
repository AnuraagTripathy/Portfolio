"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { HeroPortrait } from "@/components/HeroPortrait";
import { RotatingHi } from "@/components/RotatingHi";
import { WavyRule } from "@/components/WavyRule";
import { projects } from "@/content/projects";

const fade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const featured = projects.slice(0, 2);
  const cardTints = [
    "from-pastel-mint/90 to-white dark:to-surface",
    "from-pastel-sky/90 to-white dark:to-surface",
  ] as const;

  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-3 sm:px-8 sm:pt-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:pt-6">
        <div>
          <RotatingHi />
          <motion.p
            {...fade}
            transition={{ duration: 0.5 }}
            className="mb-3 mt-1 inline-flex items-center gap-2 rounded-full border border-line/15 bg-surface/80 px-3 py-1 text-[11px] font-medium text-ink-muted shadow-soft backdrop-blur-sm dark:bg-surface/60 sm:px-3.5 sm:text-xs"
          >
            <Sparkles className="size-3 text-accent sm:size-3.5" aria-hidden />
            CS + Math @ UMD · full-stack, ML, infra
          </motion.p>
          <motion.h1
            {...fade}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.35rem]"
          >
            “Builder, mostly.”
          </motion.h1>
          <motion.p
            {...fade}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-3 max-w-2xl text-base font-medium leading-snug text-ink sm:text-lg"
          >
            I&apos;m a junior at the University of Maryland studying CS and Math. I like building
            things people actually use.
          </motion.p>
          <motion.p
            {...fade}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base"
          >
            GPA 3.8, graduating Dec 2026. Most of my work sits somewhere between a frontend, an API,
            and a model doing something useful in the middle. I&apos;ve shipped document parsing pipelines at an insurtech
            startup, built a Canvas assistant that 50+ students and teachers actually used,
            automated TikTok scouting for a music label, and helped a planetary science lab
            parallelize a radiative transfer model to study Europa. I&apos;m happiest on problems
            where the system design matters as much as the model, and where someone on the other
            end notices when it works.
          </motion.p>
          <motion.div
            {...fade}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              View projects
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 rounded-full border border-line/15 bg-surface px-5 py-2.5 text-sm font-medium text-ink shadow-card transition hover:border-accent/25 hover:shadow-lift dark:shadow-none dark:hover:ring-1 dark:hover:ring-line/10"
            >
              Experience timeline
            </Link>
          </motion.div>
        </div>
        <HeroPortrait />
      </section>

      <WavyRule className="mx-auto max-w-6xl px-5 sm:px-8" />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Selected work
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                Hackathons, class builds, and side projects where I wanted the demo to match real
                use. Cards link out to more detail.
              </p>
            </div>
            <Link
              href="/projects"
              className="group inline-flex shrink-0 items-center gap-1 font-quirk text-lg text-accent transition hover:text-accent-muted"
            >
              see everything
              <span className="inline-block transition group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featured.map((p, i) => (
              <Link
                key={p.name}
                href="/projects"
                className="group relative overflow-hidden rounded-2xl bg-surface shadow-card ring-1 ring-line/15 transition duration-300 hover:-translate-y-1 hover:shadow-lift dark:shadow-none dark:ring-line/10 dark:hover:ring-accent/20"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${i === 0 ? "from-pastel-mint via-pastel-sky to-pastel-lilac" : "from-pastel-peach via-pastel-rose to-pastel-lemon"}`}
                />
                <div className="relative aspect-[16/10]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    quality={90}
                    sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, (min-width: 768px) 48vw, 96vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${cardTints[i % cardTints.length]} via-white/20 to-transparent opacity-95 dark:via-surface/30`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">
                      {p.period}
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-ink">{p.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
