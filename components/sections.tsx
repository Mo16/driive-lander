import Link from "next/link";
import type { ReactNode } from "react";
import { BLUE, CONTAINER, Arrow, Eyebrow, Road } from "./ui";
import WaitlistForm from "./waitlist-form";
import { FEATURES } from "@/data/features";

/* ------------------------------- page intro -------------------------------
   Every subpage opens with this blue band so the absolute Nav always sits
   on brand. waveTo controls the divider into the first content section.
--------------------------------------------------------------------------- */

export function PageIntro({
  eyebrow,
  title,
  lede,
  waveTo = "#FFFFFF",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  waveTo?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <section
        className="pb-20 pt-36 lg:pb-24 lg:pt-44"
        style={{ backgroundColor: BLUE }}
      >
        <div className={CONTAINER}>
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h1 className="mt-8 max-w-4xl text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#F9D7E2]">
            {title}
          </h1>
          {lede && (
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#F9D7E2]/90 sm:text-xl">
              {lede}
            </p>
          )}
          {children}
        </div>
      </section>
      <Road from={BLUE} to={waveTo} />
    </>
  );
}

/* -------------------------------- CTA band --------------------------------
   Every subpage ends with this. Home has its own larger final CTA.
--------------------------------------------------------------------------- */

export function CtaSection({ source }: { source: string }) {
  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: BLUE }}>
      <div className={CONTAINER}>
        <h2 className="max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-[#F9D7E2]">
          Put your diary
          <br />
          on autopilot.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#F9D7E2]/90">
          Access opens in waves from the waitlist — founding instructors get
          in first.
        </p>
        <div className="mt-10">
          <WaitlistForm variant="blue" source={source} />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- FAQ ----------------------------------- */

export type Faq = { q: string; a: ReactNode };

export const DEFAULT_FAQS: Faq[] = [
  {
    q: "When does Driive launch?",
    a: "We're onboarding instructors in waves through 2026, starting with the waitlist in order of signup. Join now and you'll get one email when it's your turn — nothing else in between.",
  },
  {
    q: "Is Driive for solo instructors or driving schools?",
    a: (
      <>
        Driive is currently built for solo instructors as we launch. After
        launch we'll be adding support for driving schools — shared diaries,
        multi-instructor management and per-instructor reporting. Schools can{" "}
        <Link href="/schools" className="font-medium text-[#2546F5] underline underline-offset-2">
          register interest here
        </Link>
        .
      </>
    ),
  },
  {
    q: "How much will it cost?",
    a: (
      <>
        Driive is free for up to ten pupils — not a trial. Pro, which adds
        unlimited pupils, DL25-style mock tests, lesson tools and your own
        website, is £11.99 a month or £119.90 a year. Founding instructors
        lock in £5.99 a month (£59.90 a year) forever — the detail is on our{" "}
        <Link href="/pricing" className="font-medium text-[#2546F5] underline underline-offset-2">
          pricing page
        </Link>
        .
      </>
    ),
  },
  {
    q: "Do my pupils need to download anything?",
    a: "Pupils get their own free side of the Driive app: they request lessons, see their credit balance, pay by card and watch their DVSA progress build. Parents and guardians can follow along through a private, read-only web link — no app needed for them.",
  },
  {
    q: "Can I bring my existing pupils across?",
    a: "Yes. Add pupils yourself in minutes, or share your join code and they connect from their own phone — you just approve each request. Early-access instructors get hands-on help getting set up.",
  },
  {
    q: "Is my data safe?",
    a: (
      <>
        Your data is encrypted in transit and at rest, hosted in the UK/EU,
        and handled under UK GDPR. We never sell data. The full detail is on
        our{" "}
        <Link href="/security" className="font-medium text-[#2546F5] underline underline-offset-2">
          Security page
        </Link>
        .
      </>
    ),
  },
  {
    q: "Can I export my data?",
    a: "Yes. Your pupils, lessons, payment records and progress history are yours, and you can export them whenever you like — there's no lock-in, and you take everything with you if you ever leave. Under UK GDPR you also have the right to request a full copy of your personal data at any time.",
  },
  {
    q: "Am I locked into a contract?",
    a: "No. Pro is monthly or annual and you can cancel any time — you simply drop back to the free plan, and your pupils, lessons and payment records stay yours, exportable whenever you like.",
  },
  {
    q: "Does Driive follow the DVSA syllabus?",
    a: "Progress tracking is structured around the official DVSA 'Ready to Pass?' skills, so test-readiness is based on evidence. Driive is independent and not affiliated with or endorsed by the DVSA.",
  },
];

export function FaqSection({
  faqs = DEFAULT_FAQS,
  background = "#FFFFFF",
}: {
  faqs?: Faq[];
  background?: string;
}) {
  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: background }}>
      <div className={CONTAINER}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
              Asked by
              <br />
              instructors,
              <br />
              answered straight.
            </h2>
          </div>
          <div>
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group border-t border-neutral-200 last:border-b"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium text-neutral-900 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#2546F5]/10 text-[#2546F5] transition-transform duration-200 group-open:rotate-45">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <div className="max-w-2xl pb-7 text-base leading-relaxed text-neutral-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- feature link grid --------------------------- */

export function FeatureLinkGrid({ tone = "light" }: { tone?: "light" | "blue" }) {
  const onBlue = tone === "blue";
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((feature) => (
        <Link
          key={feature.slug}
          href={`/features/${feature.slug}`}
          className={`group rounded-3xl p-7 transition ${
            onBlue
              ? "bg-white/10 ring-1 ring-white/15 hover:bg-white/15"
              : "bg-white shadow-[0_25px_60px_-35px_rgba(12,12,14,0.25)] hover:-translate-y-0.5"
          }`}
        >
          <p
            className={`text-xl font-semibold tracking-tight ${
              onBlue ? "text-white" : "text-neutral-900"
            }`}
          >
            {feature.name}
          </p>
          <p
            className={`mt-2 text-[15px] leading-relaxed ${
              onBlue ? "text-[#F9D7E2]/80" : "text-neutral-500"
            }`}
          >
            {feature.lede}
          </p>
          <span
            className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${
              onBlue ? "text-[#F9D7E2]" : "text-[#2546F5]"
            }`}
          >
            Explore {feature.name}
            <Arrow className="transition group-hover:translate-x-0.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}

/* ------------------------------- legal layout ------------------------------ */

export function LegalDoc({
  updated,
  sections,
}: {
  updated: string;
  sections: { heading: string; paragraphs: ReactNode[] }[];
}) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className={CONTAINER}>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium text-neutral-400">
            Last updated: {updated}
          </p>
          {sections.map((section, i) => (
            <div key={section.heading} className="mt-12">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                {i + 1}. {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, j) => (
                <p
                  key={j}
                  className="mt-4 text-base leading-relaxed text-neutral-600"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
