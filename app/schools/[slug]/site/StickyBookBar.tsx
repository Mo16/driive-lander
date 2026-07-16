"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only sticky CTA — appears once the hero booking card (#book) has left
 * the viewport and anchors straight back to it. Redundant navigation, so being
 * JS-gated is fine: no content ever depends on it.
 */
export function StickyBookBar({ label, targetId }: { label: string; targetId: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting));
    io.observe(target);
    return () => io.disconnect();
  }, [targetId]);

  if (!shown) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom),12px)] lg:hidden">
      <a
        href={`#${targetId}`}
        className="animate-fade-in flex h-12 items-center justify-center rounded-xl text-[15px] font-medium shadow-[0_4px_14px_color-mix(in_oklab,var(--brand)_30%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand)]"
        style={{ backgroundColor: "var(--brand)", color: "var(--cta-text)" }}
      >
        {label}
      </a>
    </div>
  );
}
