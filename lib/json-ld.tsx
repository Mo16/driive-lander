import { absoluteUrl, COMPANY, DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

type JsonLdObject = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  const html = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: absoluteUrl("/icon.svg"),
    email: COMPANY.email,
    sameAs: ["https://x.com/driiveapp"],
    address: {
      "@type": "PostalAddress",
      ...COMPANY.address,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: COMPANY.supportEmail,
        contactType: "customer support",
        areaServed: "GB",
        availableLanguage: "en-GB",
      },
      {
        "@type": "ContactPoint",
        email: COMPANY.securityEmail,
        contactType: "security",
        areaServed: "GB",
        availableLanguage: "en-GB",
      },
    ],
  };
}

export function webSiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-GB",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function softwareApplicationJsonLd({
  name = SITE_NAME,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  featureList,
}: {
  name?: string;
  description?: string;
  path?: string;
  featureList?: string[];
} = {}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl(path)}#software`,
    name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "iOS, Android, Web",
    description,
    url: absoluteUrl(path),
    image: absoluteUrl("/opengraph-image"),
    provider: { "@id": `${SITE_URL}/#organization` },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "UK driving instructors, ADIs and PDIs",
    },
    areaServed: "GB",
    offers: [
      {
        "@type": "Offer",
        name: "Driive Free",
        price: "0",
        priceCurrency: "GBP",
        url: absoluteUrl("/pricing"),
      },
      {
        "@type": "Offer",
        name: "Driive Pro",
        price: "11.99",
        priceCurrency: "GBP",
        url: absoluteUrl("/pricing"),
      },
    ],
    ...(featureList ? { featureList } : {}),
  };
}

export function webPageJsonLd({
  path,
  name,
  description,
  type = "WebPage",
}: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-GB",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageJsonLd(
  faqs: { question: string; answer: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleJsonLd({
  path,
  headline,
  description,
  datePublished,
  dateModified = datePublished,
}: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    mainEntityOfPage: { "@id": `${absoluteUrl(path)}#webpage` },
    headline,
    description,
    image: absoluteUrl("/opengraph-image"),
    datePublished,
    dateModified,
    inLanguage: "en-GB",
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
