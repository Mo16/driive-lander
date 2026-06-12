import Link from "next/link";
import { meta } from "@/lib/meta";
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { CONTAINER, CREAM, PINK, Eyebrow, Road } from "@/components/ui";
import { PageIntro, CtaSection, FaqSection, type Faq } from "@/components/sections";
import PricingPlans from "@/components/pricing-plans";

const DESCRIPTION =
  "Driive pricing for UK driving instructors: free for up to ten pupils, with Pro for unlimited pupils, mock tests, lesson tools and your own website.";

export const metadata = meta(
  "Pricing",
  DESCRIPTION,
  "/pricing",
);

const PRINCIPLES = [
  {
    title: "Free to start, free to stay",
    body: "Up to ten pupils on the free plan, forever — not a trial. Every core tool is included: diary, payments, progress, even your books.",
  },
  {
    title: "One Pro plan",
    body: "£11.99 a month, or £119.90 a year — two months free. Unlimited pupils and the premium teaching tools. No add-ons, no surprises three months in.",
  },
  {
    title: "Cancel any time",
    body: "Pro is monthly or annual rolling, no contracts, no exit fees. Cancel and you drop back to Free — your pupils, lessons and records stay yours, exportable whenever.",
  },
];

const PRICING_FAQS: Faq[] = [
  {
    q: "What does the free plan include?",
    schemaAnswer:
      "The free plan includes diary and booking requests, card payments with next-day payouts, prepaid blocks, DVSA progress tracking, the enquiries inbox and accounts for up to ten active pupils. Learners who have passed or been archived do not count towards the limit.",
    a: (
      <>
        The whole core toolkit:{" "}
        <Link href="/features/smart-diary" className="font-medium text-[#2546F5] underline underline-offset-2">
          diary and booking requests
        </Link>
        ,{" "}
        <Link href="/features/payments" className="font-medium text-[#2546F5] underline underline-offset-2">
          card payments with next-day payouts
        </Link>
        , prepaid blocks,{" "}
        <Link href="/features/progress" className="font-medium text-[#2546F5] underline underline-offset-2">
          DVSA progress tracking
        </Link>
        , the enquiries inbox and{" "}
        <Link href="/features/accounts" className="font-medium text-[#2546F5] underline underline-offset-2">
          your accounts
        </Link>
        . The only limit is ten active pupils — learners who have passed or
        been archived don&apos;t count towards it.
      </>
    ),
  },
  {
    q: "What does Pro add?",
    schemaAnswer:
      "Driive Pro adds unlimited pupils, DL25-style mock tests, route sketches over a live map, lesson resources pupils can keep, and a driving instructor website at yourname.driive.app with a built-in enquiry form.",
    a: (
      <>
        Unlimited pupils, plus the premium teaching tools:{" "}
        <Link href="/features/lesson-tools" className="font-medium text-[#2546F5] underline underline-offset-2">
          DL25-style mock tests
        </Link>{" "}
        marked against DVSA fault categories, route sketches over a live map,
        lesson resources your pupils keep, and{" "}
        <Link href="/features/website" className="font-medium text-[#2546F5] underline underline-offset-2">
          your own website at yourname.driive.app
        </Link>{" "}
        with a built-in enquiry form.
      </>
    ),
  },
  {
    q: "Are card processing fees included?",
    schemaAnswer:
      "Card payments carry a 3.5% fee per transaction on Free and 1.5% on Pro, covering card processing and next-day payouts. Recording cash or bank-transfer payments is free, and there are no extra per-pupil or per-booking fees.",
    a: "Card payments carry a 3.5% fee per transaction on Free — just 1.5% on Pro — which covers card processing and next-day payouts to your bank. Recording a cash or bank-transfer payment is free. There are no per-pupil or per-booking fees on top.",
  },
  {
    q: "How do I pay for Pro?",
    schemaAnswer:
      "Instructors can pay for Driive Pro in the app through the App Store or Google Play, or by card on the web. Subscriptions are managed wherever they were purchased, and the annual plan works out at two months free.",
    a: "In the app through the App Store or Google Play, or by card on the web — whichever suits you. You manage the subscription wherever you bought it, and the annual plan works out at two months free.",
  },
  {
    q: "Do my pupils pay anything?",
    schemaAnswer:
      "No. Pupils use their side of Driive for free and only pay for their lessons. There is no pupil app fee and no booking fee added on top.",
    a: "No. Pupils use their side of Driive for free and just pay for their lessons — there is no app for them to buy and no booking fee added on top.",
  },
  {
    q: "Will school pricing be different?",
    schemaAnswer:
      "Yes. Multi-instructor school accounts will launch later with separate pricing. Driving schools can register interest on the For driving schools page.",
    a: (
      <>
        Yes. Multi-instructor school accounts launch later with their own
        pricing. You can register interest on the{" "}
        <Link href="/schools" className="font-medium text-[#2546F5] underline underline-offset-2">
          For driving schools page
        </Link>
        .
      </>
    ),
  },
];

const PRICING_FAQ_SCHEMA = PRICING_FAQS.map((faq) => ({
  question: faq.q,
  answer: faq.schemaAnswer,
}));

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/pricing",
            name: "Driive pricing",
            description: DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
          faqPageJsonLd(PRICING_FAQ_SCHEMA),
        ]}
      />

      <PageIntro
        eyebrow="Pricing"
        title={
          <>
            Free to start.
            <br />
            Pro when you grow.
          </>
        }
        lede="Run up to ten pupils on Driive for nothing — everything included. When your book fills up, one Pro plan unlocks unlimited pupils and the premium teaching tools."
      />

      {/* Plans */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <PricingPlans />
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-neutral-400">
            Card payments carry a 3.5% per-transaction fee on Free — 1.5% on
            Pro — covering processing and next-day payouts. Recording cash or
            bank-transfer payments is free. Pro is available monthly or
            annually, in the app or on the web, and you can cancel any time.
          </p>
        </div>
      </section>

      <Road from="#FFFFFF" to={PINK} />

      {/* Principles */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: PINK }}>
        <div className={CONTAINER}>
          <Eyebrow>How pricing works</Eyebrow>
          <h2 className="mt-8 max-w-3xl text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
            Plain numbers.
            <br />
            No small print traps.
          </h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PRINCIPLES.map((item) => (
              <div key={item.title} className="rounded-xl bg-white p-8">
                <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Road from={PINK} to="#FFFFFF" />

      <FaqSection faqs={PRICING_FAQS} background={CREAM} />

      <CtaSection source="pricing" />
    </>
  );
}
