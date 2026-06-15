"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Eyebrow } from "@/components/ui";

/* --------------------------------------------------------------------------
   Calendar-sync orbit — the calendars Driive feeds, floating around a track.

   On scroll into view the logos fade out from the centre to their place on a
   dashed ring, then drift slowly round it forever. Pure CSS: one continuous
   spin on the ring, an equal-and-opposite spin on each tile keeps the marks
   upright. Respects prefers-reduced-motion (logos settle, the drift stops).
   Logos are the real brand SVGs, served locally from /public/logos.
   ------------------------------------------------------------------------- */

const RADIUS = 39; // percent of the stage half-width — tiles sit near the ring

/** A white squircle tile; the orbiting logo sits inside it. */
function Tile({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-16 w-16 place-items-center rounded-[1.1rem] bg-white shadow-[0_18px_40px_-18px_rgba(12,12,14,0.4)] ring-1 ring-black/[0.06] sm:h-20 sm:w-20">
      {children}
    </div>
  );
}

/** A real brand logo, sized to sit comfortably inside a tile. */
function Logo({ src, alt, size = "h-9 w-9 sm:h-11 sm:w-11" }: { src: string; alt: string; size?: string }) {
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

type Spot = { angle: number; node?: ReactNode };

/* Three real calendars, evenly spaced; small track nodes sit between them so a
   short ring still has rhythm (no invented integrations on the dots). */
const SPOTS: Spot[] = [
  { angle: -90, node: <Logo src="/logos/google-calendar.svg" alt="Google Calendar" /> },
  { angle: 30, node: <Logo src="/logos/apple.svg" alt="Apple Calendar" size="h-8 w-8 sm:h-10 sm:w-10" /> },
  { angle: 150, node: <Logo src="/logos/outlook.svg" alt="Microsoft Outlook" /> },
  { angle: -30 },
  { angle: 90 },
  { angle: 210 },
];

export function CalendarOrbit() {
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
      className={`co-stage relative mx-auto aspect-square w-full max-w-[600px] ${
        revealed ? "co-in" : ""
      }`}
    >
      <style>{CO_CSS}</style>

      {/* dashed tracks */}
      <div className="co-ring absolute inset-[7%] rounded-full" />
      <div className="co-ring co-ring--inner absolute inset-[24%] rounded-full" />

      {/* the floating tiles + track nodes */}
      <div className="co-orbit absolute inset-0">
        {SPOTS.map((spot, i) => {
          const a = spot.angle * (Math.PI / 180);
          const x = 50 + RADIUS * Math.cos(a);
          const y = 50 + RADIUS * Math.sin(a);
          return (
            <div
              key={spot.angle}
              className="co-item absolute"
              style={
                {
                  "--x": `${x}%`,
                  "--y": `${y}%`,
                  "--d": `${i * 80}ms`,
                } as React.CSSProperties
              }
            >
              {spot.node ? (
                <div className="co-spin">
                  <Tile>{spot.node}</Tile>
                </div>
              ) : (
                <span className="block h-2.5 w-2.5 rounded-full bg-[#2546F5]/25" />
              )}
            </div>
          );
        })}
      </div>

      {/* the copy lives in the middle of the track */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center">
        <div className="max-w-[15rem] sm:max-w-xs">
          <Eyebrow>Calendar sync</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-neutral-900">
            In the calendar you already use.
          </h2>
          <p className="mx-auto mt-3 max-w-[17rem] text-[15px] leading-relaxed text-neutral-500">
            Driive feeds Google, Apple and Outlook Calendar — your whole diary,
            without switching apps.
          </p>
        </div>
      </div>
    </div>
  );
}

const CO_CSS = `
.co-ring {
  border: 1px dashed rgba(37, 70, 245, 0.16);
}
.co-ring--inner {
  border-color: rgba(37, 70, 245, 0.1);
}
.co-orbit {
  animation: co-spin 90s linear infinite;
}
.co-item {
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
.co-in .co-item {
  left: var(--x);
  top: var(--y);
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
.co-spin {
  animation: co-spin-rev 90s linear infinite;
}
@keyframes co-spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes co-spin-rev {
  to {
    transform: rotate(-360deg);
  }
}
@media (prefers-reduced-motion: reduce) {
  .co-orbit,
  .co-spin {
    animation: none;
  }
  .co-item {
    transition-duration: 0.4s;
  }
}
`;
