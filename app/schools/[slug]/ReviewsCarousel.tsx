"use client";

import { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ReviewItem } from "@/lib/site-types";

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={cn(
            "h-3.5 w-3.5",
            n <= Math.round(rating) ? "fill-primary text-primary" : "fill-line text-line",
          )}
        />
      ))}
    </div>
  );
}

export function ReviewsCarousel({ reviews }: { reviews: ReviewItem[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = reviews.length;

  const go = (n: number) => setI((n + count) % count);

  // Auto-advance every 5s unless the visitor is hovering/interacting.
  useEffect(() => {
    if (paused || count <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % count), 5000);
    return () => clearInterval(t);
  }, [paused, count]);

  if (count === 0) return null;

  return (
    <div
      className="select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-line bg-primary-soft p-4">
        <Quote className="absolute right-3 top-3 h-8 w-8 text-primary-light" />
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {reviews.map((r, idx) => (
            <figure key={idx} className="w-full shrink-0 pr-1">
              <Stars rating={r.rating} className="mb-2" />
              <blockquote className="text-sm leading-relaxed text-ink">“{r.body}”</blockquote>
              <figcaption className="mt-3 text-xs">
                <span className="font-bold text-ink">{r.author}</span>
                {r.role && <span className="text-muted"> · {r.role}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-1.5">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Review ${idx + 1}`}
                onClick={() => go(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === i ? "w-5 bg-primary" : "w-1.5 bg-line hover:bg-subtle",
                )}
              />
            ))}
          </div>
          <div className="flex gap-1">
            <button
              aria-label="Previous review"
              onClick={() => go(i - 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:bg-primary-light hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next review"
              onClick={() => go(i + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:bg-primary-light hover:text-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
