import clsx from "clsx";

export function GridBox({ className }: { className?: string }) {
  return (
    <div className={clsx("pointer-events-none absolute inset-y-0 z-0 hidden sm:block", className || "inset-x-6")}>
      {/* Main Box Border */}
      <div className="absolute inset-0 border border-line" />
      
      {/* Extended horizontal lines */}
      <div className="absolute left-1/2 top-0 h-px w-[100vw] -translate-x-1/2 bg-line opacity-40" />
      <div className="absolute bottom-0 left-1/2 h-px w-[100vw] -translate-x-1/2 bg-line opacity-40" />
      
      {/* Extended vertical lines with fade */}
      <div 
        className="absolute -bottom-[100px] -top-[100px] left-0 w-px bg-line opacity-60" 
        style={{ WebkitMaskImage: "linear-gradient(to bottom, transparent, black 100px, black calc(100% - 100px), transparent)" }}
      />
      <div 
        className="absolute -bottom-[100px] -top-[100px] right-0 w-px bg-line opacity-60" 
        style={{ WebkitMaskImage: "linear-gradient(to bottom, transparent, black 100px, black calc(100% - 100px), transparent)" }}
      />

      {/* Corner Crosshairs */}
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
  );
}
