"use client";

import {
  Children,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* Reveals its children one at a time the moment the stack scrolls into view:
   each drops in from the top with a spring overshoot, staggered so they land
   sequentially — the way iOS Notification Center rolls banners in.

   With `loop`, it keeps replaying — banners drop in one by one, hold, fade out,
   then arrive again — so the iOS-style arrival is always visible on screen. */
export function RevealStack({
  children,
  className = "",
  step = 140,
  threshold = 0.35,
  loop = false,
  hold = 1900,
  gap = 650,
}: {
  children: ReactNode;
  className?: string;
  /** Delay between each child landing, in ms. */
  step?: number;
  threshold?: number;
  /** Replay the arrival on a loop while in view. */
  loop?: boolean;
  /** ms to stay fully shown before replaying (loop only). */
  hold?: number;
  /** ms hidden between cycles (loop only). */
  gap?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion: just show everything, no drop-in, no loop.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const count = Children.count(children);
    const revealDuration = (count - 1) * step + 550; // until the last has landed
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const clearTimers = () => {
      timers.forEach(clearTimeout);
      timers.length = 0;
    };

    const runCycle = () => {
      if (cancelled) return;
      setShown(true);
      if (!loop) return;
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setShown(false);
          timers.push(setTimeout(runCycle, gap));
        }, revealDuration + hold),
      );
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loop) {
            setShown(true);
            io.disconnect();
            return;
          }
          // Restart from hidden so the sequence always plays from the top.
          clearTimers();
          setShown(false);
          timers.push(setTimeout(runCycle, 60));
        } else if (loop) {
          clearTimers();
          setShown(false);
        }
      },
      { threshold },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      clearTimers();
      io.disconnect();
    };
  }, [children, step, threshold, loop, hold, gap]);

  return (
    <div ref={ref} className={className}>
      {Children.toArray(children).map((child, i) => (
        <div
          key={i}
          className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
            shown
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-5 scale-95 opacity-0"
          }`}
          style={{ transitionDelay: shown ? `${i * step}ms` : "0ms" }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
