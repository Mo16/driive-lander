import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { POSTS, getPost } from "@/data/posts";
import { meta } from "@/lib/meta";
import {
  JsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from "@/lib/json-ld";
import { CONTAINER, CREAM, Arrow, RichText } from "@/components/ui";
import { PageIntro, CtaSection } from "@/components/sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return meta(post.title, post.description, `/blog/${slug}`, {
    openGraphType: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            path,
            name: post.title,
            description: post.description,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path },
          ]),
          articleJsonLd({
            path,
            headline: post.title,
            description: post.description,
            datePublished: post.date,
          }),
        ]}
      />

      <PageIntro
        eyebrow={`${post.dateLabel} · ${post.readingTime}`}
        title={post.title}
        lede={post.description}
      />

      <article className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-3xl">
            {post.sections.map((section, i) => (
              <section key={i} className={i === 0 ? "" : "mt-12"}>
                {section.heading && (
                  <h2 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900 sm:text-3xl">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((paragraph, j) => (
                  <p
                    key={j}
                    className="mt-5 text-lg leading-relaxed text-neutral-600"
                  >
                    <RichText text={paragraph} />
                  </p>
                ))}
              </section>
            ))}

            <div className="mt-14 rounded-xl p-8" style={{ backgroundColor: CREAM }}>
              <p className="text-lg font-semibold tracking-tight text-neutral-900">
                Driive is the diary, payments and reminders system this
                article keeps pointing at.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                <Link
                  href="/waitlist"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#2546F5]"
                >
                  Join the waitlist
                  <Arrow />
                </Link>
                <Link
                  href="/features"
                  className="text-sm font-semibold text-[#2546F5] underline underline-offset-2"
                >
                  Explore the features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* More articles */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
        <div className={CONTAINER}>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold tracking-[-0.03em] text-neutral-900">
            More from the blog
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                className="group rounded-xl bg-white p-8 shadow-[0_25px_60px_-35px_rgba(12,12,14,0.25)] transition hover:-translate-y-0.5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                  {other.dateLabel} · {other.readingTime}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.02em] text-neutral-900">
                  {other.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2546F5]">
                  Read article
                  <Arrow className="transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection source={`blog-${post.slug}`} />
    </>
  );
}
