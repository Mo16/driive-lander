import Link from "next/link";
import type { ReactNode } from "react";
import { BLUE, CREAM, INK, PINK } from "@/lib/brand";

/* ----------------------------- design tokens ------------------------------
   See CLAUDE.md. Import these everywhere — never hardcode new hexes.
--------------------------------------------------------------------------- */

export { BLUE, CREAM, INK, PINK };

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

/* Section divider: the section below (`to`) rises into the section above
   (`from`) as one gentle arc — a single soft crest, no repetition. It only
   ever uses the two section colours it joins (blue ↔ pink ↔ cream), so every
   transition reads as one seamless surface — no extra inks. */
export function Road({ from, to }: { from: string; to: string }) {
  return (
    <div
      aria-hidden
      className="-mt-px h-16 w-full sm:h-24"
      style={{ backgroundColor: from }}
    >
      {/* 1px taller than the strip so the antialiased bottom edge lands on the
          next section's matching colour — kills the hairline seam at zoom/DPI
          levels where the boundary falls mid-pixel. */}
      <svg
        className="h-[calc(100%+1px)] w-full"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80 Q720 8 1440 80 V96 H0 Z"
          fill={to}
        />
      </svg>
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
      className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium ${
        tone === "blue"
          ? "border-[#2546F5]/30 text-[#2546F5]"
          : "border-white/30 text-[#F9D7E2]"
      }`}
    >
      {children}
    </span>
  );
}
