import type { Metadata } from "next";

/** Standard per-page metadata. Title is templated to "%s · Driive" by the layout. */
export function meta(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · Driive`,
      description,
      url: path,
      type: "website",
      siteName: "Driive",
    },
    twitter: { card: "summary_large_image", title: `${title} · Driive`, description },
  };
}
