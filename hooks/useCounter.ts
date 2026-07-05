"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 → `target` when `active` becomes true, using the
 * prototype's cubic ease-out over 1400ms:  end * (1 - (1 - p)^3).
 * Returns the current displayed (rounded) value.
 *
 * When `reduced` is true (prefers-reduced-motion), the value is derived at
 * render time (target once active, else 0) — no animation, and no synchronous
 * setState inside an effect.
 */
export function useCounter(
  target: number,
  active: boolean,
  reduced = false,
  duration = 1400,
): number {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    // Reduced motion is handled by the derived return below.
    if (reduced || !active || startedRef.current) return;
    startedRef.current = true;

    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, reduced, duration]);

  if (reduced) return active ? target : 0;
  return value;
}
