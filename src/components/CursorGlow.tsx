"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";

/**
 * A soft pastel glow that lazily trails the cursor across the whole page.
 * Sits behind content, above the ambient blobs. Pointer devices only.
 */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  // Loose spring so the glow drifts after the cursor instead of sticking to it.
  const sx = useSpring(x, { stiffness: 60, damping: 18, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 60, damping: 18, mass: 0.8 });

  const glow = useMotionTemplate`radial-gradient(340px circle at ${sx}px ${sy}px, rgba(123, 111, 214, 0.10), rgba(211, 233, 255, 0.06) 45%, transparent 70%)`;
  const glowDark = useMotionTemplate`radial-gradient(360px circle at ${sx}px ${sy}px, rgba(155, 145, 232, 0.13), rgba(123, 111, 214, 0.05) 45%, transparent 70%)`;

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;

    function onMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setActive(true);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className={`pointer-events-none fixed inset-0 -z-10 transition-opacity duration-700 dark:hidden ${active ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: glow }}
      />
      <motion.div
        aria-hidden
        className={`pointer-events-none fixed inset-0 -z-10 hidden transition-opacity duration-700 dark:block ${active ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: glowDark }}
      />
    </>
  );
}
