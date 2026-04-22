"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = ["Oh, hey.", "You made it.", "Welcome in.", "Hi, I'm Anuraag."];

export function RotatingHi() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % LINES.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p
      className="relative mb-1.5 min-h-[1.35em] font-quirk text-lg text-accent/90 text-xl sm:text-2xl"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={LINES[i]}
          initial={{ opacity: 0, y: 6, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: -6, rotate: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-0 inline-block origin-left"
        >
          {LINES[i]}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}
