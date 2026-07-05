"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { VIDEO_URL } from "@/lib/data";

/* Prototype easing for the load-in (cubic-bezier(0.22,1,0.36,1)) + rev-up. */
const EASE = [0.22, 1, 0.36, 1] as const;

/** Headline lines rise from translateY(110%) inside an overflow-hidden clip. */
const lineVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: (delay: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 1, ease: EASE, delay },
  }),
};

/** Sub + CTAs fade up from translateY(20px). */
const fadeUpVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: EASE, delay },
  }),
};

export function Hero() {
  const reduced = useReducedMotion();
  const init = reduced ? "show" : "hidden";
  const anim = "show";
  // Under reduced motion, custom delay 0 lands everything immediately.
  const d = (delay: number) => (reduced ? 0 : delay);

  return (
    <header className="relative flex min-h-screen flex-col overflow-hidden">
      {/* background video + gradient scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          src={VIDEO_URL}
          className="block h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-1"
          style={{
            background:
              "linear-gradient(180deg, #0D1A2E 0%, transparent 30%, transparent 55%, #0D1A2E 100%), radial-gradient(circle at 50% 50%, transparent 40%, rgba(13,26,46,0.8) 100%), rgba(13,26,46,0.55)",
          }}
        />
      </div>

      {/* content */}
      <div className="relative z-2 flex flex-1 flex-col items-center justify-center px-6 pb-[120px] pt-[150px] text-center">
        {/* breathing amber glow orb */}
        <div
          aria-hidden="true"
          className="glow-orb"
          style={
            {
              top: "10%",
              left: "20%",
              "--c": "rgba(240,178,90,0.08)",
            } as React.CSSProperties
          }
        />

        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-accent/85">
          AI Infrastructure for Tax
        </span>

        <h1 className="mt-[26px] max-w-[14ch] overflow-hidden font-serif text-[clamp(56px,9vw,130px)] font-normal leading-[0.98] tracking-[-0.01em]">
          <motion.span
            className="block"
            variants={lineVariants}
            custom={d(0.1)}
            initial={init}
            animate={anim}
          >
            Tax season
          </motion.span>
        </h1>
        <h1 className="mb-[22px] max-w-[14ch] overflow-hidden font-serif text-[clamp(56px,9vw,130px)] font-normal leading-[0.98] tracking-[-0.01em]">
          <motion.span
            className="block italic text-accent [text-shadow:0_0_15px_rgba(240,178,90,.15)]"
            variants={lineVariants}
            custom={d(0.22)}
            initial={init}
            animate={anim}
          >
            without the grind.
          </motion.span>
        </h1>

        <motion.p
          className="max-w-[52ch] text-[clamp(15px,1.6vw,17.5px)] text-muted"
          variants={fadeUpVariants}
          custom={d(0.34)}
          initial={init}
          animate={anim}
        >
          SignalsHQ answers tax questions with IRS citations, organizes client
          documents automatically, and drafts first-pass returns — so your firm
          spends busy season advising, not typing.
        </motion.p>

        <motion.div
          className="mt-[34px] flex flex-wrap justify-center gap-[14px]"
          variants={fadeUpVariants}
          custom={d(0.46)}
          initial={init}
          animate={anim}
        >
          <a
            href="#"
            className="cursor-pointer rounded-full border border-transparent bg-accent px-7 py-[14px] font-sans text-[14.5px] font-medium text-bg shadow-glow-amber transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-glow-amber-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Book a demo
          </a>
          <a
            href="#demo"
            className="cursor-pointer rounded-full border border-accent bg-transparent px-7 py-[14px] font-sans text-[14.5px] font-medium text-ink transition-all duration-300 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            See how it works
          </a>
        </motion.div>

        {/* scroll indicator */}
        <div className="absolute bottom-[30px] left-1/2 z-5 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted">
          SCROLL
          <span className="relative h-10 w-px overflow-hidden bg-white/10">
            <span className="absolute left-0 top-0 h-5 w-px animate-scrolldown bg-accent" />
          </span>
        </div>
      </div>
    </header>
  );
}
