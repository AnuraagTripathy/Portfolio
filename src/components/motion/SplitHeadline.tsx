"use client";

import { motion, useReducedMotion } from "framer-motion";

type SplitHeadlineProps = {
  text: string;
  className?: string;
  delay?: number;
};

/** Headline whose characters rise into place one after another, with a hover lift per letter. */
export function SplitHeadline({ text, className, delay = 0 }: SplitHeadlineProps) {
  const reduce = useReducedMotion();
  const chars = Array.from(text);

  if (reduce) {
    return (
      <motion.h1
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
      >
        {text}
      </motion.h1>
    );
  }

  return (
    <h1 className={className} aria-label={text}>
      {chars.map((c, i) => (
        <motion.span
          key={`${c}-${i}`}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: "0.6em", rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.028,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="inline-block whitespace-pre transition duration-200 ease-out hover:-translate-y-1 hover:rotate-2 hover:text-accent">
            {c}
          </span>
        </motion.span>
      ))}
    </h1>
  );
}
