export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://driive.app"
).replace(/\/$/, "");

export const SITE_NAME = "Driive";
export const DEFAULT_TITLE = "Run Your Driving School From One App | Driive";
export const DEFAULT_DESCRIPTION =
  "Driving instructor app for UK ADIs and PDIs. Manage your diary, pupils, bookings, card payments, progress, reminders and enquiries in one simple app.";

/**
 * App-store destinations for /download. The page sniffs the visitor's OS and
 * bounces iOS → App Store, Android → Play. Set the env vars once the public
 * listings are live; the defaults use the known identifiers:
 *   - iOS  App Store Connect app id 6778018322 (apps.apple.com/app/id…)
 *   - Play package com.aurelo.driive
 * Until a listing is public these will 404 — override via env to point at
 * TestFlight / a "coming soon" URL in the meantime.
 */
export const APP_STORE_URL =
  process.env.NEXT_PUBLIC_APP_STORE_URL ?? "https://apps.apple.com/app/id6778018322";
export const PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ??
  "https://play.google.com/store/apps/details?id=com.aurelo.driive";

export const SOCIAL_IMAGE = "/opengraph-image";
export const SOCIAL_IMAGE_WIDTH = 1200;
export const SOCIAL_IMAGE_HEIGHT = 630;
export const SOCIAL_IMAGE_ALT =
  "Driive driving instructor software for diary, payments and pupil progress";

export const COMPANY = {
  name: "Driive",
  legalName: "Aurelo Web Studio Ltd",
  companyNumber: "16930106",
  email: "hello@driive.app",
  supportEmail: "support@driive.app",
  privacyEmail: "privacy@driive.app",
  securityEmail: "security@driive.app",
  address: {
    streetAddress: "11 Pains Road",
    addressLocality: "Southsea",
    addressCountry: "GB",
    postalCode: "PO5 1HE",
  },
};

export const SEO_KEYWORDS = [
  "driving instructor software",
  "driving instructor app",
  "driving school software",
  "driving instructor diary",
  "driving instructor payments",
  "DVSA progress tracking",
  "ADI software",
  "PDI software",
];

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
