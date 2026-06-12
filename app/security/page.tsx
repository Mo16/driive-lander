import Link from "next/link";
import { meta } from "@/lib/meta";
import { CONTAINER, CREAM } from "@/components/ui";
import { PageIntro, LegalDoc, CtaSection } from "@/components/sections";

export const metadata = meta(
  "Security",
  "How Driive approaches security: encryption in transit and at rest, UK/EU data hosting, access controls and a responsible disclosure route at security@driive.app.",
  "/security",
);

const COMMITMENTS = [
  {
    title: "Encrypted everywhere",
    body: "All traffic to and from Driive is encrypted in transit with TLS, and data is encrypted at rest (AES-256) by our infrastructure providers.",
  },
  {
    title: "UK and EU hosting",
    body: "Waitlist and, at launch, customer data is hosted in UK/EU data-centre regions with providers operating under UK GDPR-compliant terms.",
  },
  {
    title: "Least-privilege access",
    body: "Production data access is restricted to the people who need it to operate the service, protected by strong authentication, and logged.",
  },
  {
    title: "Minimal data by design",
    body: "We collect the least data the product needs. Today that is one email address per waitlist signup — nothing more.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageIntro
        eyebrow="Security"
        title={
          <>
            Your business data,
            <br />
            treated like it matters.
          </>
        }
        lede="Instructors will trust Driive with diaries, pupil records and payment history. That trust is earned with engineering, not adjectives — here is how we work."
      />

      {/* Commitments */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="grid gap-5 sm:grid-cols-2">
            {COMMITMENTS.map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] p-8"
                style={{ backgroundColor: CREAM }}
              >
                <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                  {item.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LegalDoc
        updated="1 June 2026"
        sections={[
          {
            heading: "Infrastructure",
            paragraphs: [
              "This website and waitlist run on Vercel (hosting), Supabase (database) and Resend (email delivery) — established providers whose platforms maintain independent security certifications such as SOC 2. Driive itself is pre-launch and does not yet hold its own certifications; our practices are aligned with recognised standards, and we will pursue formal certification as the product and team grow. We will not claim a badge we have not earned.",
            ],
          },
          {
            heading: "Payments",
            paragraphs: [
              "When lesson payments launch, card processing will be handled by a regulated, PCI DSS-compliant payment provider. Full card numbers will never touch Driive's servers or be stored by us.",
            ],
          },
          {
            heading: "Development practices",
            paragraphs: [
              "Code is version-controlled and peer-reviewed before release, dependencies are kept patched, secrets are stored in managed environment configuration rather than code, and access to production systems requires strong authentication.",
            ],
          },
          {
            heading: "Incident response",
            paragraphs: [
              <>
                If a security incident affects personal data, we will
                investigate, contain and remediate it, notify the ICO where
                the UK GDPR requires it (within 72 hours of becoming aware),
                and inform affected individuals without undue delay when the
                breach is likely to result in a high risk to them. What
                personal data we hold and why is set out in our{" "}
                <Link href="/privacy" className="font-semibold text-[#2546F5] underline-offset-4 hover:underline">
                  privacy policy
                </Link>
                .
              </>,
            ],
          },
          {
            heading: "Responsible disclosure",
            paragraphs: [
              "If you believe you have found a vulnerability in this website or in Driive, email security@driive.app with enough detail to reproduce it. Please give us reasonable time to fix the issue before any public disclosure, and do not access, modify or exfiltrate data that is not yours. We respond to genuine reports, will not pursue legal action against good-faith research conducted within these rules, and will credit reporters who want it once a fix has shipped.",
            ],
          },
        ]}
      />

      <CtaSection source="security" />
    </>
  );
}
