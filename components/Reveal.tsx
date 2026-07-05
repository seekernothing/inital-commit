"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Extra downward offset before reveal (prototype default: 24px). */
  offset?: number;
  /** Reveal duration in seconds (prototype: .8s). */
  duration?: number;
  /** Delay in seconds. */
  delay?: number;
};

/**
 * 1:1 port of the prototype's `.reveal` → `.reveal.in` transition:
 * opacity 0 → 1, translateY(24px) → 0 over .8s ease, fired once when ~12%
 * enters the viewport. Motion is disabled under prefers-reduced-motion
 * (element renders in its final state).
 */
export function Reveal({
  offset = 24,
  duration = 0.8,
  delay = 0,
  children,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: offset }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
