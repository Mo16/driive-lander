import Image from "next/image";
import { initials } from "@/lib/site-format";

/**
 * The instructor's own nav — a floating contained bar over the hero (spec §4).
 * Anchor links are passed in already filtered to the sections that will render
 * (computed server-side in page.tsx). Mobile shows mark + name + Book now only.
 */
export function SiteNav({
  businessName,
  logoUrl,
  links,
  showBook,
}: {
  businessName: string;
  logoUrl: string | null;
  links: { href: string; label: string }[];
  showBook: boolean;
}) {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-[1200px] px-5 pt-4 sm:px-6 sm:pt-6">
        <div className="flex h-14 items-center justify-between gap-3 rounded-full border border-[color-mix(in_oklab,var(--ink)_9%,transparent)] bg-[color-mix(in_oklab,var(--paper)_84%,transparent)] pl-4 pr-2 shadow-[0_2px_14px_color-mix(in_oklab,var(--ink)_6%,transparent)] backdrop-blur-md sm:pl-5">
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span
                aria-hidden
                className="shrink-0 font-display text-[19px] font-medium leading-none text-[var(--brand-deep)]"
              >
                {initials(businessName)}
              </span>
            )}
            <span className="truncate text-[15px] font-medium">{businessName}</span>
          </a>

          <div className="flex shrink-0 items-center gap-2 md:gap-6">
            {links.length > 0 && (
              <nav aria-label="Site sections" className="hidden items-center gap-6 md:flex">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="text-sm text-[color-mix(in_oklab,var(--ink)_68%,transparent)] transition-colors hover:text-[var(--ink)]"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            )}
            {showBook && (
              <a
                href="#book"
                className="flex h-10 items-center rounded-full px-5 text-sm font-medium transition-[filter] hover:brightness-[1.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand)]"
                style={{ backgroundColor: "var(--brand)", color: "var(--cta-text)" }}
              >
                Book now
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
