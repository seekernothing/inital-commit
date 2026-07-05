import { Reveal } from "./Reveal";

interface SectionHeadProps {
  eyebrow: string;
  /** Heading content; pass JSX to include the italic <em> accent. */
  children: React.ReactNode;
}

/**
 * Port of the prototype's `.sec-head`: centered eyebrow + serif h2 (with
 * optional italic accent), wrapped in the reveal transition.
 */
export function SectionHead({ eyebrow, children }: SectionHeadProps) {
  return (
    <Reveal className="mb-16 flex flex-col items-center text-center">
      <span className="mb-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-accent/85">
        {eyebrow}
      </span>
      <h2 className="font-serif text-[clamp(34px,4.4vw,56px)] font-normal leading-[1.1] text-ink">
        {children}
      </h2>
    </Reveal>
  );
}
