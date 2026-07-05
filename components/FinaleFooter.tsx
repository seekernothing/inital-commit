import Image from "next/image";
import { Reveal } from "./Reveal";
import { FOOTER_COLUMNS, VIDEO_URL, LOGO_SRC } from "@/lib/data";

export function FinaleFooter() {
  return (
    <footer className="relative mt-[120px] overflow-hidden">
      {/* background video + scrim */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          src={VIDEO_URL}
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-1"
          style={{
            background:
              "linear-gradient(180deg, #0D1A2E 0%, transparent 30%, transparent 55%, #0D1A2E 100%), radial-gradient(circle at 50% 50%, transparent 40%, rgba(13,26,46,0.8) 100%), rgba(13,26,46,0.1)",
          }}
        />
      </div>

      {/* finale statement */}
      <div className="relative z-2 px-6 pb-[60px] pt-[120px] text-center">
        <Reveal>
          <h2 className="mb-6 font-serif text-[clamp(48px,7vw,110px)] font-normal leading-[1.05]">
            Ready for a shorter{" "}
            <em className="italic text-accent [text-shadow:0_0_40px_rgba(240,178,90,.35)]">
              busy season?
            </em>
          </h2>
        </Reveal>
        <Reveal>
          <a
            href="#"
            className="group relative inline-block pb-1 font-mono text-[16px] tracking-[0.1em] text-ink"
          >
            hello@signalshq.io ↗
            <span className="absolute bottom-0 left-0 right-0 h-px origin-right scale-x-0 bg-accent transition-transform duration-[400ms] group-hover:origin-left group-hover:scale-x-100" />
          </a>
        </Reveal>
      </div>

      {/* footer glass card */}
      <div className="relative z-2 mx-auto max-w-[1100px] px-6 pb-[46vh]">
        <Reveal className="glass-card overflow-hidden">
          <div className="flex flex-wrap justify-between gap-11 p-11">
            <div>
              <div className="flex items-start gap-3">
                <div>
                  <Image
                    src={LOGO_SRC}
                    alt="SignalsHQ"
                    width={160}
                    height={40}
                    className="mb-0.5 h-10 w-auto object-contain"
                  />
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">
                    Tax · Automated
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-[60px]">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.heading}>
                  <h4 className="mb-3.5 font-mono text-[10.5px] uppercase tracking-[0.28em] text-ink">
                    {col.heading}
                  </h4>
                  {col.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block py-1 text-[14px] font-medium text-muted transition-colors duration-[250ms] hover:text-accent"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-11 py-5">
            <span className="font-mono text-[13px] text-muted">
              © 2026 SIGNALSHQ · ALL RIGHTS RESERVED
            </span>
            <div className="flex gap-2.5">
              <a
                href="#"
                aria-label="X"
                className="grid h-[38px] w-[38px] place-items-center rounded-full border border-line text-muted transition-all duration-300 hover:border-accent hover:bg-accent hover:text-bg"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.9 2H22l-7 8 8.3 12h-6.5l-5-7.3L5.9 22H2.8l7.5-8.6L2.4 2H9l4.5 6.6L18.9 2z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="grid h-[38px] w-[38px] place-items-center rounded-full border border-line text-muted transition-all duration-300 hover:border-accent hover:bg-accent hover:text-bg"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.09h4.56V24H.22zM8.34 8.09h4.37v2.17h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 6.99V24h-4.55v-8.09c0-1.93-.04-4.41-2.69-4.41-2.69 0-3.1 2.1-3.1 4.27V24H8.34z" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
