import type { MetadataRoute } from "next";
import { FEATURES } from "@/data/features";
import { POSTS } from "@/data/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://driive.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/features",
    "/instructors",
    "/schools",
    "/pricing",
    "/about",
    "/contact",
    "/blog",
    "/waitlist",
    "/privacy",
    "/terms",
    "/cookies",
    "/security",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const featureRoutes = FEATURES.map((feature) => ({
    url: `${SITE_URL}/features/${feature.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postRoutes = POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...featureRoutes, ...postRoutes];
}
