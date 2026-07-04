"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

/**
 * Vertical timeline rail that fills with an accent gradient as the user
 * scrolls through the list it sits beside. Rendered absolutely inside a
 * relatively-positioned list so it spans the full height.
 */
export function TimelineProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.55"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.5 });

  return (
    <div ref={ref} aria-hidden className="absolute inset-y-0 left-0 w-px">
      <div className="absolute inset-0 bg-line/15" />
      {!reduce && (
        <motion.div
          style={{ scaleY }}
          className="absolute inset-0 origin-top bg-gradient-to-b from-pastel-mint via-accent-soft to-pastel-peach"
        />
      )}
    </div>
  );
}
