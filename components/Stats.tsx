"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useCounter } from "@/hooks/useCounter";
import { STATS, type Stat } from "@/lib/data";

function StatItem({ value, suffix, label }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion() ?? false;
  const display = useCounter(value, inView, reduced);

  return (
    <div ref={ref} className="text-center">
      <div className="font-mono text-[clamp(42px,6vw,68px)] font-semibold tracking-[-0.04em] text-ink [text-shadow:0_0_18px_rgba(240,178,90,0.18)]">
        <span>{display}</span>
        {suffix && (
          <sup className="text-[0.45em] text-ink opacity-70">{suffix}</sup>
        )}
      </div>
      <div className="relative mt-2 inline-block font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
        {label}
        <span
          className="absolute -bottom-1.5 left-0 right-0 h-px origin-left bg-accent/35 transition-transform duration-1000 [transition-delay:0.5s] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: inView ? "scaleX(1)" : "scaleX(0)" }}
        />
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative z-1 mx-auto max-w-[1180px] px-6 py-[clamp(60px,8vw,110px)]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 text-center">
        {STATS.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
