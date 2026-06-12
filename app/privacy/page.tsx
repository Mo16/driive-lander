import Link from "next/link";
import { meta } from "@/lib/meta";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { PageIntro, LegalDoc } from "@/components/sections";

const DESCRIPTION =
  "How Driive collects, uses and protects personal data under UK GDPR, including retention, processors and your data rights.";

export const metadata = meta(
  "Privacy policy",
  DESCRIPTION,
  "/privacy",
);

const Email = ({ to }: { to: string }) => (
  <a
    href={`mailto:${to}`}
    className="font-semibold text-[#2546F5] underline-offset-4 hover:underline"
  >
    {to}
  </a>
);

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/privacy",
            name: "Driive privacy policy",
            description: DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Privacy policy", path: "/privacy" },
          ]),
        ]}
      />

      <PageIntro
        eyebrow="Legal"
        title="Privacy policy"
        lede="Plain English first, legal precision throughout. This policy explains what personal data Driive collects, why, and the rights you have over it."
      />
      <LegalDoc
        updated="12 June 2026"
        sections={[
          {
            heading: "Who we are",
            paragraphs: [
              <>
                Driive is a trading name of Aurelo Web Studio Ltd, a company
                registered in England and Wales (Company No. 16930106) with
                its registered office at 11 Pains Road, Southsea, England,
                PO5 1HE (&ldquo;Driive&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;). For the purposes of UK data protection law,
                including the UK General Data Protection Regulation (UK GDPR)
                and the Data Protection Act 2018, Aurelo Web Studio Ltd is the
                data controller for personal data collected through this
                website.
              </>,
              <>
                Questions about this policy or your data can be sent to{" "}
                <Email to="privacy@driive.app" /> or posted to the registered
                office address above.
              </>,
            ],
          },
          {
            heading: "What we collect",
            paragraphs: [
              "Waitlist data: when you join the waitlist we collect your email address, the page you signed up from, and the date and time of signup.",
              "Correspondence: if you email us, we keep the correspondence and your contact details for as long as needed to handle the enquiry.",
              "Technical data: our hosting and analytics infrastructure processes standard technical information such as IP address, browser type and pages visited, used for security and to keep the site working. We do not use advertising trackers on this site.",
            ],
          },
          {
            heading: "Why we process it and our lawful bases",
            paragraphs: [
              "Waitlist emails — to confirm your place, tell you when access opens, and share launch updates. Lawful basis: consent (Article 6(1)(a) UK GDPR), which you give by submitting the form and can withdraw at any time.",
              "Correspondence — to respond to enquiries and provide support. Lawful basis: legitimate interests (Article 6(1)(f)).",
              "Technical and security data — to protect the site against abuse and keep it available. Lawful basis: legitimate interests (Article 6(1)(f)).",
              "We do not sell personal data, and we do not use waitlist emails for anything beyond Driive launch communications.",
            ],
          },
          {
            heading: "Who processes data on our behalf",
            paragraphs: [
              "We use a small number of service providers (processors) to run this website: Vercel Inc. (website hosting and serving), Supabase (database storage of waitlist signups) and Resend (transactional email delivery and notifications).",
              "Each provider processes data under contract with us and only on our instructions. Where data is transferred outside the UK, transfers are protected by appropriate safeguards such as the UK Addendum to the EU Standard Contractual Clauses or an adequacy decision.",
            ],
          },
          {
            heading: "How long we keep it",
            paragraphs: [
              "Waitlist data is kept until launch communications are complete, until you unsubscribe or ask us to delete it, or for a maximum of 24 months of inactivity — whichever comes first.",
              "Correspondence is kept for up to 24 months after the enquiry is closed, unless a longer period is needed to comply with a legal obligation or resolve a dispute.",
            ],
          },
          {
            heading: "Your rights",
            paragraphs: [
              "Under UK GDPR you have the right to access the personal data we hold about you, to have it corrected or erased, to restrict or object to processing, to data portability, and to withdraw consent at any time where consent is the basis for processing.",
              <>
                To exercise any right, email <Email to="privacy@driive.app" />.
                We respond within one month. You also have the right to
                complain to the Information Commissioner&rsquo;s Office (ICO)
                at ico.org.uk if you believe your data has been mishandled —
                though we would appreciate the chance to resolve it with you
                first.
              </>,
            ],
          },
          {
            heading: "Cookies",
            paragraphs: [
              <>
                This site uses only essential cookies needed for it to
                function. Details are in our{" "}
                <Link
                  href="/cookies"
                  className="font-semibold text-[#2546F5] underline-offset-4 hover:underline"
                >
                  cookie policy
                </Link>
                .
              </>,
            ],
          },
          {
            heading: "Changes to this policy",
            paragraphs: [
              "If we change this policy in a way that affects how your data is used, we will update this page and, where the change is significant, notify waitlist members by email. The date at the top shows when it was last revised.",
            ],
          },
        ]}
      />
    </>
  );
}
