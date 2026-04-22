import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { WavyRule } from "@/components/WavyRule";

export const metadata = {
  title: "Projects",
};

const stickerRotate = ["-rotate-1", "rotate-1", "-rotate-1", "rotate-1", "-rotate-1"] as const;

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pb-28 pt-14 sm:px-8 sm:pt-18">
      <header className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-ink-soft">Portfolio</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Projects
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          Tools and prototypes aimed at real-world friction: from disaster response to rural
          healthcare access.
        </p>
      </header>

      <WavyRule className="mt-12 max-w-xl" />

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        {projects.map((p, pi) => (
          <article
            key={p.name}
            className="group flex flex-col overflow-hidden rounded-2xl bg-surface shadow-card ring-1 ring-line/15 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift dark:shadow-none dark:ring-line/10 dark:hover:ring-accent/20"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={p.image}
                alt={p.name}
                fill
                quality={90}
                className="object-cover transition duration-700 group-hover:scale-[1.02]"
                sizes="(min-width: 1280px) 580px, (min-width: 1024px) 48vw, 100vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent dark:from-surface dark:via-surface/20" />
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
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t, ti) => (
                  <span
                    key={t}
                    className={`inline-block rounded-lg border border-line/15 bg-pastel-butter/60 px-2.5 py-0.5 text-[11px] font-medium text-ink/80 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] dark:bg-pastel-butter/10 dark:text-ink/90 dark:shadow-none ${stickerRotate[ti % stickerRotate.length]}`}
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
        ))}
      </div>
    </main>
  );
}
