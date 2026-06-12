import { meta } from "@/lib/meta";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { PageIntro, LegalDoc } from "@/components/sections";

const DESCRIPTION =
  "The website and waitlist terms for Driive, including pre-launch product descriptions, IP and governing law.";

export const metadata = meta(
  "Terms of use",
  DESCRIPTION,
  "/terms",
);

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/terms",
            name: "Driive terms of use",
            description: DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Terms of use", path: "/terms" },
          ]),
        ]}
      />

      <PageIntro
        eyebrow="Legal"
        title="Terms of use"
        lede="These terms cover use of this website and the Driive waitlist. Separate service terms will apply to the Driive product when it launches."
      />
      <LegalDoc
        updated="12 June 2026"
        sections={[
          {
            heading: "Who these terms are between",
            paragraphs: [
              "These terms are between you and Aurelo Web Studio Ltd, trading as Driive, a company registered in England and Wales (Company No. 16930106) with its registered office at 11 Pains Road, Southsea, England, PO5 1HE. By using this website or joining the waitlist, you agree to them.",
            ],
          },
          {
            heading: "The waitlist",
            paragraphs: [
              "Joining the waitlist is free and creates no obligation on you to purchase anything, and no obligation on us to provide access by any particular date. Access opens in waves at our discretion, and waitlist position is one of several factors in invitation order.",
              "Any offer terms communicated to waitlist members by email will be honoured as described in that email. Until such an email is sent, nothing on this website constitutes a binding price or offer.",
              "You may leave the waitlist at any time using the unsubscribe link in any email or by contacting privacy@driive.app.",
            ],
          },
          {
            heading: "Pre-launch product descriptions",
            paragraphs: [
              "Driive is pre-launch. Features, screens and capabilities described on this website reflect what we are building and may change before or after launch. Nothing on this site is a guarantee of specific functionality, performance or results, including any financial outcomes for your business.",
              "Driive is an independent product and is not affiliated with, endorsed by or approved by the Driver and Vehicle Standards Agency (DVSA). References to the DVSA syllabus describe how progress tracking is structured, nothing more.",
            ],
          },
          {
            heading: "Acceptable use of this website",
            paragraphs: [
              "You agree not to misuse this website — including attempting to gain unauthorised access, submitting false or automated waitlist signups, scraping content at scale, or interfering with the site's operation. We may block access or remove waitlist entries that breach these terms.",
            ],
          },
          {
            heading: "Intellectual property",
            paragraphs: [
              "The Driive name, logo, website design and all content on this site belong to Aurelo Web Studio Ltd or our licensors. You may view and share links to the site freely; you may not reproduce its design or content commercially without our written permission.",
            ],
          },
          {
            heading: "Liability",
            paragraphs: [
              "This website is provided free of charge and on an 'as is' basis. To the maximum extent permitted by law, we exclude liability for loss arising from use of, or inability to use, this website or reliance on its pre-launch content. Nothing in these terms excludes or limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under the law of England and Wales.",
            ],
          },
          {
            heading: "Changes",
            paragraphs: [
              "We may update these terms from time to time. The date above shows the latest revision; continued use of the site after a change means you accept the updated terms.",
            ],
          },
          {
            heading: "Governing law",
            paragraphs: [
              "These terms are governed by the law of England and Wales, and the courts of England and Wales have exclusive jurisdiction over any dispute arising from them — though if you live in Scotland or Northern Ireland you may also bring proceedings in your local courts.",
            ],
          },
        ]}
      />
    </>
  );
}
