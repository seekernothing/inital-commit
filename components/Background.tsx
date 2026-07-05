/**
 * Shared fixed decorative layers that make the whole page read as one
 * continuous surface: the film grain and the drifting starfield. The long body
 * gradient itself lives on <body> in globals.css. Rendered once at the top of
 * the page, behind all content (z-0). No client JS needed.
 */
export function Background() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="stars-fixed" aria-hidden="true" />
    </>
  );
}
