import Link from "next/link";
import { meta } from "@/lib/meta";
import { CONTAINER, CREAM, Eyebrow, Road } from "@/components/ui";
import { PageIntro, CtaSection } from "@/components/sections";

export const metadata = meta(
  "Contact",
  "Get in touch with the Driive team. General enquiries, support, privacy and security contacts — we reply within two working days.",
  "/contact",
);

const CONTACTS = [
  {
    label: "General enquiries",
    email: "hello@driive.app",
    body: "Questions about the product, the waitlist, partnerships or press.",
  },
  {
    label: "Support",
    email: "support@driive.app",
    body: "Help with your waitlist signup or, once launched, your account.",
  },
  {
    label: "Privacy",
    email: "privacy@driive.app",
    body: "Data protection questions and requests to exercise your UK GDPR rights.",
  },
  {
    label: "Security",
    email: "security@driive.app",
    body: "Responsible disclosure of vulnerabilities. See our security page for details.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title={
          <>
            Talk to a person,
            <br />
            not a ticket queue.
          </>
        }
        lede="Email the right inbox below and a human replies within two working days — usually faster."
      />

      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="grid gap-5 sm:grid-cols-2">
            {CONTACTS.map((contact) => (
              <a
                key={contact.email}
                href={`mailto:${contact.email}`}
                className="group rounded-[2rem] p-8 transition hover:-translate-y-0.5"
                style={{ backgroundColor: CREAM }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                  {contact.label}
                </p>
                <p className="mt-3 text-xl font-semibold tracking-tight text-[#2546F5] sm:text-2xl">
                  {contact.email}
                </p>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">
                  {contact.body}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Road from="#FFFFFF" to={CREAM} />

      <section className="py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <Eyebrow>Company details</Eyebrow>
              <h2 className="mt-8 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
                The formal bit.
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-relaxed text-neutral-600">
              <p>
                Driive is a trading name of Aurelo Web Studio Ltd, a company
                registered in England and Wales (Company No. 16930106).
              </p>
              <p>Registered office: 11 Pains Road, Southsea, England, PO5 1HE.</p>
              <p>
                For anything legal or data-protection related, write to{" "}
                <a
                  href="mailto:privacy@driive.app"
                  className="font-semibold text-[#2546F5] underline-offset-4 hover:underline"
                >
                  privacy@driive.app
                </a>{" "}
                or to the registered office address above. How we handle
                personal data is set out in our{" "}
                <Link href="/privacy" className="font-semibold text-[#2546F5] underline-offset-4 hover:underline">
                  privacy policy
                </Link>
                , and our engineering practices on the{" "}
                <Link href="/security" className="font-semibold text-[#2546F5] underline-offset-4 hover:underline">
                  security page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection source="contact" />
    </>
  );
}
