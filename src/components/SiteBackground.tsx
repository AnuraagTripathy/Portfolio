"use client";

import { ShaderBackground } from "@/components/ui/repeat-start";

export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <ShaderBackground className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />
    </div>
  );
}
