import Image from "next/image";

/**
 * Right-weighted hero photograph whose OWN pixels dissolve into the wash — a
 * long, finely-eased mask on the left edge and another on the bottom so the
 * photo never meets the page with a hard seam (slop.md's verified feather
 * recipe: mask the image itself, 10+ stops, over a continuous surface).
 *
 * Decorative only (aria-hidden). Rendered at lg+ where the split hero gives it
 * clear air — below that the wash + grain carry the atmosphere so arbitrary
 * instructor photos can never fight the stacked text for contrast.
 *
 * Task 4's RouteLine rAF may drive a slight scroll parallax via the
 * [data-hero-parallax] hook; the image is fully visible without any JS.
 */

const FADE_LEFT = `linear-gradient(to left,
  rgba(0,0,0,1) 0%, rgba(0,0,0,0.996) 10%, rgba(0,0,0,0.98) 18%,
  rgba(0,0,0,0.94) 26%, rgba(0,0,0,0.87) 34%, rgba(0,0,0,0.77) 42%,
  rgba(0,0,0,0.64) 50%, rgba(0,0,0,0.5) 57%, rgba(0,0,0,0.36) 63%,
  rgba(0,0,0,0.22) 69%, rgba(0,0,0,0.1) 74%, rgba(0,0,0,0) 78%)`;

const FADE_BOTTOM = `linear-gradient(to bottom,
  rgba(0,0,0,1) 0%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.97) 58%,
  rgba(0,0,0,0.9) 64%, rgba(0,0,0,0.78) 70%, rgba(0,0,0,0.62) 76%,
  rgba(0,0,0,0.44) 82%, rgba(0,0,0,0.28) 87%, rgba(0,0,0,0.15) 91%,
  rgba(0,0,0,0.06) 95%, rgba(0,0,0,0.02) 98%, rgba(0,0,0,0) 100%)`;

export function HeroBackdrop({ src }: { src: string }) {
  return (
    <div
      aria-hidden
      data-hero-parallax
      className="absolute inset-y-0 right-0 hidden w-[72%] lg:block"
      style={{ maskImage: FADE_BOTTOM, WebkitMaskImage: FADE_BOTTOM }}
    >
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ maskImage: FADE_LEFT, WebkitMaskImage: FADE_LEFT }}
      />
    </div>
  );
}
