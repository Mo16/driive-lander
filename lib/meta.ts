import type { Metadata } from "next";
import {
  SEO_KEYWORDS,
  SITE_NAME,
  SOCIAL_IMAGE,
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_WIDTH,
} from "./site";

/** Standard per-page metadata. Title is templated to "%s · Driive" by the layout. */
export function meta(
  title: string,
  description: string,
  path: string,
  options: {
    openGraphType?: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
  } = {},
): Metadata {
  const fullTitle = `${title} · ${SITE_NAME}`;
  const isArticle = options.openGraphType === "article";

  return {
    title,
    description,
    keywords: SEO_KEYWORDS,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: isArticle ? "article" : "website",
      locale: "en_GB",
      siteName: SITE_NAME,
      images: [
        {
          url: SOCIAL_IMAGE,
          width: SOCIAL_IMAGE_WIDTH,
          height: SOCIAL_IMAGE_HEIGHT,
          alt: SOCIAL_IMAGE_ALT,
        },
      ],
      ...(isArticle
        ? {
            publishedTime: options.publishedTime,
            modifiedTime: options.modifiedTime ?? options.publishedTime,
            authors: [SITE_NAME],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: "@driiveapp",
      creator: "@driiveapp",
      title: fullTitle,
      description,
      images: [SOCIAL_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
