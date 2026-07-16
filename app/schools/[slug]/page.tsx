import Image from "next/image";
import { redirect } from "next/navigation";
import { MapPin, Car, Star, BadgeCheck, Quote } from "lucide-react";
import { createClient } from "@/lib/supabase-public";
import { gbpShort, initials } from "@/lib/site-format";
import { PublicEnquiryForm } from "./PublicEnquiryForm";
import { ReviewsCarousel } from "./ReviewsCarousel";
import type { EnquiryFormInfo, InstructorSitePublic } from "@/lib/site-types";

export const dynamic = "force-dynamic";

const DEFAULT_BRAND = "#2546F5";
const DEFAULT_ACCENT = "#F9D7E2";

async function getSite(slug: string): Promise<InstructorSitePublic | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase.rpc("instructor_site", { p_slug: slug });
    const row = Array.isArray(data) ? data[0] : data;
    if (!row) return null;
    // Tolerate PostgREST's string-encoded numerics + null jsonb arrays.
    return {
      ...(row as InstructorSitePublic),
      gallery: Array.isArray(row.gallery) ? row.gallery : [],
      services: Array.isArray(row.services) ? row.services : [],
      reviews: Array.isArray(row.reviews) ? row.reviews : [],
      review_count: Number(row.review_count) || 0,
      rating: Number(row.rating) || 0,
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

function Chip({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
      <Icon className="h-3.5 w-3.5" /> {children}
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

  const brand = s.brand_color || DEFAULT_BRAND;
  const accent = s.accent_color || DEFAULT_ACCENT;
  const headline = s.headline || `Learn to drive with ${s.business_name}`;
  const subheading = s.subheading || "Patient, friendly driving lessons — pass with confidence.";
  const transLabel = TransmissionLabel(s.transmission_taught);
  const rating = Number(s.rating) || 0;

  return (
    <main className="min-h-screen bg-bg">
      {/* HERO */}
      <header className="relative overflow-hidden" style={{ backgroundColor: brand }}>
        {s.hero_image_url && (
          <>
            <Image src={s.hero_image_url} alt="" fill priority className="object-cover opacity-30" sizes="100vw" />
          </>
        )}
        <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <div className="mb-6 flex items-center gap-3">
            {s.logo_url ? (
              <Image src={s.logo_url} alt={s.business_name} width={56} height={56} className="h-14 w-14 rounded-2xl object-cover ring-2 ring-white/40" />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-lg font-bold text-white ring-2 ring-white/40">
                {initials(s.instructor_name || s.business_name)}
              </div>
            )}
            <span className="text-base font-bold text-white">{s.business_name}</span>
          </div>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">{headline}</h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">{subheading}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {transLabel && <Chip icon={Car}>{transLabel}</Chip>}
            {s.teaching_town && <Chip icon={MapPin}>{s.teaching_town}</Chip>}
            {s.price_from_pence ? <Chip icon={BadgeCheck}>{`From ${gbpShort(s.price_from_pence)}/hr`}</Chip> : null}
            {s.review_count > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                <Star className="h-3.5 w-3.5 fill-current" style={{ color: accent }} /> {rating.toFixed(1)} · {s.review_count} review{s.review_count === 1 ? "" : "s"}
              </span>
            )}
          </div>

          {s.show_enquiry && (
            <a
              href="#enquire"
              className="mt-8 inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-bold text-ink shadow-pop transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: accent }}
            >
              Book your first lesson
            </a>
          )}
        </div>
      </header>

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
                      <span className="shrink-0 rounded-full px-3 py-1 text-sm font-bold text-ink" style={{ backgroundColor: accent }}>
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
            <div className="mb-5 flex items-center gap-2">
              <Quote className="h-6 w-6" style={{ color: brand }} />
              <h2 className="text-2xl font-bold text-ink">What pupils say</h2>
            </div>
            <div className="max-w-2xl">
              <ReviewsCarousel reviews={s.reviews} />
            </div>
          </section>
        )}

        {/* ENQUIRE */}
        {s.show_enquiry && s.form_code && (
          <section id="enquire" className="scroll-mt-6">
            <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-pop">
              <div className="px-7 py-6" style={{ backgroundColor: brand }}>
                <h2 className="text-2xl font-bold text-white">Get in touch</h2>
                <p className="mt-1 text-sm text-white/80">Tell me a little about yourself and I’ll get you booked in.</p>
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
    </main>
  );
}
