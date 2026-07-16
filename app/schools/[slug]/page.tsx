import Image from "next/image";
import type { CSSProperties } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-public";
import { gbpShort, titleCaseName } from "@/lib/site-format";
import { siteTheme } from "@/lib/site-theme";
import { PublicEnquiryForm } from "./PublicEnquiryForm";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { HeroBackdrop } from "./site/HeroBackdrop";
import { SiteNav } from "./site/SiteNav";
import { StickyBookBar } from "./site/StickyBookBar";
import type { EnquiryFormInfo, InstructorSitePublic, ReviewItem } from "@/lib/site-types";

export const dynamic = "force-dynamic";

async function getSite(slug: string): Promise<InstructorSitePublic | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase.rpc("instructor_site", { p_slug: slug });
    const row = (Array.isArray(data) ? data[0] : data) as Partial<InstructorSitePublic> | undefined;
    if (!row) return null;
    // Tolerate PostgREST's string-encoded numerics + null jsonb arrays, and
    // default the migration-0123 fields until that migration is applied.
    return {
      ...(row as InstructorSitePublic),
      gallery: Array.isArray(row.gallery) ? row.gallery : [],
      services: Array.isArray(row.services) ? row.services : [],
      reviews: Array.isArray(row.reviews) ? row.reviews : [],
      review_count: Number(row.review_count) || 0,
      rating: Number(row.rating) || 0,
      badges: Array.isArray(row.badges) ? row.badges : [],
      faqs: Array.isArray(row.faqs) ? row.faqs : [],
      cars: Array.isArray(row.cars) ? row.cars : [],
      social_links: row.social_links ?? {},
      show_cars: row.show_cars ?? true,
      accepting_new_pupils: row.accepting_new_pupils ?? true,
      years_experience: row.years_experience ?? null,
      pupils_passed: row.pupils_passed ?? null,
      pass_rate_percent: row.pass_rate_percent ?? null,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getSite(slug);
  if (!s || !s.is_pro || !s.published) {
    return { title: "Driving lessons", description: "Learn to drive." };
  }
  const desc = s.subheading || s.about || `Driving lessons with ${s.business_name}.`;
  return {
    title: `${s.business_name} — Driving lessons`,
    description: desc.slice(0, 160),
    openGraph: {
      title: `${s.business_name} — Driving lessons`,
      description: desc.slice(0, 160),
      images: s.hero_image_url ? [{ url: s.hero_image_url }] : undefined,
    },
  };
}

function TransmissionLabel(t: InstructorSitePublic["transmission_taught"]): string | null {
  if (t === "manual") return "Manual";
  if (t === "automatic") return "Automatic";
  if (t === "both") return "Manual & auto";
  return null;
}

/** Map the website payload onto the shape PublicEnquiryForm expects. */
function asBranding(s: InstructorSitePublic): EnquiryFormInfo {
  return {
    instructor_id: s.instructor_id,
    business_name: s.business_name,
    instructor_name: s.instructor_name,
    logo_url: s.logo_url,
    brand_color: s.brand_color,
    teaching_town: s.teaching_town,
    service_areas: s.service_areas,
    transmission_taught: s.transmission_taught,
    bio: s.bio,
    price_from_pence: s.price_from_pence,
    rating: s.rating,
    review_count: s.review_count,
    reviews: s.reviews,
    headline: s.headline,
    subline: s.subheading,
    enabled: true,
  };
}

/** Shortest genuine pupil voice that fits the hero (≤140 chars, 4★+). */
function pickHeroQuote(reviews: ReviewItem[]): ReviewItem | null {
  return (
    reviews
      .filter((r) => r.rating >= 4 && r.body.trim().length > 0 && r.body.trim().length <= 140)
      .sort((a, b) => a.body.trim().length - b.body.trim().length)[0] ?? null
  );
}

/**
 * The hero wash (and its grain) dissolve into the paper below over the last
 * third of the section — long and finely eased so the page reads as one
 * continuous surface with no colour seam at the fold.
 */
const WASH_FEATHER = `linear-gradient(to bottom,
  rgba(0,0,0,1) 0%, rgba(0,0,0,1) 58%, rgba(0,0,0,0.985) 64%,
  rgba(0,0,0,0.94) 70%, rgba(0,0,0,0.86) 75%, rgba(0,0,0,0.74) 80%,
  rgba(0,0,0,0.58) 85%, rgba(0,0,0,0.4) 89%, rgba(0,0,0,0.24) 93%,
  rgba(0,0,0,0.12) 96%, rgba(0,0,0,0.04) 98.5%, rgba(0,0,0,0) 100%)`;

/** Five hand-drawn stars; `filled` of them carry ink, the rest sit back tonally. */
function Stars({ rating }: { rating: number }) {
  const filled = Math.round(Math.min(5, Math.max(0, rating)));
  return (
    <span aria-hidden className="flex items-center gap-[3px] text-[var(--brand-deep)]">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-[15px] w-[15px]${i < filled ? "" : " opacity-25"}`}>
          <path
            d="M10 1.6 12.2 7.57 18.56 7.82 13.57 11.76 15.29 17.88 10 14.35 4.71 17.88 6.43 11.76 1.44 7.82 7.8 7.57 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
}

export default async function SitePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { slug } = await params;
  const { preview: previewParam } = await searchParams;
  const s = await getSite(slug);
  // The owner can preview an unpublished draft via ?preview=1 (low-sensitivity
  // marketing content; the public never sees a draft without the flag).
  const preview = previewParam === "1" || previewParam === "true";

  // Nothing to show here → send the visitor to the Driive home page. This covers
  // an unknown slug, an instructor whose Pro plan has lapsed (the site is a Pro
  // perk, so it goes dark), and an unpublished draft (unless previewing).
  if (!s || !s.is_pro || (!s.published && !preview)) {
    redirect("https://driive.app");
  }

  const theme = siteTheme(s.brand_color, s.accent_color);
  const customHeadline = s.headline?.trim() || null;
  const subheading = s.subheading || "Patient, friendly driving lessons — pass with confidence.";
  const rating = Number(s.rating) || 0;
  const firstName = titleCaseName(s.instructor_name).split(" ")[0] || s.business_name;
  const quote = pickHeroQuote(s.reviews);
  const hasForm = s.show_enquiry && !!s.form_code;

  const facts = [
    TransmissionLabel(s.transmission_taught),
    s.price_from_pence ? `From ${gbpShort(s.price_from_pence)}/hr` : null,
    s.teaching_town,
  ].filter((f): f is string => !!f);

  // Hold the display line to a composed 1–2 line arrangement whatever the
  // copy: short headlines get the full 13ch recipe, longer ones (the default
  // "Learn to drive with {name}" included) step wider and slightly smaller so
  // the type never stacks into a 3+ line staircase.
  const headlineLen = (customHeadline ?? `Learn to drive with ${s.business_name}`).trim().length;
  const headlineSizing =
    headlineLen <= 22
      ? "max-w-[13ch] text-[clamp(2.6rem,5vw,4.4rem)]"
      : headlineLen <= 42
        ? "max-w-[21ch] text-[clamp(2.5rem,4.4vw,4rem)]"
        : "max-w-[30ch] text-[clamp(2.2rem,3.5vw,3.1rem)]";

  // Anchor links only for the sections that will actually render (Task 4 ids).
  const navLinks: { href: string; label: string }[] = [];
  if (s.services.length > 0) navLinks.push({ href: "#prices", label: "Prices" });
  if (s.show_reviews && s.reviews.length > 0) navLinks.push({ href: "#reviews", label: "Reviews" });
  if (s.about || s.bio) navLinks.push({ href: "#about", label: "About" });
  if (s.faqs.length > 0) navLinks.push({ href: "#faqs", label: "FAQs" });

  return (
    <main
      id="top"
      style={theme.vars as CSSProperties}
      className="relative min-h-screen bg-[var(--paper)] text-[var(--ink)]"
    >
      {/* ---- HERO — owns the first viewport ---------------------------------- */}
      <section className="relative overflow-hidden">
        {/* Atmosphere: wash gradient + photo + grain, feathered into the paper below. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, var(--wash), var(--wash-deep))",
            maskImage: WASH_FEATHER,
            WebkitMaskImage: WASH_FEATHER,
          }}
        />
        {s.hero_image_url && <HeroBackdrop src={s.hero_image_url} />}
        <div aria-hidden className="site-grain" style={{ maskImage: WASH_FEATHER, WebkitMaskImage: WASH_FEATHER }} />

        <SiteNav businessName={s.business_name} logoUrl={s.logo_url} links={navLinks} showBook={hasForm} />

        <div
          className={`relative mx-auto grid w-full grid-cols-1 items-center gap-y-10 px-5 pb-16 pt-28 sm:px-6 lg:min-h-[100svh] lg:content-center lg:gap-x-12 lg:gap-y-9 lg:pb-24 lg:pt-32 ${
            hasForm ? "max-w-[1200px] lg:grid-cols-[1fr_minmax(380px,460px)]" : "max-w-[860px]"
          }`}
        >
          {/* Info — left */}
          <div className="lg:col-start-1 lg:row-start-1">
            <p className="text-sm text-[color-mix(in_oklab,var(--ink)_62%,transparent)]">
              Driving school{s.teaching_town ? ` · ${s.teaching_town}` : ""}
            </p>

            <h1 className={`mt-4 font-display font-medium leading-[1.04] tracking-[-0.01em] [text-wrap:balance] ${headlineSizing}`}>
              {customHeadline ?? (
                <>
                  Learn to drive with <em className="italic text-[var(--brand-deep)]">{s.business_name}</em>
                </>
              )}
            </h1>

            <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-[color-mix(in_oklab,var(--ink)_76%,transparent)]">
              {subheading}
            </p>

            {facts.length > 0 && (
              <p className="mt-8 text-[15px] font-medium">
                {facts.map((f, i) => (
                  <span key={f}>
                    {i > 0 && (
                      <span aria-hidden className="mx-2 text-[color-mix(in_oklab,var(--ink)_40%,transparent)]">
                        ·
                      </span>
                    )}
                    {f}
                  </span>
                ))}
              </p>
            )}

            {s.review_count > 0 && (
              <p className="mt-4 flex items-center gap-2.5">
                <Stars rating={rating} />
                <span className="text-sm text-[color-mix(in_oklab,var(--ink)_70%,transparent)]">
                  {rating.toFixed(1)} · {s.review_count} pupil review{s.review_count === 1 ? "" : "s"}
                </span>
              </p>
            )}

            {s.accepting_new_pupils && (
              <p className="mt-4 flex items-center gap-2 text-sm font-medium">
                {/* Tonal nudge toward ink keeps the dot visible on pastel brands. */}
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[color-mix(in_oklab,var(--brand)_78%,var(--ink))]" />
                Taking on new pupils now
              </p>
            )}
          </div>

          {/* Booking form — right (before the quote in DOM so mobile stacks
              headline → facts → form → quote, per the composition). */}
          {s.show_enquiry && s.form_code && (
            <div
              id="book"
              className={`relative scroll-mt-6 rounded-2xl border border-[color-mix(in_oklab,var(--ink)_10%,transparent)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_2px_12px_color-mix(in_oklab,var(--brand)_12%,transparent)] sm:p-7 lg:col-start-2 lg:row-start-1 ${
                quote ? "lg:row-span-2" : ""
              } ${s.hero_image_url ? "bg-white lg:bg-white/92 lg:backdrop-blur-[2px]" : "bg-white"}`}
            >
              <h2 className="font-display text-[1.7rem] font-medium leading-tight">Book your first lesson</h2>
              <p className="mt-1 text-sm text-[color-mix(in_oklab,var(--ink)_64%,transparent)]">
                Goes straight to {firstName}.
              </p>
              <div className="mt-5">
                <PublicEnquiryForm code={s.form_code} branding={asBranding(s)} />
              </div>
            </div>
          )}

          {/* One real pupil voice */}
          {quote && (
            <figure className="max-w-[46ch] lg:col-start-1 lg:row-start-2">
              <blockquote className="font-display text-[17px] italic leading-relaxed text-[color-mix(in_oklab,var(--ink)_86%,transparent)]">
                {quote.body.trim()}
              </blockquote>
              <figcaption className="mt-2 text-sm text-[color-mix(in_oklab,var(--ink)_58%,transparent)]">
                — {quote.author}
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      {/* ---- Legacy sections below the fold — replaced wholesale by Task 4 ---- */}
      <div className="mx-auto max-w-5xl px-6 py-14">
        {/* ABOUT */}
        {s.about && (
          <section className="mb-14">
            <h2 className="mb-3 text-2xl font-bold text-ink">About {s.instructor_name || s.business_name}</h2>
            <p className="max-w-3xl whitespace-pre-line text-base leading-relaxed text-muted">{s.about}</p>
          </section>
        )}

        {/* SERVICES */}
        {s.services.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-5 text-2xl font-bold text-ink">What I offer</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {s.services.map((svc, i) => (
                <div key={i} className="rounded-2xl border border-line bg-surface p-5 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-ink">{svc.title}</h3>
                    {svc.price_pence != null && (
                      <span
                        className="shrink-0 rounded-full px-3 py-1 text-sm font-bold text-ink"
                        style={{ backgroundColor: theme.accent }}
                      >
                        {gbpShort(svc.price_pence)}
                      </span>
                    )}
                  </div>
                  {svc.body && <p className="mt-2 text-sm leading-relaxed text-muted">{svc.body}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GALLERY */}
        {s.gallery.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-5 text-2xl font-bold text-ink">Gallery</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {s.gallery.map((g, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-line">
                  <Image src={g.url} alt={g.caption || ""} fill className="object-cover" sizes="(max-width: 640px) 50vw, 33vw" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* REVIEWS */}
        {s.show_reviews && s.reviews.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-5 text-2xl font-bold text-ink">What pupils say</h2>
            <div className="max-w-2xl">
              <ReviewsCarousel reviews={s.reviews} />
            </div>
          </section>
        )}

        {/* ENQUIRE (legacy duplicate of the hero form — Task 4 removes it) */}
        {s.show_enquiry && s.form_code && (
          <section id="enquire" className="scroll-mt-6">
            <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-pop">
              <div className="px-7 py-6" style={{ backgroundColor: theme.brand, color: theme.ctaText }}>
                <h2 className="text-2xl font-bold">Get in touch</h2>
                <p className="mt-1 text-sm opacity-80">Tell me a little about yourself and I’ll get you booked in.</p>
              </div>
              <div className="p-7">
                <PublicEnquiryForm code={s.form_code} branding={asBranding(s)} />
              </div>
            </div>
          </section>
        )}
      </div>

      <footer className="border-t border-line py-8 text-center">
        <p className="text-xs text-subtle">Powered by Driive</p>
      </footer>

      {hasForm && <StickyBookBar label="Book your first lesson" targetId="book" />}
    </main>
  );
}
