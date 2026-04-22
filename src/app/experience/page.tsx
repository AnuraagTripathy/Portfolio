import Image from "next/image";
import { roles } from "@/content/experience";
import { WavyRule } from "@/components/WavyRule";

export const metadata = {
  title: "Experience",
};

const dotStyles = [
  "border-pastel-mint bg-pastel-mint",
  "border-pastel-sky bg-pastel-sky",
  "border-pastel-lilac bg-pastel-lilac",
  "border-pastel-peach bg-pastel-peach",
  "border-pastel-rose bg-pastel-rose",
] as const;

export default function ExperiencePage() {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-32 pt-14 sm:px-8 sm:pt-18">
      <header>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-ink-soft">Career</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Experience
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          Where I&apos;ve worked so far. Mostly startups, one research lab, one very large telecom,
          and a lot of things I didn&apos;t expect to learn.
        </p>
      </header>

      <WavyRule className="mt-10" />

      <ol className="relative mt-14 space-y-0 border-l border-line/15 pl-8 sm:pl-11">
        {roles.map((r, ri) => {
          const dot = dotStyles[ri % dotStyles.length];
          return (
            <li key={r.id} className="relative pb-12 last:pb-0">
              <span
                className={`absolute -left-[9px] top-2 size-[15px] rounded-full border-2 border-surface shadow-sm sm:-left-[11px] dark:border-surface ${dot}`}
                aria-hidden
              />
              <div className="rounded-2xl border border-line/15 bg-surface p-5 shadow-card sm:p-6 dark:shadow-none dark:ring-1 dark:ring-line/10">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-line/15 ring-1 ring-black/[0.04] dark:ring-line/10 sm:size-14">
                    <Image
                      src={r.logoSrc}
                      alt={r.company}
                      width={56}
                      height={56}
                      sizes="(max-width: 640px) 48px, 56px"
                      quality={95}
                      className="size-full min-h-full min-w-full object-cover object-center"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
                          {r.title}
                        </h2>
                        <p className="text-sm text-ink-muted">
                          {r.company}
                          <span className="text-ink-soft"> · </span>
                          {r.location}
                        </p>
                      </div>
                      <p className="shrink-0 font-quirk text-base text-ink-soft">
                        {r.start} to {r.end}
                      </p>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted">{r.summary}</p>
                    <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                      {r.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-accent/40" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-6 text-center font-quirk text-lg text-ink-soft sm:text-left">
        Newest first
        <br />
        <span className="font-mono text-sm text-ink-muted">git log --author=&quot;anuraag&quot;</span>
      </p>
    </main>
  );
}
