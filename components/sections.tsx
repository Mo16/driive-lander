import Link from "next/link";
import type { ReactNode } from "react";
import { BLUE, COAL, CONTAINER, Arrow, Eyebrow, Road } from "./ui";
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
    <section className="rounded-t-[2.5rem] py-24 lg:py-32" style={{ backgroundColor: COAL }}>
      <div className={CONTAINER}>
        <h2 className="max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-[#F0EEE7]">
          Put your diary
          <br />
          on autopilot.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
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

/* ------------------------------- feature card -----------------------------
   A floating product mockup centred on top, then a centred label / headline /
   note below. Used for the "two featured cards" blocks (smart-diary, progress).
--------------------------------------------------------------------------- */

export function FeatureCard({
  label,
  value,
  note,
  className = "",
  children,
}: {
  label: string;
  value: string;
  note: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-xl ${className}`}>
      <div className="flex min-h-72 flex-1 items-center justify-center p-10 sm:min-h-104 sm:p-16">
        {children}
      </div>
      <div className="px-8 pb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
          {label}
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-[#2546F5]">
          {value}
        </p>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-neutral-500">
          {note}
        </p>
      </div>
    </div>
  );
}

/* ----------------------------------- FAQ ----------------------------------- */

export type Faq = { q: string; a: ReactNode; schemaAnswer: string };

export const DEFAULT_FAQS: Faq[] = [
  {
    q: "What is Driive?",
    schemaAnswer:
      "Driive is a driving instructor app for UK ADIs and PDIs. It brings diary management, pupil records, bookings, card payments, prepaid blocks, DVSA progress tracking, reminders, enquiries and accounts into one system.",
    a: (
      <>
        Driive is a driving instructor app for UK ADIs and PDIs. It brings
        your{" "}
        <Link href="/features/smart-diary" className="font-medium text-[#2546F5] underline underline-offset-2">
          diary
        </Link>
        , pupils, bookings,{" "}
        <Link href="/features/payments" className="font-medium text-[#2546F5] underline underline-offset-2">
          card payments
        </Link>
        , prepaid blocks, DVSA progress, reminders, enquiries and accounts
        into one simple app built around how driving lessons actually work.
      </>
    ),
  },
  {
    q: "Who is Driive built for?",
    schemaAnswer:
      "Driive is built for independent UK driving instructors, including ADIs and PDIs, who manage pupils, lessons, payments and progress themselves. Multi-instructor driving school tools are planned after the solo instructor launch.",
    a: (
      <>
        Driive is built for independent UK driving instructors — ADIs and
        PDIs who manage pupils, lessons, payments and progress themselves.
        Multi-instructor{" "}
        <Link href="/schools" className="font-medium text-[#2546F5] underline underline-offset-2">
          driving school tools
        </Link>{" "}
        are planned after the solo instructor launch.
      </>
    ),
  },
  {
    q: "What is the difference between an ADI and a PDI?",
    schemaAnswer:
      "An ADI is an Approved Driving Instructor who has passed all three DVSA qualifying tests and is on the ADI register. A PDI is a Potential Driving Instructor still training towards that, who may teach for payment on a trainee licence. Driive supports both — the diary, payments and progress tools work the same way.",
    a: (
      <>
        An ADI is an Approved Driving Instructor — they&apos;ve passed all
        three DVSA qualifying tests and are on the ADI register. A PDI is a
        Potential Driving Instructor still training towards that, who may
        teach for payment on a trainee licence. Driive supports both: the
        diary, payments and progress tools work exactly the same way.
      </>
    ),
  },
  {
    q: "When does Driive launch?",
    schemaAnswer:
      "Driive is onboarding instructors in waves through 2026, starting with the waitlist in order of signup. Waitlist members receive one email when their access wave opens.",
    a: "We're onboarding instructors in waves through 2026, starting with the waitlist in order of signup. Join now and you'll get one email when it's your turn — nothing else in between.",
  },
  {
    q: "How does Driive help with diary management?",
    schemaAnswer:
      "Driive helps driving instructors manage their diary by using real availability, working hours, breaks, travel time and days off. Pupils can request genuine gaps, instructors approve bookings, and lessons can sync to Google, Apple or Outlook calendars.",
    a: (
      <>
        Driive helps you manage your driving instructor diary around real
        availability: working hours, breaks, days off and travel time between
        pick-ups. Pupils request genuine gaps, you approve each booking, and
        lessons can sync to Google, Apple or Outlook calendars through the{" "}
        <Link href="/features/smart-diary" className="font-medium text-[#2546F5] underline underline-offset-2">
          smart diary
        </Link>
        .
      </>
    ),
  },
  {
    q: "Can Driive replace my paper diary?",
    schemaAnswer:
      "Yes. Driive is designed to replace a paper diary, payment spreadsheets and reminder texts with one system. The diary, bookings, payments, progress records and accounts all update together when a lesson changes, so nothing needs copying between places.",
    a: (
      <>
        Yes — that&apos;s the point. Driive replaces the paper diary, the
        payments spreadsheet and the reminder texts with one system: when a
        lesson changes, the diary, payments, progress record and{" "}
        <Link href="/features/accounts" className="font-medium text-[#2546F5] underline underline-offset-2">
          accounts
        </Link>{" "}
        all update together, so nothing needs copying between places.
      </>
    ),
  },
  {
    q: "Can pupils book or request lessons through Driive?",
    schemaAnswer:
      "Yes. Pupils can request lessons from the available times an instructor chooses to offer. The instructor stays in control and can approve or decline each request before it appears in the diary.",
    a: (
      <>
        Yes. Pupils can request lessons from the available times you choose to
        offer. You stay in control: every booking request is approved or
        declined by you before it appears in the diary.
      </>
    ),
  },
  {
    q: "How do card payments and prepaid blocks work?",
    schemaAnswer:
      "Driive lets pupils pay by card, lets instructors send payment links, and tracks prepaid block balances to the penny. Block hours burn when lessons are completed, not when they are booked, so pupil balances stay accurate.",
    a: (
      <>
        Pupils can pay by card in the app, or you can send a payment link.
        Prepaid block balances are tracked to the penny, and hours burn when a
        lesson is completed — not when it is booked — so balances stay right
        in{" "}
        <Link href="/features/payments" className="font-medium text-[#2546F5] underline underline-offset-2">
          Payments
        </Link>
        .
      </>
    ),
  },
  {
    q: "Does Driive track DVSA progress?",
    schemaAnswer:
      "Yes. Driive tracks pupil progress against DVSA Ready to Pass skills. Instructors can mark skills from introduced to test-ready, record lesson debriefs, and use DL25-style mock tests to support test-readiness decisions.",
    a: (
      <>
        Yes. Driive tracks pupil progress against the DVSA
        &ldquo;Ready to Pass?&rdquo; skills. You can mark skills from introduced
        to test-ready, add lesson debriefs and use DL25-style mock tests to
        support test-readiness decisions. Driive is independent and not
        affiliated with or endorsed by the DVSA.
      </>
    ),
  },
  {
    q: "Is Driive affiliated with the DVSA?",
    schemaAnswer:
      "No. Driive is an independent company and is not affiliated with or endorsed by the DVSA. It tracks progress against the published DVSA syllabus and Ready to Pass guidance because that is the standard UK learners are tested to.",
    a: (
      <>
        No. Driive is an independent company and is not affiliated with or
        endorsed by the DVSA. We track{" "}
        <Link href="/features/progress" className="font-medium text-[#2546F5] underline underline-offset-2">
          progress
        </Link>{" "}
        against the published DVSA syllabus and &ldquo;Ready to Pass?&rdquo;
        guidance because that is the standard UK learners are tested to.
      </>
    ),
  },
  {
    q: "Does Driive send lesson reminders?",
    schemaAnswer:
      "Driive is designed to reduce manual reminder messages by putting lessons into pupil calendars and keeping bookings updated when times change. Reminder behaviour may vary by calendar and notification settings.",
    a: "Driive is designed to reduce manual reminder messages by putting lessons into pupil calendars and keeping bookings updated when times change. Reminder behaviour can vary by calendar and notification settings, but the goal is simple: fewer evening texts and fewer missed lessons.",
  },
  {
    q: "Can Driive help me manage new pupil enquiries?",
    schemaAnswer:
      "Yes. Driive includes enquiry tools for new pupil leads. A driving instructor can use a website or enquiry form to capture learner details, track enquiry status, and convert a lead into a pupil when they are ready to start lessons.",
    a: (
      <>
        Yes. Driive includes{" "}
        <Link href="/features/enquiries" className="font-medium text-[#2546F5] underline underline-offset-2">
          enquiry tools
        </Link>{" "}
        for new pupil leads. You can capture learner details through your
        website or enquiry form, track the enquiry status and convert a lead
        into a pupil when they are ready to start.
      </>
    ),
  },
  {
    q: "Can Driive help with accounts and tax records?",
    schemaAnswer:
      "Driive records lesson income, payment records, expenses, mileage and a running tax estimate for UK driving instructors. Records can be exported for an accountant or self-assessment.",
    a: (
      <>
        Yes.{" "}
        <Link href="/features/accounts" className="font-medium text-[#2546F5] underline underline-offset-2">
          Accounts &amp; Tax
        </Link>{" "}
        records lesson income, payment records, expenses, mileage and a
        running tax estimate as you teach. You can export clean records for
        your accountant or self-assessment.
      </>
    ),
  },
  {
    q: "Does Driive work on iPhone and Android?",
    schemaAnswer:
      "Yes. Driive runs on iPhone and Android, for instructors and pupils. Parents and guardians follow along through a private web link, and the instructor website at yourname.driive.app lives on the web — no download needed for either.",
    a: (
      <>
        Yes. Driive runs on iPhone and Android, for instructors and pupils
        alike. Parents and guardians follow along through a private web link,
        and your{" "}
        <Link href="/features/website" className="font-medium text-[#2546F5] underline underline-offset-2">
          instructor website
        </Link>{" "}
        lives on the web at yourname.driive.app — no download needed for
        either.
      </>
    ),
  },
  {
    q: "Do my pupils need to download anything?",
    schemaAnswer:
      "Pupils get their own free side of Driive so they can request lessons, see their credit balance, pay by card and follow their DVSA progress. Parents and guardians can use a private read-only web link without downloading an app.",
    a: "Pupils get their own free side of the Driive app: they request lessons, see their credit balance, pay by card and watch their DVSA progress build. Parents and guardians can follow along through a private, read-only web link — no app needed for them.",
  },
  {
    q: "Can I bring my existing pupils across?",
    schemaAnswer:
      "Yes. Instructors can add existing pupils manually or share a join code so pupils connect from their own phone. The instructor approves each request, and early-access instructors get setup help.",
    a: "Yes. Add pupils yourself in minutes, or share your join code and they connect from their own phone — you just approve each request. Early-access instructors get hands-on help getting set up.",
  },
  {
    q: "How much does Driive cost?",
    schemaAnswer:
      "Driive is free for up to ten pupils. Driive Pro adds unlimited pupils, DL25-style mock tests, lesson tools and a driving instructor website for £11.99 a month or £119.90 a year.",
    a: (
      <>
        Driive is free for up to ten pupils — not a trial. Pro, which adds
        unlimited pupils, DL25-style mock tests, lesson tools and your own
        website, is £11.99 a month or £119.90 a year — the detail is on our{" "}
        <Link href="/pricing" className="font-medium text-[#2546F5] underline underline-offset-2">
          pricing page
        </Link>
        .
      </>
    ),
  },
  {
    q: "Is my data safe?",
    schemaAnswer:
      "Driive encrypts data in transit and at rest, hosts data in UK/EU regions, handles personal data under UK GDPR, and does not sell personal data.",
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
    schemaAnswer:
      "Yes. Instructors can export pupils, lessons, payment records and progress history. The data belongs to the instructor's business, and UK GDPR rights also apply to personal data.",
    a: "Yes. Your pupils, lessons, payment records and progress history are yours, and you can export them whenever you like — there's no lock-in, and you take everything with you if you ever leave. Under UK GDPR you also have the right to request a full copy of your personal data at any time.",
  },
  {
    q: "Am I locked into a contract?",
    schemaAnswer:
      "No. Driive Pro is available monthly or annually and can be cancelled any time. Cancelling returns the account to the free plan, and pupil, lesson and payment records remain exportable.",
    a: "No. Pro is monthly or annual and you can cancel any time — you simply drop back to the free plan, and your pupils, lessons and payment records stay yours, exportable whenever you like.",
  },
];

export const DEFAULT_FAQ_SCHEMA = DEFAULT_FAQS.map((faq) => ({
  question: faq.q,
  answer: faq.schemaAnswer,
}));

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
          className={`group rounded-xl p-7 transition ${
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
