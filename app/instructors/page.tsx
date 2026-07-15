import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { meta } from "@/lib/meta";
import {
  JsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
  softwareApplicationJsonLd,
  faqPageJsonLd,
} from "@/lib/json-ld";
import {
  CONTAINER,
  BLUE,
  CREAM,
  PINK,
  Eyebrow,
  Road,
  Check,
  Arrow,
  LogoMark,
} from "@/components/ui";
import {
  CtaSection,
  FeatureLinkGrid,
  FaqSection,
  type Faq,
} from "@/components/sections";
import WaitlistForm from "@/components/waitlist-form";
import PricingPlans from "@/components/pricing-plans";
import {
  DiaryPhone,
  PaymentsCard,
  ProgressTree,
  MockTestCard,
  AccountsCard,
  WebsiteFrame,
} from "@/components/instructor-visuals";

const DESCRIPTION =
  "The driving instructor app for UK ADIs and PDIs. Run your diary, pupils, card payments, prepaid blocks, DVSA progress, mock tests and accounts from one place — and win back the hours you lose to admin.";

export const metadata = meta(
  "Driving instructor app for UK ADIs & PDIs",
  DESCRIPTION,
  "/instructors",
);

/* ----------------------------------- data --------------------------------- */

const TRUST: string[] = [
  "Free to start — no card",
  "Built for UK ADIs & PDIs",
  "Diary to accounts in one app",
  "Cancel any time",
];

/** Calendar + payment marks shown as "works with" proof under the trust bar.
    Plain <img> keeps the SVGs crisp at any size; alt text stays descriptive. */
const WORKS_WITH: { src: string; alt: string }[] = [
  { src: "/logos/google-pay.svg", alt: "Google Pay" },
  { src: "/logos/visa.svg", alt: "Visa" },
  { src: "/logos/mastercard.svg", alt: "Mastercard" },
  { src: "/logos/apple-pay.svg", alt: "Apple Pay" },
  { src: "/logos/stripe.svg", alt: "Stripe" },
  { src: "/logos/klarna.svg", alt: "Klarna" },
];

const DAY: { time: string; before: string; after: string }[] = [
  {
    time: "Morning",
    before: "Reply to overnight texts, juggle two reschedules by hand.",
    after:
      "Overnight booking requests are waiting in the diary — approve them with one tap over coffee.",
  },
  {
    time: "Between lessons",
    before: "Chase a payment, try to remember what Priya worked on last week.",
    after:
      "Paid by card in the app, or covered by her block. Priya's notes open with her profile.",
  },
  {
    time: "Evening",
    before: "An hour of texting to confirm tomorrow and fill Thursday's gap.",
    after:
      "Tomorrow is in everyone's calendar already. Thursday's gap is offered to your pupils in one tap.",
  },
];

const OUTCOMES: { stat: string; title: string; body: string }[] = [
  {
    stat: "Evenings",
    title: "Hours back every week",
    body: "Confirmations, reminders and reschedules stop being your second job. The diary and the calendars handle them, so your evenings are yours again.",
  },
  {
    stat: "£0 chased",
    title: "Money in, not chased",
    body: "Card payments, prepaid blocks tracked to the penny, and next-day payouts to your bank. You always know who owes what — without a single 'just a reminder' text.",
  },
  {
    stat: "No dead slots",
    title: "Empty slots, filled",
    body: "When a lesson cancels, offer the gap to your pupils in one tap. The first to claim it takes it, and a quiet Thursday stops meaning lost income.",
  },
];

type FeatureRowData = {
  kicker: string;
  title: string;
  body: string;
  points: string[];
  href: string;
  linkLabel: string;
  visual: ReactNode;
  panel: string;
};

const FEATURE_ROWS: FeatureRowData[] = [
  {
    kicker: "Smart Diary",
    title: "A diary that fills itself.",
    body: "Set your working pattern once — hours, breaks, days off and travel time between pick-ups. Pupils only ever see the gaps you genuinely have, and every request still needs your tap before it lands.",
    points: [
      "Pupils request your real availability — you approve or decline",
      "Lessons sync to Google, Apple and Outlook, and move when the lesson moves",
      "Cancelled slots re-offered to your pupils in one tap",
    ],
    href: "/features/smart-diary",
    linkLabel: "Explore Smart Diary",
    visual: <DiaryPhone />,
    panel: "bg-[#F0EEE7]",
  },
  {
    kicker: "Payments",
    title: "Balances right to the penny.",
    body: "Take card payments in the app, sell prepaid blocks, or mark a cash lesson paid in a tap. Block hours burn only when a lesson is completed — never on booking — so the maths can never drift.",
    points: [
      "Card payments with next-day payouts to your bank",
      "Prepaid blocks tracked automatically, balances always right",
      "See who owes what at a glance — no spreadsheet",
    ],
    href: "/features/payments",
    linkLabel: "Explore Payments",
    visual: <PaymentsCard />,
    panel: "bg-[#2546F5]/[0.05]",
  },
  {
    kicker: "Progress",
    title: "Know who's test-ready.",
    body: "Mark every pupil against the DVSA syllabus, lesson by lesson, from introduced to test-ready. Your pupils watch their own progress build in their app — so 'am I ready?' answers itself.",
    points: [
      "The full DVSA 'Ready to Pass?' syllabus per pupil",
      "An overall readiness percentage that rolls up on its own",
      "Pupils see their progress too — motivation built in",
    ],
    href: "/features/progress",
    linkLabel: "Explore Progress",
    visual: <ProgressTree />,
    panel: "bg-[#F9D7E2]/40",
  },
  {
    kicker: "Lesson Tools",
    title: "Mark a mock like the real thing.",
    body: "Run a DL25-style mock test marked against the DVSA fault categories with a timer running, sketch the route you just drove over a live map, and share it all in a debrief your pupil keeps.",
    points: [
      "DL25-style mock tests, minors to dangerous, saved to the lesson",
      "Draw over a live map of the route, or sketch a junction",
      "Resources and debriefs land in the pupil's app",
    ],
    href: "/features/lesson-tools",
    linkLabel: "Explore Lesson Tools",
    visual: <MockTestCard />,
    panel: "bg-[#F0EEE7]",
  },
  {
    kicker: "Accounts & Tax",
    title: "Your books, done from the car.",
    body: "Every lesson and card payment lands in your ledger automatically. Log mileage per car, snap receipts for expenses, and watch a running tax estimate — ready to export for self-assessment.",
    points: [
      "Income recorded as you teach, profit by month or tax year",
      "Per-car mileage on the simplified or actual-cost method",
      "A running tax pot, then a one-tap year-end export",
    ],
    href: "/features/accounts",
    linkLabel: "Explore Accounts & Tax",
    visual: <AccountsCard />,
    panel: "bg-[#2546F5]/[0.05]",
  },
  {
    kicker: "Website & Enquiries",
    title: "Turn local learners into pupils.",
    body: "Publish a professional booking site at yourname.driive.app with your prices, areas and reviews. Its enquiry form drops every new lead into one tidy inbox — convert them to a pupil in a tap.",
    points: [
      "A real website, no developer, live in minutes",
      "Every enquiry in one inbox with a clear status",
      "One tap turns a lead into a booked pupil",
    ],
    href: "/features/website",
    linkLabel: "Explore Your Website",
    visual: <WebsiteFrame />,
    panel: "bg-[#F9D7E2]/40",
  },
];

const AUDIENCE: { tag: string; title: string; body: string }[] = [
  {
    tag: "ADIs",
    title: "Approved Driving Instructors",
    body: "Run your whole independent business from one app — diary, pupils, payments, progress and accounts — instead of a paper diary and three spreadsheets.",
  },
  {
    tag: "PDIs",
    title: "Trainee instructors",
    body: "Teaching for payment on a trainee licence works exactly the same way. Start clean from your first pupil, so nothing needs untangling once you qualify.",
  },
  {
    tag: "Going solo",
    title: "Leaving a franchise",
    body: "Build your own brand from day one: your own booking site, your own pupil records, your own payouts — and no franchise fee taking a slice of every lesson.",
  },
];

/* Curated instructor-intent FAQs — distinct from the home set so each page owns
   its own FAQPage schema. Answers stand alone for answer engines; schemaAnswer
   is the plain-text version emitted as JSON-LD. */
const INSTRUCTOR_FAQS: Faq[] = [
  {
    q: "What is the best app for driving instructors?",
    schemaAnswer:
      "Driive is an all-in-one app for UK driving instructors. It brings the diary, pupil records, card payments, prepaid blocks, DVSA progress tracking, DL25-style mock tests, enquiries and accounts into one place built around how driving lessons actually work, so an instructor does not need separate tools for booking, payments and bookkeeping.",
    a: (
      <>
        Driive is an all-in-one app for UK driving instructors. It brings your{" "}
        <Link href="/features/smart-diary" className="font-medium text-[#2546F5] underline underline-offset-2">
          diary
        </Link>
        , pupil records,{" "}
        <Link href="/features/payments" className="font-medium text-[#2546F5] underline underline-offset-2">
          card payments
        </Link>
        , prepaid blocks, DVSA progress, mock tests, enquiries and{" "}
        <Link href="/features/accounts" className="font-medium text-[#2546F5] underline underline-offset-2">
          accounts
        </Link>{" "}
        into one app — so you stop stitching together a paper diary, a payments
        spreadsheet and a pile of reminder texts.
      </>
    ),
  },
  {
    q: "How much does Driive cost for a driving instructor?",
    schemaAnswer:
      "Driive is free for up to ten pupils, with the whole toolkit included — it is not a trial. Driive Pro adds unlimited pupils, DL25-style mock tests, lesson tools and a driving instructor website for £11.99 a month or £119.90 a year. There are no per-pupil or per-booking fees.",
    a: (
      <>
        Driive is free for up to ten pupils — the whole toolkit included, not a
        trial. Pro adds unlimited pupils, DL25-style mock tests, lesson tools and
        your own website for £11.99 a month or £119.90 a year. The full detail is
        on our{" "}
        <Link href="/pricing" className="font-medium text-[#2546F5] underline underline-offset-2">
          pricing page
        </Link>
        .
      </>
    ),
  },
  {
    q: "Do I need to be a qualified ADI to use Driive?",
    schemaAnswer:
      "No. Driive supports both ADIs and PDIs. An ADI is an Approved Driving Instructor on the DVSA register; a PDI is a Potential Driving Instructor teaching for payment on a trainee licence. The diary, payments, progress and accounts tools work the same way for both.",
    a: "No. Driive supports both ADIs and PDIs. An ADI is an Approved Driving Instructor on the DVSA register; a PDI is a Potential Driving Instructor still training, who may teach for payment on a trainee licence. The diary, payments, progress and accounts work exactly the same way for both — and starting on Driive as a PDI means nothing needs untangling once you qualify.",
  },
  {
    q: "I'm leaving my franchise to go independent — can Driive run my business?",
    schemaAnswer:
      "Yes. Driive is built for independent instructors. It gives you your own booking website, pupil records, card payments with next-day payouts, a managed diary, DVSA progress tracking and built-in accounts — everything you need to run a driving school on your own, without a franchise fee taking a cut of every lesson.",
    a: (
      <>
        Yes — that is exactly who it is built for. You get your own{" "}
        <Link href="/features/website" className="font-medium text-[#2546F5] underline underline-offset-2">
          booking website
        </Link>
        , your own pupil records, card payments with next-day payouts, a managed{" "}
        <Link href="/features/smart-diary" className="font-medium text-[#2546F5] underline underline-offset-2">
          diary
        </Link>{" "}
        and built-in{" "}
        <Link href="/features/accounts" className="font-medium text-[#2546F5] underline underline-offset-2">
          accounts
        </Link>{" "}
        — everything you need to go independent, with no franchise fee taking a
        slice of every lesson.
      </>
    ),
  },
  {
    q: "Can pupils book and request lessons themselves?",
    schemaAnswer:
      "Yes. Pupils request lessons from the genuine gaps an instructor chooses to offer, based on their working hours, breaks, days off and travel time. The instructor approves or declines each request before it appears in the diary, so nothing is ever booked without their say-so.",
    a: (
      <>
        Yes. Pupils request lessons from the genuine gaps you choose to offer —
        worked out from your hours, breaks, days off and travel time — and you
        approve or decline each one before it lands in the{" "}
        <Link href="/features/smart-diary" className="font-medium text-[#2546F5] underline underline-offset-2">
          diary
        </Link>
        . You stay in control of every booking.
      </>
    ),
  },
  {
    q: "How do I take card payments as a driving instructor?",
    schemaAnswer:
      "Driive lets pupils pay by card in the app, one lesson or several at once, with a quick Stripe-hosted setup pre-filled from your details. Money lands in your bank account the day after it settles. Cash and bank-transfer lessons are marked paid in a tap, and prepaid blocks are tracked to the penny.",
    a: (
      <>
        Pupils pay by card in the app — one lesson or several at once — after a
        quick, Stripe-hosted setup pre-filled from your details. The money lands
        in your bank the day after it settles, and cash or bank-transfer lessons
        are marked paid in a tap. It all lives in{" "}
        <Link href="/features/payments" className="font-medium text-[#2546F5] underline underline-offset-2">
          Payments
        </Link>
        .
      </>
    ),
  },
  {
    q: "How do prepaid blocks of lessons work?",
    schemaAnswer:
      "A block is a bundle of lesson hours a pupil buys up front, usually at a small discount. Driive tracks each block to the penny and burns hours only when a lesson is completed, never when it is booked, so the balance can never drift. If a prepaid lesson is cancelled, the hours return to the pupil's credit balance automatically.",
    a: (
      <>
        A block is a bundle of hours bought up front, usually at a small
        discount. Driive tracks every block to the penny and burns hours only on
        completion — never on booking — so balances stay right. Cancel a prepaid
        lesson and the hours flow back to the pupil&apos;s credit on their own.
        See{" "}
        <Link href="/features/payments" className="font-medium text-[#2546F5] underline underline-offset-2">
          Payments
        </Link>
        .
      </>
    ),
  },
  {
    q: "Does Driive track DVSA progress and test-readiness?",
    schemaAnswer:
      "Yes. Driive tracks every pupil against the DVSA syllabus and 'Ready to Pass?' skills. Instructors mark each skill from introduced to test-ready, an overall readiness percentage rolls up automatically, and DL25-style mock tests back the test conversation with evidence. Driive is independent and not affiliated with or endorsed by the DVSA.",
    a: (
      <>
        Yes. Driive tracks every pupil against the DVSA syllabus and
        &ldquo;Ready to Pass?&rdquo; skills — mark each one from introduced to
        test-ready, watch the readiness percentage roll up, and back it with a
        DL25-style{" "}
        <Link href="/features/lesson-tools" className="font-medium text-[#2546F5] underline underline-offset-2">
          mock test
        </Link>
        . Driive is independent and not affiliated with or endorsed by the DVSA.
      </>
    ),
  },
  {
    q: "Can Driive track my mileage and tax?",
    schemaAnswer:
      "Yes. Driive records lesson income automatically and lets instructors log business mileage per car on the HMRC simplified or actual-cost method, snap receipts for expenses, and watch a running tax estimate through the year. Clean records can be exported for an accountant or Self Assessment.",
    a: (
      <>
        Yes.{" "}
        <Link href="/features/accounts" className="font-medium text-[#2546F5] underline underline-offset-2">
          Accounts &amp; Tax
        </Link>{" "}
        records income as you teach, logs mileage per car on the simplified or
        actual-cost method, holds receipts for expenses and keeps a running tax
        estimate — then exports clean records for your accountant or Self
        Assessment in one tap.
      </>
    ),
  },
  {
    q: "Will my lessons sync with my calendar?",
    schemaAnswer:
      "Yes. Driive syncs lessons to Google, Apple and Outlook calendars. A live feed keeps your calendar app current, every confirmed lesson arrives as a calendar invite that updates on reschedule, and pupils get invites too — so the lesson lives in both diaries with the pick-up point attached.",
    a: (
      <>
        Yes — to Google, Apple and Outlook. A live feed keeps your calendar app
        current, every lesson arrives as an invite that updates when it moves,
        and pupils get invites too, so the time lives in both diaries. It is part
        of the{" "}
        <Link href="/features/smart-diary" className="font-medium text-[#2546F5] underline underline-offset-2">
          Smart Diary
        </Link>
        .
      </>
    ),
  },
  {
    q: "Do my pupils have to use the app?",
    schemaAnswer:
      "No. Pupils get their own free side of Driive to request lessons, see their balance, pay by card and follow their progress, but a pupil who never opens the app is still fully managed from the instructor's side. Parents and guardians can follow along through a private read-only web link with no app to download.",
    a: (
      <>
        No. Pupils get their own free side of the app — requests, balance,
        payments and progress — but a pupil who never opens it is still fully run
        from your side. Parents follow along through a private, read-only web
        link, with no app to download. More in the{" "}
        <Link href="/features/pupil-hub" className="font-medium text-[#2546F5] underline underline-offset-2">
          Pupil Hub
        </Link>
        .
      </>
    ),
  },
  {
    q: "Can I move my existing pupils across?",
    schemaAnswer:
      "Yes. Instructors can add existing pupils manually in a couple of minutes each, or share a join code so pupils connect from their own phone — the instructor just approves each request. There is no all-or-nothing migration, and early-access instructors get hands-on help getting set up.",
    a: "Yes. Add pupils yourself in a couple of minutes each, or share your join code and they connect from their own phone — you just approve each request. There's no all-or-nothing migration, and early-access instructors get hands-on help getting set up.",
  },
  {
    q: "When can I start, and does it cost to join the waitlist?",
    schemaAnswer:
      "Joining the waitlist is free. Driive is onboarding instructors in waves through 2026, in order of signup. Waitlist members receive one email when their access wave opens, and nothing else in between.",
    a: "Joining the waitlist is free. We're onboarding instructors in waves through 2026, in order of signup — join now and you'll get one email when it's your turn, and nothing else in between.",
  },
  {
    q: "Is my data safe and GDPR compliant?",
    schemaAnswer:
      "Yes. Driive encrypts data in transit and at rest, hosts it in the UK and EU, handles personal data under UK GDPR and never sells data. Pupil, lesson and payment records belong to the instructor's business and can be exported at any time.",
    a: (
      <>
        Yes. Your data is encrypted in transit and at rest, hosted in the UK and
        EU, handled under UK GDPR and never sold. Your records are yours and
        export any time — full detail is on our{" "}
        <Link href="/security" className="font-medium text-[#2546F5] underline underline-offset-2">
          Security page
        </Link>
        .
      </>
    ),
  },
];

const INSTRUCTOR_FAQ_SCHEMA = INSTRUCTOR_FAQS.map((faq) => ({
  question: faq.q,
  answer: faq.schemaAnswer,
}));

const FEATURE_LIST = [
  "Driving instructor diary and booking management",
  "Pupil records and CRM",
  "Card payments and prepaid blocks",
  "DVSA progress tracking",
  "DL25-style mock tests and lesson tools",
  "Accounts, mileage and tax",
  "Instructor booking website",
  "New-pupil enquiry management",
];

/* --------------------------------- pieces --------------------------------- */

function FeatureRow({ row, reverse }: { row: FeatureRowData; reverse: boolean }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={reverse ? "lg:order-2" : ""}>
        <Eyebrow>{row.kicker}</Eyebrow>
        <h3 className="mt-6 text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-neutral-900">
          {row.title}
        </h3>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-600">
          {row.body}
        </p>
        <ul className="mt-7 space-y-3.5">
          {row.points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-0.5 text-[#2546F5]">
                <Check className="h-5 w-5" />
              </span>
              <span className="text-[15px] leading-relaxed text-neutral-700">
                {point}
              </span>
            </li>
          ))}
        </ul>
        <Link
          href={row.href}
          className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-[#2546F5] underline underline-offset-2 hover:opacity-80"
        >
          {row.linkLabel}
          <Arrow />
        </Link>
      </div>
      <div className={reverse ? "lg:order-1" : ""}>
        <div
          className={`flex items-center justify-center rounded-xl p-10 sm:p-14 ${row.panel}`}
        >
          {row.visual}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function InstructorsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/instructors",
            name: "Driive for driving instructors",
            description: DESCRIPTION,
          }),
          softwareApplicationJsonLd({
            name: "Driive for driving instructors",
            description: DESCRIPTION,
            path: "/instructors",
            featureList: FEATURE_LIST,
          }),
          faqPageJsonLd(INSTRUCTOR_FAQ_SCHEMA),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "For driving instructors", path: "/instructors" },
          ]),
        ]}
      />

      {/* Hero — same layout as the home hero: copy + form left, phone image
          bleeding off the bottom-right. Absolutely positioned because the image
          is wider than its track and would otherwise throw the centring off. */}
      <section
        className="relative -mb-px overflow-hidden pb-0 pt-32 lg:pb-28 lg:pt-44"
        style={{ backgroundColor: BLUE }}
      >
        <div className={`${CONTAINER} grid items-center gap-16 lg:grid-cols-2`}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-[#F9D7E2] ring-1 ring-white/15">
              <LogoMark tile={PINK} road={BLUE} className="h-5 w-5" />
              For driving instructors
            </span>
            <h1 className="mt-8 text-[clamp(2.7rem,6.2vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[#F9D7E2]">
              You teach.
              <br />
              Driive runs
              <br />
              the rest.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#F9D7E2]/90 sm:text-xl">
              The driving instructor app for UK ADIs and PDIs. Your diary,
              pupils, card payments, DVSA progress and accounts in one place — so
              you spend less time on admin and more time in the car.
            </p>
            <div className="mt-10">
              <WaitlistForm variant="blue" source="instructors-hero" />
            </div>
            <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-[#F9D7E2]/90">
              {TRUST.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F9D7E2]/60">
                Works with
              </span>
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {WORKS_WITH.map((logo) => (
                  <li key={logo.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-6 w-auto opacity-80 brightness-0 invert"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative h-[min(180vw,800px)] w-full self-end lg:h-[560px]">
            <div className="absolute -inset-10 -z-0 rounded-full bg-[#F9D7E2]/20 blur-3xl lg:hidden" />
            <Image
              src="/images/phone.png"
              alt="The Driive app showing a driving instructor's daily diary"
              width={1254}
              height={1254}
              priority
              className="absolute left-1/2 top-0 w-[min(180vw,800px)] max-w-none -translate-x-1/2 drop-shadow-2xl lg:top-[72%] lg:w-[820px] lg:-translate-y-1/2 xl:w-[980px]"
            />
          </div>
        </div>
      </section>
      <Road from={BLUE} to="#FFFFFF" />

      {/* Trust + a day on Driive */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div>
            <Eyebrow>A normal day, fixed</Eyebrow>
          </div>
          <h2 className="mt-8 max-w-3xl text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
            Same lessons.
            <br />
            None of the admin.
          </h2>
          <div className="mt-14 space-y-5">
            {DAY.map((row) => (
              <div
                key={row.time}
                className="grid gap-4 rounded-xl p-7 sm:p-8 lg:grid-cols-[160px_1fr_1fr] lg:items-center lg:gap-10"
                style={{ backgroundColor: CREAM }}
              >
                <p className="text-lg font-semibold tracking-tight text-neutral-900">
                  {row.time}
                </p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                    Without Driive
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-neutral-500">
                    {row.before}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2546F5]">
                    With Driive
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-neutral-800">
                    {row.after}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-xl bg-[#2546F5] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-md">
              <p className="text-2xl font-semibold tracking-[-0.02em] text-[#F9D7E2]">
                Get those hours back.
              </p>
              <p className="mt-2 text-[#F9D7E2]/85">
                Join the waitlist — founding instructors get in first.
              </p>
            </div>
            <div className="mt-7 lg:mt-0">
              <WaitlistForm variant="blue" source="instructors-mid" />
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
        <div className={CONTAINER}>
          <Eyebrow>What changes</Eyebrow>
          <h2 className="mt-8 max-w-3xl text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
            Less admin. Cleaner books.
            <br />
            A fuller diary.
          </h2>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {OUTCOMES.map((o) => (
              <div
                key={o.title}
                className="flex flex-col rounded-xl bg-white p-8 shadow-[0_25px_60px_-40px_rgba(12,12,14,0.3)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#2546F5]">
                  {o.stat}
                </p>
                <p className="mt-4 text-xl font-semibold tracking-tight text-neutral-900">
                  {o.title}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
                  {o.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature deep-dives */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <Eyebrow>The whole job, one app</Eyebrow>
          <h2 className="mt-8 max-w-3xl text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
            Everything an instructor
            <br />
            actually does in a week.
          </h2>
          <div className="mt-16 space-y-20 lg:space-y-28">
            {FEATURE_ROWS.map((row, i) => (
              <FeatureRow key={row.kicker} row={row} reverse={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Whole toolkit grid — links every feature */}
      <section className="bg-white pb-20 lg:pb-28">
        <div className={CONTAINER}>
          <Eyebrow>The toolkit</Eyebrow>
          <h2 className="mt-8 max-w-2xl text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
            Free to start. The whole toolkit.
          </h2>
          <div className="mt-12">
            <FeatureLinkGrid />
          </div>
        </div>
      </section>

      <Road from="#FFFFFF" to={PINK} />

      {/* Built for the job */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: PINK }}>
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <Eyebrow>Built for the job</Eyebrow>
              <h2 className="mt-8 text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
                Made for how
                <br />
                instructing works.
              </h2>
            </div>
            <ul className="space-y-5">
              {(
                [
                  {
                    key: "travel",
                    text: (
                      <>
                        Travel time between pick-up points planned into the{" "}
                        <Link href="/features/smart-diary" className="font-medium text-[#2546F5] underline underline-offset-2">
                          smart diary
                        </Link>{" "}
                        automatically.
                      </>
                    ),
                  },
                  {
                    key: "blocks",
                    text: (
                      <>
                        <Link href="/features/payments" className="font-medium text-[#2546F5] underline underline-offset-2">
                          Prepaid blocks
                        </Link>{" "}
                        tracked to the penny — hours burn on completion, never
                        on booking.
                      </>
                    ),
                  },
                  {
                    key: "progress",
                    text: (
                      <>
                        <Link href="/features/progress" className="font-medium text-[#2546F5] underline underline-offset-2">
                          Progress mapped to the DVSA &lsquo;Ready to
                          Pass?&rsquo; skills
                        </Link>
                        , so test-readiness is based on evidence.
                      </>
                    ),
                  },
                  {
                    key: "calendars",
                    text: "Lessons sync to Google, Apple and Outlook calendars, and move when the lesson moves.",
                  },
                  {
                    key: "one-handed",
                    text: "Works one-handed on your phone in the car, between lessons.",
                  },
                  {
                    key: "pupil-app",
                    text: (
                      <>
                        Pupils get{" "}
                        <Link href="/features/pupil-hub" className="font-medium text-[#2546F5] underline underline-offset-2">
                          their own free app
                        </Link>{" "}
                        — requests, payments and progress — and parents can
                        follow along on the web.
                      </>
                    ),
                  },
                ] satisfies { key: string; text: ReactNode }[]
              ).map((item) => (
                <li key={item.key} className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#2546F5] text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-lg leading-relaxed text-neutral-800">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Road from={PINK} to="#FFFFFF" />

      {/* Who it's for */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <Eyebrow>Who it&apos;s for</Eyebrow>
          <h2 className="mt-8 max-w-2xl text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
            For independent UK instructors.
          </h2>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {AUDIENCE.map((a) => (
              <div
                key={a.tag}
                className="flex flex-col rounded-xl p-8"
                style={{ backgroundColor: CREAM }}
              >
                <span className="inline-flex w-fit rounded-full bg-[#2546F5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white">
                  {a.tag}
                </span>
                <p className="mt-5 text-xl font-semibold tracking-tight text-neutral-900">
                  {a.title}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Road from="#FFFFFF" to={BLUE} />

      {/* Pupils + parents */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: BLUE }}>
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow tone="light">They get an app too</Eyebrow>
              <h2 className="mt-8 text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#F9D7E2]">
                Pupils book.
                <br />
                Parents watch on.
              </h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#F9D7E2]/90">
                Your pupils get their own free side of Driive — request lessons,
                pay by card, watch their DVSA progress build. Parents and
                guardians follow along through a private, read-only web link.
                Less to download, fewer texts to send, and a learner who can
                see for themselves how close test-ready is.
              </p>
              <Link
                href="/features/pupil-hub"
                className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-white underline underline-offset-2 hover:opacity-85"
              >
                See the Pupil Hub
                <Arrow />
              </Link>
            </div>
            <div className="justify-self-center">
              <ProgressTree />
            </div>
          </div>
        </div>
      </section>

      <Road from={BLUE} to="#FFFFFF" />

      {/* Pricing teaser */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <Eyebrow>Simple pricing</Eyebrow>
          <h2 className="mt-8 max-w-2xl text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
            Pay nothing until you grow.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
            Run up to ten pupils on Driive for free — the whole toolkit
            included. When your book fills up, one Pro plan unlocks unlimited
            pupils and the premium teaching tools.
          </p>
          <div className="mt-12">
            <PricingPlans />
          </div>
          <p className="mt-8">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#2546F5] underline underline-offset-2 hover:opacity-80"
            >
              See full pricing
              <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </section>

      <FaqSection faqs={INSTRUCTOR_FAQS} background={CREAM} />

      <CtaSection source="instructors" />
    </>
  );
}
