import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ProjectShowcase } from "@/components/ProjectShowcase";

export const metadata = {
  title: "Projects",
};

const stickerRotate = ["-rotate-1", "rotate-1", "-rotate-1", "rotate-1", "-rotate-1"] as const;

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-28 pt-6 sm:px-8 sm:pt-8">
      <header className="max-w-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft">Portfolio</p>
        <h1 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Projects
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-[15px]">
          Tools and prototypes aimed at real-world friction: from disaster response to rural
          healthcare access.
        </p>
      </header>

      <div className="mt-3">
        <ProjectShowcase />
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        {projects.map((p, pi) => (
          <Reveal key={p.name} delay={(pi % 2) * 0.08} className="h-full">
            <TiltCard className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-black/60 shadow-card ring-1 ring-white/10 backdrop-blur-md transition duration-300 hover:shadow-lift hover:ring-fuchsia-400/30">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={p.image}
                alt={p.name}
                fill
                quality={90}
                className="object-cover transition duration-700 group-hover:scale-[1.02]"
                sizes="(min-width: 1280px) 580px, (min-width: 1024px) 48vw, 100vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <span className="absolute right-4 top-4 rounded-full bg-surface/90 px-2.5 py-0.5 font-quirk text-sm text-ink-muted shadow-soft ring-1 ring-line/15 dark:bg-surface/95 dark:ring-line/10">
                #{pi + 1}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">
                  {p.period}
                </p>
                <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
                  {p.name}
                </h2>
                {p.subtitle ? (
                  <p className="mt-1 text-sm font-medium text-ink-muted">{p.subtitle}</p>
                ) : null}
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t, ti) => (
                  <span
                    key={t}
                    className={`inline-block rounded-lg border border-ink/15 bg-ink/10 px-2.5 py-0.5 text-[11px] font-medium text-ink shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] dark:border-accent/20 dark:bg-accent/10 dark:text-ink dark:shadow-none ${stickerRotate[ti % stickerRotate.length]}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap gap-4 pt-1">
                {p.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:text-accent-muted"
                  >
                    {l.label}
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </Link>
                ))}
                  </div>
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
