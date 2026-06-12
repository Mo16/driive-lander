import Link from "next/link";
import { meta } from "@/lib/meta";
import { POSTS } from "@/data/posts";
import { CONTAINER, CREAM, Arrow } from "@/components/ui";
import { PageIntro, CtaSection } from "@/components/sections";

export const metadata = meta(
  "Blog",
  "Plain-English writing for UK driving instructors: cutting admin, stopping no-shows, getting paid on time and running a calmer driving school.",
  "/blog",
);

export default function BlogPage() {
  const posts = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <PageIntro
        eyebrow="Blog"
        title={
          <>
            Notes from
            <br />
            the road.
          </>
        }
        lede="Practical writing for instructors who would rather teach than do admin — no fluff, no jargon, no 'ultimate guides'."
        waveTo={CREAM}
      />

      <section className="py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
        <div className={CONTAINER}>
          <div className="grid gap-5 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-[2rem] bg-white p-8 shadow-[0_25px_60px_-35px_rgba(12,12,14,0.25)] transition hover:-translate-y-0.5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                  {post.dateLabel} · {post.readingTime}
                </p>
                <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-[-0.02em] text-neutral-900">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-base leading-relaxed text-neutral-500">
                  {post.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2546F5]">
                  Read article
                  <Arrow className="transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection source="blog-index" />
    </>
  );
}
