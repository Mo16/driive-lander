"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Eyebrow } from "@/components/ui";

/* --------------------------------------------------------------------------
   Payment-methods orbit — every way a pupil can pay, floating around a track.

   A sibling of CalendarOrbit: on scroll into view the brand marks fade out
   from the centre to their place on a dashed ring, then drift slowly round it
   forever. Pure CSS — one continuous spin on the ring, an equal-and-opposite
   spin on each tile keeps the marks upright. Respects prefers-reduced-motion
   (marks settle, the drift stops). Logos are the real brand SVGs, served
   locally from /public/logos; cash and bank transfer carry on-brand glyphs.
   ------------------------------------------------------------------------- */

const RADIUS = 40; // percent of the stage half-width — tiles sit near the ring

/** A white squircle tile; the orbiting mark sits inside it. */
function Tile({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-14 w-14 place-items-center rounded-[1rem] bg-white shadow-[0_18px_40px_-18px_rgba(12,12,14,0.4)] ring-1 ring-black/[0.06] sm:h-16 sm:w-16">
      {children}
    </div>
  );
}

/** A real brand mark, sized to sit comfortably inside a tile. */
function Logo({
  src,
  alt,
  size = "h-7 w-7 sm:h-8 sm:w-8",
}: {
  src: string;
  alt: string;
  size?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={48}
      height={48}
      unoptimized
      className={`${size} object-contain`}
    />
  );
}

/* Wide wordmarks (Visa, Apple Pay, Google Pay) get a wider box so they read;
   square-ish marks (Mastercard, Klarna, PayPal, cash, bank) stay square. */
const WIDE = "h-6 w-10 sm:h-7 sm:w-12";
const SQUARE = "h-8 w-8 sm:h-9 sm:w-9";

type Spot = { angle: number; node: ReactNode };

/* Eight ways to pay, evenly spaced around the ring (every 45°). */
const SPOTS: Spot[] = [
  { angle: -90, node: <Logo src="/logos/visa.svg" alt="Visa" size={WIDE} /> },
  { angle: -45, node: <Logo src="/logos/mastercard.svg" alt="Mastercard" size={SQUARE} /> },
  { angle: 0, node: <Logo src="/logos/apple-pay.svg" alt="Apple Pay" size={WIDE} /> },
  { angle: 45, node: <Logo src="/logos/google-pay.svg" alt="Google Pay" size={WIDE} /> },
  { angle: 90, node: <Logo src="/logos/paypal.svg" alt="PayPal" size="h-8 w-7 sm:h-9 sm:w-8" /> },
  { angle: 135, node: <Logo src="/logos/klarna.svg" alt="Klarna" size={SQUARE} /> },
  { angle: 180, node: <Logo src="/logos/bank-transfer.svg" alt="Bank transfer" size={SQUARE} /> },
  { angle: 225, node: <Logo src="/logos/cash.svg" alt="Cash" size={SQUARE} /> },
];

export function PaymentOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`po-stage relative mx-auto aspect-square w-full max-w-[600px] ${
        revealed ? "po-in" : ""
      }`}
    >
      <style>{PO_CSS}</style>

      {/* dashed tracks */}
      <div className="po-ring absolute inset-[7%] rounded-full" />
      <div className="po-ring po-ring--inner absolute inset-[24%] rounded-full" />

      {/* the floating tiles */}
      <div className="po-orbit absolute inset-0">
        {SPOTS.map((spot, i) => {
          const a = spot.angle * (Math.PI / 180);
          const x = 50 + RADIUS * Math.cos(a);
          const y = 50 + RADIUS * Math.sin(a);
          return (
            <div
              key={spot.angle}
              className="po-item absolute"
              style={
                {
                  "--x": `${x}%`,
                  "--y": `${y}%`,
                  "--d": `${i * 70}ms`,
                } as React.CSSProperties
              }
            >
              <div className="po-spin">
                <Tile>{spot.node}</Tile>
              </div>
            </div>
          );
        })}
      </div>

      {/* the copy lives in the middle of the track */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center">
        <div className="max-w-[15rem] sm:max-w-xs">
          <Eyebrow>Every way they pay</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-neutral-900">
            However they want to pay.
          </h2>
          <p className="mx-auto mt-3 max-w-[17rem] text-[15px] leading-relaxed text-neutral-500">
            Card, Apple Pay, Google Pay, PayPal, Klarna, bank transfer or cash —
            every payment lands in the same balance.
          </p>
        </div>
      </div>
    </div>
  );
}

const PO_CSS = `
.po-ring {
  border: 1px dashed rgba(37, 70, 245, 0.16);
}
.po-ring--inner {
  border-color: rgba(37, 70, 245, 0.1);
}
.po-orbit {
  animation: po-spin 100s linear infinite;
}
.po-item {
  left: 50%;
  top: 50%;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.35);
  transition:
    left 1s cubic-bezier(0.16, 1, 0.3, 1),
    top 1s cubic-bezier(0.16, 1, 0.3, 1),
    transform 1s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.8s ease;
  transition-delay: var(--d);
}
.po-in .po-item {
  left: var(--x);
  top: var(--y);
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
.po-spin {
  animation: po-spin-rev 100s linear infinite;
}
@keyframes po-spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes po-spin-rev {
  to {
    transform: rotate(-360deg);
  }
}
@media (prefers-reduced-motion: reduce) {
  .po-orbit,
  .po-spin {
    animation: none;
  }
  .po-item {
    transition-duration: 0.4s;
  }
}
`;
