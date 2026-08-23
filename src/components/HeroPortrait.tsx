"use client";

import Image from "next/image";
import { TiltCard } from "@/components/motion/TiltCard";

export function HeroPortrait() {
  return (
    <div className="relative mx-auto w-full max-w-[400px] sm:mx-0 sm:max-w-none">
      <div
        aria-hidden
        className="absolute -right-3 -top-3 hidden h-[calc(100%-8px)] w-[88%] rotate-2 rounded-[1.4rem] bg-ink ring-1 ring-ink/5 sm:block"
      />
      <div
        aria-hidden
        className="absolute -bottom-2 -left-3 hidden h-[calc(100%-12px)] w-[90%] -rotate-1 rounded-[1.4rem] bg-accent ring-1 ring-ink/5 sm:block"
      />

      <TiltCard max={7} className="relative">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.35rem] bg-surface shadow-lift ring-1 ring-line/15">
          <Image
            src="/me.jpeg"
            alt="Anuraag Tripathy"
            fill
            priority
            quality={92}
            sizes="(min-width: 1536px) 640px, (min-width: 1280px) 560px, (min-width: 1024px) 48vw, (min-width: 640px) 88vw, 92vw"
            className="object-cover object-[center_45%]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      </TiltCard>
    </div>
  );
}
