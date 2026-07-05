"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

export interface RevealResult {
  ref: React.RefObject<HTMLDivElement | null>;
  inView: boolean;
}

/**
 * Replacement for the prototype's `.reveal` IntersectionObserver pattern.
 * Fires once when ~12% of the element enters the viewport (matching the
 * prototype's threshold: .12), exposing {ref, inView} so a component can
 * drive its own reveal transition.
 */
export function useReveal(): RevealResult {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return { ref, inView };
}
