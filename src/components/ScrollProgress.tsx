"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline pastel gradient along the bottom of the nav showing scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="absolute inset-x-0 -bottom-px h-[2px] origin-left bg-gradient-to-r from-pastel-mint via-accent-soft to-pastel-peach"
    />
  );
}
