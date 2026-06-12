import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FEATURES, getFeature } from "@/data/features";
import { FEATURE_VISUALS } from "@/app/feature-showcase";
import { meta } from "@/lib/meta";
import { CONTAINER, CREAM, Eyebrow, Road, Check, RichText } from "@/components/ui";
import { PageIntro, CtaSection } from "@/components/sections";

export function generateStaticParams() {
  return FEATURES.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) return {};
  return meta(feature.metaTitle, feature.metaDescription, `/features/${slug}`);
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) notFound();

  const visual = FEATURE_VISUALS[feature.slug];
  const others = feature.related
    .map((relatedSlug) => getFeature(relatedSlug))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <>
      <PageIntro
        eyebrow={feature.name}
        title={feature.tagline}
        lede={feature.lede}
      />

      {/* Visual */}
      <section className="bg-white pb-8 pt-20 lg:pt-28">
        <div className={CONTAINER}>
          <div
            className="mx-auto max-w-4xl rounded-[2.5rem] p-7 sm:p-10"
            style={{ backgroundColor: CREAM }}
          >
            <div className="min-h-[340px]">{visual}</div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-4xl space-y-16">
            {feature.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="grid gap-6 border-t border-neutral-200 pt-12 lg:grid-cols-[auto_1fr] lg:gap-12"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#2546F5] text-white">
                  <Check />
                </span>
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900 sm:text-3xl">
                    {benefit.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-600">
                    <RichText text={benefit.body} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Road from="#FFFFFF" to={CREAM} />

      {/* Related features */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
        <div className={CONTAINER}>
          <Eyebrow>Works with</Eyebrow>
          <h2 className="mt-8 max-w-2xl text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
            {feature.name} is stronger with the rest of Driive.
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/features/${other.slug}`}
                className="group rounded-3xl bg-white p-7 shadow-[0_25px_60px_-35px_rgba(12,12,14,0.25)] transition hover:-translate-y-0.5"
              >
                <p className="text-lg font-semibold tracking-tight text-neutral-900">
                  {other.name}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-500">
                  {other.tagline}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-[#2546F5]">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection source={`feature-${feature.slug}`} />
    </>
  );
}
