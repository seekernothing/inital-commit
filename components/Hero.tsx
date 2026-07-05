"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { GridBox } from "./GridBox";
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

        <div className="relative mb-6 inline-flex items-center justify-center px-6 py-2.5">
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute inset-0 border border-line" />
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="absolute -left-[7.5px] -top-[7.5px] text-accent/60">
              <path d="M7.5 0V15M0 7.5H15" stroke="currentColor" />
            </svg>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="absolute -right-[7.5px] -top-[7.5px] text-accent/60">
              <path d="M7.5 0V15M0 7.5H15" stroke="currentColor" />
            </svg>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="absolute -bottom-[7.5px] -left-[7.5px] text-accent/60">
              <path d="M7.5 0V15M0 7.5H15" stroke="currentColor" />
            </svg>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="absolute -bottom-[7.5px] -right-[7.5px] text-accent/60">
              <path d="M7.5 0V15M0 7.5H15" stroke="currentColor" />
            </svg>
          </div>
          <span className="relative z-1 flex items-center font-mono text-[12px] font-bold uppercase tracking-[0.35em] text-accent drop-shadow-[0_0_12px_rgba(240,178,90,0.6)]">
            <span className="mr-3 inline-block h-[1.1em] w-[0.6em] animate-pulse bg-accent shadow-[0_0_15px_rgba(240,178,90,0.8)]" />
            AI Infrastructure for Tax
          </span>
        </div>

        <h1 className="mt-[26px] max-w-[14ch] overflow-hidden font-serif text-[clamp(44px,11vw,130px)] font-normal leading-[0.98] tracking-[-0.01em]">
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
        <h1 
          className="max-w-[14ch] overflow-hidden font-serif text-[clamp(44px,11vw,130px)] font-normal leading-[0.98] tracking-[-0.01em]"
          style={{ paddingBottom: "0.15em", marginBottom: "calc(22px - 0.15em)" }}
        >
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
            onClick={() => { try { new Audio('/assets/smoothing-exit.webm').play() } catch(e){} }}
            className="cursor-pointer rounded-full border border-transparent bg-accent px-7 py-[14px] font-sans text-[14.5px] font-medium text-bg shadow-glow-amber transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-glow-amber-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Book a demo
          </a>
          <a
            href="#demo"
            onClick={() => { try { new Audio('/assets/smoothing-exit.webm').play() } catch(e){} }}
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
