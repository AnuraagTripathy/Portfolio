import Link from "next/link";
import { Mail } from "lucide-react";
import { WavyRule } from "@/components/WavyRule";

export const metadata = {
  title: "Contact",
};

const RESUME =
  "https://drive.google.com/file/d/1fkFBJolPKDaGf-20K4hnMXqrLFDM98ma/view?usp=sharing";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 pb-32 pt-14 sm:px-8 sm:pt-20">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-ink-soft">Hello</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Let&apos;s talk
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-muted">
        Roles, collaborations, or a weird bug that only happens on Tuesdays: I&apos;m around.
      </p>

      <WavyRule className="mt-10" />

      <div className="mt-12 space-y-5">
        <a
          href="mailto:anuraagt@terpmail.umd.edu"
          className="flex items-center gap-4 rounded-2xl border border-line/15 bg-surface p-6 shadow-card transition hover:border-accent/30 hover:shadow-lift dark:shadow-none dark:hover:ring-1 dark:hover:ring-line/10"
        >
          <span className="flex size-12 items-center justify-center rounded-xl bg-pastel-lilac text-accent ring-1 ring-line/15 dark:bg-accent/15 dark:ring-line/10">
            <Mail className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Email</p>
            <p className="text-sm font-medium text-ink">anuraagt@terpmail.umd.edu</p>
          </div>
        </a>

        <div className="flex flex-wrap gap-3">
          <Link
            href="https://github.com/AnuraagTripathy"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line/15 bg-pastel-mint/50 px-4 py-2 text-sm font-medium text-ink transition hover:-rotate-1 hover:shadow-soft dark:bg-pastel-mint/15"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/anuraagtripathy/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line/15 bg-pastel-sky/50 px-4 py-2 text-sm font-medium text-ink transition hover:rotate-1 hover:shadow-soft dark:bg-pastel-sky/15"
          >
            LinkedIn
          </Link>
          <Link
            href={RESUME}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line/15 bg-pastel-peach/50 px-4 py-2 text-sm font-medium text-ink transition hover:-rotate-1 hover:shadow-soft dark:bg-pastel-peach/15"
          >
            Résumé PDF
          </Link>
        </div>

        <p className="pt-4 text-center font-quirk text-lg text-ink-soft sm:text-left">
          I usually reply within a day or two ☺
        </p>
      </div>
    </main>
  );
}
