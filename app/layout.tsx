import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://driive.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Driive — Run your whole driving school from one app",
    template: "%s · Driive",
  },
  description:
    "Diary, pupils, card payments, prepaid blocks, DVSA progress, mock tests and your books — the all-in-one app for UK driving instructors.",
  applicationName: "Driive",
  openGraph: {
    siteName: "Driive",
    type: "website",
    title: "Driive — Run your whole driving school from one app",
    description:
      "Diary, payments, DVSA progress tracking, mock tests and accounts for UK driving instructors.",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image", site: "@driiveapp" },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Driive",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  sameAs: ["https://x.com/driiveapp"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@driive.app",
    contactType: "customer support",
    areaServed: "GB",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className="scroll-smooth">
      <body
        className={`${GeistSans.className} bg-white text-neutral-900 antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
