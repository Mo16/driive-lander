import { meta } from "@/lib/meta";
import { PageIntro, LegalDoc } from "@/components/sections";

export const metadata = meta(
  "Cookie policy",
  "Driive uses only essential cookies. This page explains what they do, why no consent banner is needed, and what happens if we ever add more.",
  "/cookies",
);

export default function CookiesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Cookie policy"
        lede="The short version: this site uses only the cookies it needs to function. No advertising trackers, no cross-site profiling."
      />
      <LegalDoc
        updated="1 June 2026"
        sections={[
          {
            heading: "What cookies are",
            paragraphs: [
              "Cookies are small text files placed on your device by websites you visit. Similar technologies such as local storage work in comparable ways; this policy covers those too.",
            ],
          },
          {
            heading: "What this site uses",
            paragraphs: [
              "Strictly necessary cookies only. These support core functions such as security protections, load balancing and remembering form state during a visit. They are set by our hosting infrastructure (Vercel) and cannot be switched off through this site, because the site does not work properly without them.",
              "We do not set advertising cookies, social media trackers or cross-site analytics cookies. Because we use only strictly necessary cookies, UK rules (PECR) do not require a consent banner — which is why you have not seen one.",
            ],
          },
          {
            heading: "If this changes",
            paragraphs: [
              "If we ever introduce analytics or other non-essential cookies, we will update this policy, list each cookie with its purpose and lifetime, and ask for your consent before setting them.",
            ],
          },
          {
            heading: "Managing cookies in your browser",
            paragraphs: [
              "All major browsers let you view, block and delete cookies in their settings. Blocking strictly necessary cookies may stop parts of this site from working.",
            ],
          },
          {
            heading: "Questions",
            paragraphs: [
              "Email privacy@driive.app with any questions about cookies or this policy.",
            ],
          },
        ]}
      />
    </>
  );
}
