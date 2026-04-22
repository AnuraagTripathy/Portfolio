"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export function HeroPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(mx, { stiffness: 260, damping: 28 });
  const ry = useSpring(my, { stiffness: 260, damping: 28 });

  const shine = useMotionTemplate`radial-gradient(380px circle at ${rx}% ${ry}%, rgba(255,255,255,0.55), transparent 52%)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  function onLeave() {
    mx.set(50);
    my.set(38);
  }

  return (
    <div className="relative mx-auto w-full max-w-[400px] sm:mx-0 sm:max-w-none">
      <div
        aria-hidden
        className="absolute -right-3 -top-3 hidden h-[calc(100%-8px)] w-[88%] rotate-2 rounded-[1.4rem] bg-pastel-lemon/90 ring-1 ring-ink/5 dark:bg-pastel-lemon/25 dark:ring-line/10 sm:block"
      />
      <div
        aria-hidden
        className="absolute -bottom-2 -left-3 hidden h-[calc(100%-12px)] w-[90%] -rotate-1 rounded-[1.4rem] bg-pastel-rose/80 ring-1 ring-ink/5 dark:bg-pastel-rose/25 dark:ring-line/10 sm:block"
      />

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative aspect-[4/5] w-full overflow-hidden rounded-[1.35rem] bg-surface shadow-lift ring-1 ring-line/15 dark:shadow-none dark:ring-line/10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-lilac/35 via-transparent to-pastel-sky/25 dark:from-pastel-lilac/15 dark:to-pastel-sky/10" />
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundImage: shine }}
        />
        <Image
          src="/me.jpeg"
          alt="Anuraag Tripathy"
          fill
          priority
          quality={92}
          sizes="(min-width: 1536px) 640px, (min-width: 1280px) 560px, (min-width: 1024px) 48vw, (min-width: 640px) 88vw, 92vw"
          className="object-cover object-[center_45%]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white/85 to-transparent dark:from-surface/95" />
      </motion.div>
    </div>
  );
}
