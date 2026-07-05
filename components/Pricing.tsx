"use client";

import { useState } from "react";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { PRICING_PLANS, DEFAULT_PLAN_INDEX } from "@/lib/data";

/* prototype indicator ease: cubic-bezier(.5,1.4,.4,1), .28s */
const INDICATOR_EASE = [0.5, 1.4, 0.4, 1] as const;

export function Pricing() {
  const [active, setActive] = useState(DEFAULT_PLAN_INDEX);
  const reduced = useReducedMotion();

  return (
    <section
      id="pricing"
      className="clip-orbs relative z-1 mx-auto max-w-[1180px] px-6 pb-[clamp(90px,12vw,150px)] pt-[clamp(60px,8vw,110px)]"
    >
      {/* dotted grid layer + glow */}
      <div
        aria-hidden="true"
        className="grid-bg pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_70%_at_50%_40%,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="glow-orb"
        style={
          { top: "20%", left: "30%", "--c": "rgba(240,178,90,0.05)" } as React.CSSProperties
        }
      />

      <div className="relative z-2">
        <SectionHead eyebrow="Pricing">
          Pay for the <em className="italic text-accent">hours back.</em>
        </SectionHead>
      </div>

      {/* 3-segment control */}
      <Reveal className="mb-[60px] flex flex-col items-center">
        <div
          role="tablist"
          aria-label="Pricing tier"
          className="relative z-2 h-12 w-[340px] scale-110 rounded-full border border-line bg-bg-elevated p-[5px] tracking-[0.4px] shadow-[0_14px_40px_rgba(13,26,46,.35),0_0_0_1px_rgba(240,178,90,.04)]"
        >
          <div className="relative grid h-full w-full grid-cols-3">
            {/* sliding indicator */}
            <motion.div
              className="absolute inset-y-0 left-0 z-1 rounded-full bg-accent shadow-glow-amber-sm"
              style={{ width: "calc(100% / 3)" }}
              animate={{ x: `${active * 100}%` }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.28, ease: INDICATOR_EASE }
              }
            />
            {PRICING_PLANS.map((plan, i) => (
              <button
                key={plan.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={clsx(
                  "relative z-2 grid h-full w-full cursor-pointer place-items-center font-sans text-[14.5px] transition-colors duration-[280ms] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  active === i
                    ? "font-semibold text-bg"
                    : "font-medium text-muted",
                )}
              >
                {plan.name}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* plan cards */}
      <div className="relative z-2 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
        {PRICING_PLANS.map((plan, i) => {
          const hot = active === i;
          return (
            <div
              key={plan.id}
              className={clsx(
                "glass-card px-[30px] py-[34px] transition-all duration-[350ms]",
                hot &&
                  "-translate-y-1.5 border-accent shadow-plan-hot animate-pulse-border",
              )}
            >
              <div className="font-mono text-[12px] uppercase tracking-[0.25em] text-ink">
                {plan.name}
              </div>
              <div className="mb-0.5 mt-3.5 font-serif text-[52px]">
                {plan.price}
                <span className="font-mono text-[13px] text-muted">
                  {plan.unit}
                </span>
              </div>
              <ul className="my-[22px] mb-7 list-none text-[14px] text-ink">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="border-b border-dashed border-line py-[7px] before:font-mono before:text-accent before:content-['✓__']"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={clsx(
                  "block w-full cursor-pointer rounded-full border px-7 py-[14px] text-center font-sans text-[14.5px] font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  hot
                    ? "border-transparent bg-accent text-bg shadow-glow-amber hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-glow-amber-lg"
                    : "border-accent bg-transparent text-ink hover:text-accent",
                )}
              >
                {plan.cta}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
