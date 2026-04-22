"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-0 z-[60] border-b border-line/15 bg-surface/80 backdrop-blur-xl backdrop-saturate-150 dark:bg-surface/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link
          href="/"
          className="group font-display text-[0.95rem] font-semibold tracking-tight text-ink transition hover:text-accent"
        >
          <span className="inline-block transition group-hover:-rotate-1">Anuraag</span>
          <span className="font-quirk text-lg text-accent">~</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="flex items-center gap-0.5 text-sm">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-2.5 py-1.5 text-ink-muted transition hover:text-ink sm:px-3",
                    active && "text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-pastel-lilac/90 shadow-soft ring-1 ring-line/15 dark:bg-accent/20 dark:ring-line/10"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
