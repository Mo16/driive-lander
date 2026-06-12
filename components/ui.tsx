import Link from "next/link";
import type { ReactNode } from "react";

/* ----------------------------- design tokens ------------------------------
   See CLAUDE.md. Import these everywhere — never hardcode new hexes.
--------------------------------------------------------------------------- */

export const BLUE = "#2546F5";
export const PINK = "#F9D7E2";
export const CREAM = "#F0EEE7";
export const INK = "#0C0C0E";

export const CONTAINER = "mx-auto w-full max-w-[1380px] px-6 lg:px-12";

/* ---------------------------------- icons --------------------------------- */

export const Arrow = ({ className = "" }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    className={className}
  >
    <path
      d="M5 12h14m-6-6 6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Check = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden
    className={`h-5 w-5 shrink-0 ${className}`}
  >
    <rect
      x="1"
      y="1"
      width="18"
      height="18"
      rx="5"
      className="fill-current opacity-15"
    />
    <path
      d="m6 10.5 2.6 2.6L14.2 7.4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function LogoMark({
  tile,
  road,
  className = "",
}: {
  tile: string;
  road: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <rect width="32" height="32" rx="9" fill={tile} />
      <path
        d="M8 23.5C14.5 22 20.5 16 22.5 8.5"
        stroke={road}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeDasharray="4.5 4.5"
        fill="none"
      />
    </svg>
  );
}

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const dark = variant === "dark";
  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <LogoMark
        tile={dark ? INK : PINK}
        road={dark ? "#FFFFFF" : BLUE}
        className="h-8 w-8"
      />
      <span
        className={`text-2xl font-semibold  tracking-tight ${
          dark ? "text-neutral-900" : "text-[#F9D7E2]"
        }`}
      >
        Driive
      </span>
    </Link>
  );
}

/* --------------------------------- shapes --------------------------------- */

/* Section divider styled as a stretch of road: the section above (`from`) meets
   the section below (`to`) at the centre, with a dashed lane line running along
   the seam — on-theme for a driving app and visible on every section colour. */
export function Road({ from, to }: { from: string; to: string }) {
  return (
    <div
      aria-hidden
      className="relative h-16 w-full overflow-hidden sm:h-24"
      style={{ backgroundColor: from }}
    >
      {/* lower lane — the next section's colour */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{ backgroundColor: to }}
      />
      {/* dashed centre line along the seam */}
      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center gap-5 sm:gap-7">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-10 shrink-0 rounded-full opacity-90 sm:h-2 sm:w-16"
            style={{ backgroundColor: INK }}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- rich text --------------------------------
   Renders copy from data files (features.ts, posts.ts) that may contain
   internal links written as [anchor text](/path) — keeps copy in data while
   letting it link to other pages. Anything else renders as plain text. */
const INLINE_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function RichText({
  text,
  linkClass = "font-medium text-[#2546F5] underline underline-offset-2",
}: {
  text: string;
  linkClass?: string;
}) {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(INLINE_LINK)) {
    const [raw, anchor, href] = match;
    const start = match.index ?? 0;
    if (start > cursor) nodes.push(text.slice(cursor, start));
    nodes.push(
      <Link key={start} href={href} className={linkClass}>
        {anchor}
      </Link>,
    );
    cursor = start + raw.length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}

export function Eyebrow({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "light";
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border-2 border-dashed px-4 py-1.5 text-sm font-medium ${
        tone === "blue"
          ? "border-[#2546F5]/30 text-[#2546F5]"
          : "border-white/30 text-[#F9D7E2]"
      }`}
    >
      {children}
    </span>
  );
}
