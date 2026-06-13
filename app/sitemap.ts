import type { MetadataRoute } from "next";
import { FEATURES } from "@/data/features";
import { POSTS } from "@/data/posts";
import { SITE_URL } from "@/lib/site";

const SITE_UPDATED = new Date("2026-06-12");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRouteConfig: {
    path: string;
    changeFrequency: "weekly" | "monthly" | "yearly";
    priority: number;
  }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/features", changeFrequency: "weekly", priority: 0.9 },
    { path: "/instructors", changeFrequency: "monthly", priority: 0.9 },
    { path: "/pricing", changeFrequency: "monthly", priority: 0.85 },
    { path: "/waitlist", changeFrequency: "monthly", priority: 0.8 },
    { path: "/schools", changeFrequency: "monthly", priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
    { path: "/security", changeFrequency: "monthly", priority: 0.5 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.35 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.35 },
    { path: "/cookies", changeFrequency: "yearly", priority: 0.35 },
    { path: "/delete-account", changeFrequency: "yearly", priority: 0.35 },
  ];

  const staticRoutes = staticRouteConfig.map((path) => ({
    url: `${SITE_URL}${path.path}`,
    lastModified: SITE_UPDATED,
    changeFrequency: path.changeFrequency,
    priority: path.priority,
  }));

  const featureRoutes = FEATURES.map((feature) => ({
    url: `${SITE_URL}/features/${feature.slug}`,
    lastModified: SITE_UPDATED,
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
