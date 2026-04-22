import Link from "next/link";

const RESUME =
  "https://drive.google.com/file/d/1fkFBJolPKDaGf-20K4hnMXqrLFDM98ma/view?usp=sharing";

export function Footer() {
  return (
    <footer className="border-t border-line/15 bg-surface/40 py-12 dark:bg-surface/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-muted">© {new Date().getFullYear()} Anuraag Tripathy</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            <Link className="transition hover:text-accent" href="https://github.com/AnuraagTripathy">
              GitHub
            </Link>
            <Link
              className="transition hover:text-accent"
              href="https://www.linkedin.com/in/anuraagtripathy/"
            >
              LinkedIn
            </Link>
            <Link className="transition hover:text-accent" href={RESUME}>
              Résumé
            </Link>
          </div>
        </div>
        <p className="font-quirk text-center text-lg text-ink-soft sm:text-left">
          P.S. yes, the tilde is on purpose ~
        </p>
      </div>
    </footer>
  );
}
