"use client";

import { GridBox } from "./GridBox";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { ArrowDoodle } from "./ArrowDoodle";
import {
  RECEIPT_ROWS,
  RECEIPT_SUBTOTAL,
  SOUND,
  type ReceiptRow,
} from "@/lib/data";

const COLLAPSED = 74;
const HOVER = 78;
/* prototype: height .8s cubic-bezier(0.32,0.72,0,1) */
const EASE = [0.32, 0.72, 0, 1] as const;

function Row({ label, value, muted }: ReceiptRow) {
  // prototype: left span is ink (or paper-sub when muted); right span is always paper-sub.
  return (
    <span className="flex justify-between gap-2.5 py-0.5">
      <span className={clsx(muted ? "text-paper-sub" : "text-paper-ink")}>
        {label}
      </span>
      <span className="whitespace-nowrap font-medium text-paper-sub">
        {value}
      </span>
    </span>
  );
}

export function Receipt() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [fullHeight, setFullHeight] = useState(640);
  const reduced = useReducedMotion();

  const sheetRef = useRef<HTMLSpanElement>(null);
  const shutter = useRef<HTMLAudioElement | null>(null);

  // Measure the natural sheet height (matches prototype's --rc-full).
  const measure = useCallback(() => {
    if (sheetRef.current) setFullHeight(sheetRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    measure();
    shutter.current = new Audio(SOUND.shutter);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const toggle = useCallback(() => {
    if (shutter.current) {
      shutter.current.currentTime = 0;
      shutter.current.play().catch(() => {});
    }
    measure();
    setOpen((o) => !o);
  }, [measure]);

  const innerHeight = open ? fullHeight : hovered ? HOVER : COLLAPSED;

  return (
    <div id="features" className="clip-orbs relative">
      {/* off-edge glows */}
      <div
        aria-hidden="true"
        className="glow-orb"
        style={
          { top: "30%", right: "-10%", "--c": "rgba(240,178,90,0.05)" } as React.CSSProperties
        }
      />
      <div
        aria-hidden="true"
        className="glow-orb"
        style={
          { bottom: "10%", left: "-10%", "--c": "rgba(240,178,90,0.05)" } as React.CSSProperties
        }
      />

      <section className="relative z-2 mx-auto max-w-[1180px] px-6 py-[clamp(90px,12vw,150px)]">
        <GridBox />

        <SectionHead eyebrow="Every feature · one ledger">
          See what a season with us,{" "}
          <em className="italic text-accent">itemized.</em>
        </SectionHead>

        <Reveal
          className="relative flex flex-col items-center px-6 pb-[90px] pt-10"
          style={{ perspective: "900px" }}
        >
          {/* annotations — fade out when open */}
          <span
            className={clsx(
              "pointer-events-none absolute top-[40%] z-3 hidden -rotate-[5deg] text-center font-serif text-[19px] italic leading-[1.3] text-muted transition-opacity duration-[400ms] sm:block",
              "left-[calc(50%-275px)] max-[820px]:left-2",
              open ? "opacity-0" : "opacity-75",
            )}
          >
            <span>psst — give it a tap</span>
            <ArrowDoodle className="ml-auto mt-0.5 block w-[52px] rotate-[150deg] -scale-x-100 text-accent/80" />
          </span>
          <span
            className={clsx(
              "pointer-events-none absolute top-[40%] z-3 hidden rotate-[4deg] text-left font-serif text-[19px] italic leading-[1.3] text-muted transition-opacity duration-[400ms] sm:block",
              "right-[calc(50%-290px)] max-[820px]:right-2",
              open ? "opacity-0" : "opacity-75",
            )}
          >
            <span>
              your whole season,
              <br />
              on one slip
            </span>
            <ArrowDoodle className="ml-1 mt-1.5 block w-[52px] -rotate-[150deg] -scale-x-100 text-accent/80" />
          </span>

          <button
            type="button"
            onClick={toggle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-expanded={open}
            aria-label="View the receipt"
            className="flex cursor-pointer justify-center rounded-md border-0 bg-transparent p-0 transition-transform duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <motion.span
              className="relative block origin-top [filter:drop-shadow(0_12px_20px_rgba(0,0,0,.45))]"
              animate={
                open && !reduced
                  ? {
                      rotateX: [0, 5, 3, 0],
                      rotateZ: [0, 2.2, -2.2, 0],
                    }
                  : { rotateX: 0, rotateZ: 0 }
              }
              transition={
                open && !reduced
                  ? {
                      duration: 5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: 0.9,
                      times: [0, 0.3, 0.7, 1],
                    }
                  : { duration: 0 }
              }
            >
              <motion.span
                className="rc-inner block w-[244px] overflow-hidden"
                animate={{ height: innerHeight }}
                transition={
                  reduced ? { duration: 0 } : { duration: 0.8, ease: EASE }
                }
              >
                <span
                  ref={sheetRef}
                  className="rc-sheet relative block w-[244px] px-[18px] pb-[30px] pt-[26px] text-left font-mono text-[11px] leading-[1.7] text-paper-body"
                  style={{
                    background:
                      "linear-gradient(180deg, #FFFDF8 0%, #F3EFE6 100%)",
                  }}
                >
                  <span className="block text-center text-[13px] font-semibold tracking-[0.14em] text-paper-ink">
                    SIGNALSHQ · TAX AUTOMATION
                  </span>
                  <span className="mt-[3px] block text-center text-[9px] tracking-[0.06em] text-paper-sub">
                    BUSY SEASON LEDGER — FY 2026
                  </span>
                  <span className="my-2.5 block border-t border-dashed border-line-on-light" />
                  <span className="flex justify-between text-[10px] text-paper-sub">
                    <span>2026-04-15 04:12</span>
                    <span>#SHQ-1187</span>
                  </span>
                  <span className="my-2.5 block border-t border-dashed border-line-on-light" />

                  {RECEIPT_ROWS.map((r) => (
                    <Row key={r.label} {...r} />
                  ))}

                  <span className="my-2.5 block border-t border-dashed border-line-on-light" />
                  {RECEIPT_SUBTOTAL.map((r) => (
                    <Row key={r.label} {...r} />
                  ))}
                  <span className="mt-1.5 flex justify-between gap-2.5 text-[13px] font-semibold text-paper-ink">
                    <span>HOURS BACK</span>
                    <span className="text-paper-amber">300+</span>
                  </span>

                  <span className="my-2.5 block border-t border-dashed border-line-on-light" />
                  <span className="rc-barcode mt-2 block h-[30px]" />
                  <span className="mt-1.5 block text-center text-[9px] tracking-[0.3em] text-paper-sub">
                    SHQ 8817 3305
                  </span>
                  <span className="mt-[14px] flex items-center justify-center gap-[14px]">
                    <span className="rc-qr block h-[58px] w-[58px] flex-none" />
                    <span className="max-w-[80px] text-[9px] leading-[1.4] tracking-[0.06em] text-paper-sub">
                      SCAN TO BOOK A DEMO
                    </span>
                  </span>
                  <span className="mt-[14px] block text-center text-[10px] tracking-[0.2em] text-paper-body">
                    *** SHORTER BUSY SEASON ***
                  </span>
                </span>
              </motion.span>
            </motion.span>
          </button>
        </Reveal>
      </section>
    </div>
  );
}
