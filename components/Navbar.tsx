"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { NAV_GROUPS, LOGO_SRC, SOUND } from "@/lib/data";

const EASE = [0.625, 0.05, 0, 1] as const;

/** Stagger for the mega-menu links — mirrors the prototype's nth-child delays. */
const linkVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.03, duration: 0.4, ease: EASE },
  }),
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduced = useReducedMotion();
  const lastY = useRef(0);
  const enterSound = useRef<HTMLAudioElement | null>(null);
  const exitSound = useRef<HTMLAudioElement | null>(null);

  // Preload the toggle sounds (client only).
  useEffect(() => {
    enterSound.current = new Audio(SOUND.navEnter);
    exitSound.current = new Audio(SOUND.navExit);
  }, []);

  const playSound = useCallback((isEnter: boolean) => {
    const s = isEnter ? enterSound.current : exitSound.current;
    if (!s) return;
    s.currentTime = 0;
    s.play().catch(() => {});
  }, []);

  const toggle = useCallback(() => {
    setOpen((o) => {
      playSound(!o);
      return !o;
    });
  }, [playSound]);

  const close = useCallback(() => {
    setOpen((o) => {
      if (o) playSound(false);
      return false;
    });
  }, [playSound]);

  // Escape closes the menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  // Scroll hide/show: hide when scrolling down past the top, show on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (open) {
        lastY.current = y;
        return;
      }
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <>
      {/* backdrop */}
      <div
        onClick={close}
        aria-hidden="true"
        className={clsx(
          "fixed inset-0 z-[99] bg-[rgba(11,22,39,0.8)] backdrop-blur-[4px] transition-opacity duration-500",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <motion.nav
        initial={false}
        animate={{
          y: hidden && !reduced ? "-150%" : "0%",
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{ translateX: "-50%" }}
        className={clsx(
          "fixed left-1/2 top-4 z-[100] w-[95%] overflow-hidden rounded-xl border border-line bg-bg-elevated shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
          "transition-[max-width] duration-500 [transition-timing-function:cubic-bezier(.625,.05,0,1)]",
          open ? "max-w-[960px]" : "max-w-[700px]",
        )}
      >
        {/* header row */}
        <div className="relative z-2 flex items-center justify-between bg-bg-elevated p-1.5">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="group flex items-center gap-2 rounded-lg py-2 pl-3 pr-4 text-ink transition-colors duration-[400ms] [transition-timing-function:cubic-bezier(.625,.05,0,1)] hover:bg-accent/10 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
          >
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span
                className={clsx(
                  "absolute h-[1.5px] w-6 bg-ink transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(.625,.05,0,1)] group-hover:bg-accent",
                  open ? "translate-y-0 rotate-45" : "-translate-y-1",
                )}
              />
              <span
                className={clsx(
                  "absolute h-[1.5px] w-6 bg-ink transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(.625,.05,0,1)] group-hover:bg-accent",
                  open ? "translate-y-0 -rotate-45" : "translate-y-1",
                )}
              />
            </span>
            <span className="font-sans text-sm font-medium transition-colors duration-[400ms]">
              Menu
            </span>
          </button>

          <a
            href="#"
            className={clsx(
              "absolute left-1/2 flex -translate-x-1/2 items-center gap-[9px] font-semibold text-ink transition-opacity duration-300",
              open && "opacity-0",
            )}
          >
            <Image
              src={LOGO_SRC}
              alt="SignalsHQ"
              width={120}
              height={30}
              className="h-[30px] w-auto object-contain"
              priority
            />
          </a>

          <div className="flex items-center gap-2">
            <a
              href="#"
              onClick={() => { try { new Audio('/assets/smoothing-exit.webm').play() } catch(e){} }}
              className="block rounded-lg bg-accent/10 px-[18px] py-2.5 text-[13.5px] font-medium text-accent transition-colors duration-[400ms] hover:bg-accent/20"
            >
              Book a demo
            </a>
          </div>
        </div>

        {/* expanding mega-menu (grid-rows 0fr → 1fr trick) */}
        <div
          className={clsx(
            "grid transition-[grid-template-rows] duration-500 [transition-timing-function:cubic-bezier(.625,.05,0,1)]",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div
            className={clsx(
              "overflow-hidden border-t transition-opacity duration-[400ms]",
              open
                ? "border-line opacity-100 delay-100"
                : "border-transparent opacity-0",
            )}
          >
            <div className="grid max-h-[65vh] grid-cols-1 gap-4 overflow-y-auto p-4 md:grid-cols-3">
              {NAV_GROUPS.map((group, gi) => (
                <div
                  key={group.heading}
                  className={clsx(
                    "flex flex-col gap-5 rounded-lg p-6 transition-colors duration-[400ms]",
                    group.muted && "bg-[rgba(13,26,46,0.6)]",
                  )}
                >
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    {group.heading}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {group.links.map((link, li) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        onClick={close}
                        custom={gi * 3 + li}
                        variants={linkVariants}
                        initial="hidden"
                        animate={open ? "show" : "hidden"}
                        className="group/link relative w-fit font-sans text-[22px] text-muted transition-colors duration-[400ms] hover:text-ink"
                      >
                        <span>{link.label}</span>
                        <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(.625,.05,0,1)] group-hover/link:origin-left group-hover/link:scale-x-100" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
