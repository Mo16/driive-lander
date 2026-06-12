export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://driive.app"
).replace(/\/$/, "");

export const SITE_NAME = "Driive";
export const DEFAULT_TITLE = "Run Your Driving School From One App | Driive";
export const DEFAULT_DESCRIPTION =
  "Driving instructor app for UK ADIs and PDIs. Manage your diary, pupils, bookings, card payments, progress, reminders and enquiries in one simple app.";

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
