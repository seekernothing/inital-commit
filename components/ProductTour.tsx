"use client";

import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { ArrowDoodle } from "./ArrowDoodle";

/* ============================================================================
   PRODUCT TOUR — the sticky "scroll window". The structural sticky/subgrid/
   outline-frame trick lives in globals.css (.sw / .sw-step / .sw-backdrop /
   .sw-window / .sw-frame). Inner "shot" content is styled with Tailwind here.
   ============================================================================ */

/* shared floating card surface used inside the window */
const glass =
  "bg-[rgba(19,35,60,0.55)] backdrop-blur-[14px] border border-accent/10";

function StepCopy({
  eyebrow,
  children,
  points,
  comingSoon,
}: {
  eyebrow: string;
  children: React.ReactNode;
  points: string[];
  comingSoon?: boolean;
}) {
  return (
    <div className="w-full py-6 pl-6 pr-14">
      <Reveal>
        <span className="mb-4 block font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-accent/85">
          {eyebrow}
        </span>
        <h3 className="mb-[26px] text-balance font-serif text-[clamp(30px,3.2vw,46px)] font-normal leading-[1.12] text-ink">
          {children}
        </h3>
        <ul className="grid list-none gap-[13px]">
          {points.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 text-[14.5px] leading-[1.5] text-muted"
            >
              <span className="mt-0.5 grid h-[18px] w-[18px] flex-none place-items-center rounded-[5px] border border-accent/45 bg-accent/[0.08] font-mono text-[10px] text-accent">
                ✓
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        {comingSoon && (
          <span className="mt-[26px] inline-block -rotate-1 rounded-full border border-secondary px-[14px] py-1.5 font-mono text-[9.5px] tracking-[0.22em] text-secondary">
            COMING SOON
          </span>
        )}
      </Reveal>
    </div>
  );
}

export function ProductTour() {
  return (
    <section id="product" className="relative z-1">
      <div className="relative mx-auto max-w-[1180px] px-6 pt-[clamp(90px,12vw,150px)]">
        <SectionHead eyebrow="Product">
          Cut research and preparation hours with{" "}
          <em className="italic text-accent">AI-driven automation.</em>
        </SectionHead>
      </div>

      <div className="sw">
        <main className="sw-main">
          {/* STEP 01 — Tax Assist */}
          <section className="sw-step">
            <div className="sw-copy w-full">
              <StepCopy
                eyebrow="01 — Tax Assist"
                points={[
                  "Direct IRS citations & court ruling references",
                  "Federal & SALT coverage across all 50 states",
                  "Context-aware answers, tuned to each client file",
                  "Exportable memos for client-ready documentation",
                ]}
              >
                Instant, reliable answers to your{" "}
                <em className="italic text-accent">tax questions.</em>
              </StepCopy>
            </div>
            <div className="sw-visual">
              {/* handwritten note */}
              <span className="pointer-events-none absolute right-[7%] top-[12vh] z-3 -rotate-[4deg] text-center font-serif text-[16.5px] italic leading-[1.35] text-muted opacity-55">
                the frame stays put —
                <br />
                the work scrolls
                <ArrowDoodle className="mx-auto mt-2 block w-[46px] rotate-[65deg] -scale-100 text-muted" />
              </span>

              <div className="relative w-[min(90%,470px)] md:w-[min(76%,470px)]">
                <div
                  className={`ml-auto w-[86%] rounded-[16px_16px_4px_16px] ${glass} px-4 py-[13px] font-mono text-[11px] leading-[1.7] text-muted`}
                >
                  Can an S-corp shareholder claim the §1202 QSBS exclusion after
                  an F-reorg?
                </div>
                <div
                  className={`mt-[14px] w-[94%] rounded-2xl ${glass} px-5 py-[18px] shadow-[0_26px_60px_rgba(0,0,0,.45)]`}
                >
                  <div className="mb-2.5 font-mono text-[9px] tracking-[0.3em] text-accent">
                    TAX ASSIST · ANSWER
                  </div>
                  <p className="mb-3 text-[13px] leading-[1.65] text-ink">
                    No — §1202 requires C-corporation stock at issuance. The
                    F-reorg preserves basis and holding period, but S-corp years
                    don&apos;t count toward QSBS.
                  </p>
                  <div className="flex flex-wrap gap-1.5 font-mono">
                    {["IRC §1202(c)", "Rev. Rul. 2008-18", "T.C. Memo 2023-99"].map(
                      (c) => (
                        <span
                          key={c}
                          className="rounded-[5px] border border-accent/30 bg-accent/[0.07] px-[9px] py-1 text-[9.5px] tracking-[0.06em] text-accent"
                        >
                          {c}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                {/* floating tags */}
                <span className="absolute -right-3 -top-4 rotate-[3deg] animate-sw-float rounded-[7px] bg-card px-[11px] py-1.5 font-mono text-[9.5px] tracking-[0.18em] text-paper-ink shadow-[0_12px_30px_rgba(0,0,0,.45)]">
                  FEDERAL
                </span>
                <span className="absolute right-[-40px] top-[46%] -rotate-[2deg] animate-sw-float rounded-[7px] bg-card px-[11px] py-1.5 font-mono text-[9.5px] tracking-[0.18em] text-paper-ink shadow-[0_12px_30px_rgba(0,0,0,.45)] [animation-delay:-2s]">
                  STATE
                </span>
                <span className="absolute -bottom-4 -left-4 rotate-[2deg] animate-sw-float rounded-[7px] bg-card px-[11px] py-1.5 font-mono text-[9.5px] tracking-[0.18em] text-paper-ink shadow-[0_12px_30px_rgba(0,0,0,.45)] [animation-delay:-4s]">
                  LOCAL
                </span>
              </div>
            </div>
          </section>

          {/* STEP 02 — Client Organizer */}
          <section className="sw-step">
            <div className="sw-copy w-full">
              <StepCopy
                eyebrow="02 — Client Organizer"
                points={[
                  "AI document intake — drag, drop, done",
                  "K-1s, 1099s, W-2s auto-extracted at 95%+ accuracy",
                  "360° client overview with smart categorization",
                  "Automated binders, built while you sleep",
                ]}
              >
                Client data in one place.{" "}
                <em className="italic text-accent">Structured. Searchable.</em>
              </StepCopy>
            </div>
            <div className="sw-visual">
              <div className="relative w-[min(90%,470px)] md:w-[min(76%,470px)]">
                {/* stacked docs */}
                <div className="relative z-2 -mb-4 flex justify-center gap-3">
                  {[
                    { l: "W-2", r: "-5deg", mt: "6px", d: "0s" },
                    { l: "K-1", r: "2deg", mt: "0px", d: "-2.4s" },
                    { l: "1099-B", r: "6deg", mt: "8px", d: "-4.8s" },
                  ].map((doc) => (
                    <span
                      key={doc.l}
                      className="swd-doc relative animate-sw-float rounded-[7px] bg-card px-[13px] pb-[22px] pt-[14px] font-mono text-[10px] tracking-[0.14em] text-paper-ink shadow-[0_14px_34px_rgba(0,0,0,.45)]"
                      style={{
                        rotate: doc.r,
                        marginTop: doc.mt,
                        animationDelay: doc.d,
                      }}
                    >
                      {doc.l}
                    </span>
                  ))}
                </div>

                <div
                  className={`relative z-1 rounded-[20px] ${glass} px-5 pb-[14px] pt-[22px] shadow-[0_30px_70px_rgba(0,0,0,.45)]`}
                >
                  <div className="mb-1 flex items-center gap-3 border-b border-dashed border-accent/[0.18] pb-[14px]">
                    <div className="grid h-9 w-9 flex-none place-items-center rounded-full bg-secondary font-mono text-[12px] font-semibold text-bg">
                      SR
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-ink">
                        Samantha Reyes
                      </div>
                      <div className="mt-0.5 font-mono text-[9px] tracking-[0.18em] text-muted">
                        FY 2025 · 24 DOCUMENTS
                      </div>
                    </div>
                    <span className="ml-auto rounded-full border border-accent/35 px-[9px] py-1 font-mono text-[9.5px] tracking-[0.12em] text-accent">
                      360°
                    </span>
                  </div>
                  {[
                    { l: "W-2 · GUSTO", v: "99.2%" },
                    { l: "K-1 · FORM 1065", v: "97.8%" },
                    { l: "1099-B · SCHWAB", v: "98.4%" },
                  ].map((row) => (
                    <div
                      key={row.l}
                      className="flex justify-between gap-2.5 border-b border-dashed border-accent/[0.12] py-2.5 font-mono text-[10.5px] tracking-[0.08em] text-muted"
                    >
                      <span>{row.l}</span>
                      <span className="text-accent">{row.v}</span>
                    </div>
                  ))}
                  <div className="px-0 pb-1 pt-3 text-center font-mono text-[9.5px] tracking-[0.22em] text-accent">
                    BINDER AUTO-BUILT ✓
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STEP 03 — Client Review */}
          <section className="sw-step">
            <div className="sw-copy w-full">
              <StepCopy
                eyebrow="03 — Client Review"
                comingSoon
                points={[
                  "Current-year category rollups",
                  "Multi-entity support — 1040, 1065, 1120-S",
                  "Auto-generated workpapers",
                  "AI-drafted first-pass returns; 70% faster prep",
                ]}
              >
                Workpaper insight.{" "}
                <em className="italic text-accent">Zero manual grind.</em>
              </StepCopy>
            </div>
            <div className="sw-visual">
              <div className="relative w-[min(90%,470px)] md:w-[min(76%,470px)]">
                <div className="rounded-[14px] bg-card px-[22px] pb-[18px] pt-[22px] font-mono text-paper-ink shadow-[0_30px_70px_rgba(0,0,0,.55)]">
                  <div className="mb-[14px] border-b border-dashed border-line-on-light pb-2.5 text-center text-[9px] tracking-[0.2em] text-paper-sub">
                    DRAFT · FORM 1040 · REYES
                  </div>
                  <div className="mb-4 font-serif text-[clamp(30px,3vw,42px)] leading-none">
                    $700–2,000
                    <span className="font-mono text-[11px] tracking-[0.14em] text-paper-sub">
                      {" "}
                      FOUND
                    </span>
                  </div>
                  {[
                    { l: "QSBS tax credit", r: "FLAGGED" },
                    { l: "Healthcare savings", r: "FLAGGED" },
                    { l: "Home office rollup", r: "ADDED" },
                  ].map((item) => (
                    <div
                      key={item.l}
                      className="flex justify-between gap-2.5 py-[7px] text-[11px]"
                    >
                      <span className="before:text-paper-amber before:content-['✓_']">
                        {item.l}
                      </span>
                      <span className="text-[9.5px] tracking-[0.14em] text-paper-amber">
                        {item.r}
                      </span>
                    </div>
                  ))}
                  <div className="swr-bar mt-[14px] h-[30px]" />
                </div>
                <span className="absolute -right-[14px] -top-[14px] rotate-[4deg] bg-secondary px-3 py-1.5 font-mono text-[9px] tracking-[0.2em] text-ink shadow-[0_10px_26px_rgba(0,0,0,.4)]">
                  FIRST-PASS READY
                </span>
              </div>
            </div>
          </section>

          {/* sticky backdrop + window frame */}
          <div className="sw-backdrop" aria-hidden="true" />
          <div className="sw-window" aria-hidden="true">
            <div className="sw-frame" />
          </div>
        </main>
      </div>
    </section>
  );
}
