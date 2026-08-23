"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";
import { projects } from "@/content/projects";
import { projectSlides } from "@/lib/project-slides";

export function ProjectShowcase({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const project = projects[index] ?? projects[0];

  return (
    <div>
      <CoverflowCarousel
        slides={projectSlides}
        onSelect={setIndex}
        showCaption
        showMeta={false}
        showNavigation
        showPagination
        label="Projects"
        cardWidth={compact ? "clamp(132px, 18vw, 200px)" : "clamp(148px, 20vw, 228px)"}
        className="text-ink"
      />
      {project && !compact ? (
        <div className="mx-auto mt-3 max-w-2xl rounded-2xl border border-white/10 bg-black/55 px-5 py-4 shadow-[0_0_40px_rgba(255,43,214,0.12)] backdrop-blur-md sm:px-6 sm:py-5">
          <p className="text-[11px] font-medium uppercase tracking-wider text-cyan-300/80">
            {project.period}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-200">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tech.slice(0, 8).map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-fuchsia-400/25 bg-fuchsia-500/10 px-2.5 py-0.5 text-[11px] font-medium text-zinc-100"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
              >
                {link.label}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
