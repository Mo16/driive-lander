import Link from "next/link";
import { meta } from "@/lib/meta";
import { CONTAINER, CREAM, PINK, Eyebrow, Road } from "@/components/ui";
import { PageIntro, CtaSection, FaqSection, type Faq } from "@/components/sections";
import PricingPlans from "@/components/pricing-plans";

export const metadata = meta(
  "Pricing",
  "Driive is free for up to ten pupils — diary, payments, blocks, progress and accounts included. Pro adds unlimited pupils, mock tests, lesson tools and your own website for £11.99 a month — founding instructors lock in £5.99 forever.",
  "/pricing",
);

const PRINCIPLES = [
  {
    title: "Free to start, free to stay",
    body: "Up to ten pupils on the free plan, forever — not a trial. Every core tool is included: diary, payments, progress, even your books.",
  },
  {
    title: "One Pro plan",
    body: "£11.99 a month, or £119.90 a year — two months free. Founding instructors lock in £5.99 a month (£59.90 a year) forever. Unlimited pupils and the premium teaching tools. No add-ons, no surprises three months in.",
  },
  {
    title: "Cancel any time",
    body: "Pro is monthly or annual rolling, no contracts, no exit fees. Cancel and you drop back to Free — your pupils, lessons and records stay yours, exportable whenever.",
  },
];

const PRICING_FAQS: Faq[] = [
  {
    q: "What does the free plan include?",
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
    a: "Card payments carry a 5% fee per transaction, which covers card processing and next-day payouts to your bank. Recording a cash or bank-transfer payment is free. There are no per-pupil or per-booking fees on top.",
  },
  {
    q: "How do I pay for Pro?",
    a: "In the app through the App Store or Google Play, or by card on the web — whichever suits you. You manage the subscription wherever you bought it, and the annual plan works out at two months free.",
  },
  {
    q: "Do my pupils pay anything?",
    a: "No. Pupils use their side of Driive for free and just pay for their lessons — there is no app for them to buy and no booking fee added on top.",
  },
  {
    q: "What does 'founding instructor' mean?",
    a: "Instructors who join from the waitlist get access in the first waves, direct input into the roadmap, and the founding price — Pro at £5.99 a month or £59.90 a year, locked in forever rather than the standard £11.99 and £119.90.",
  },
  {
    q: "Will school pricing be different?",
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

export default function PricingPage() {
  return (
    <>
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
            Card payments carry a 5% per-transaction fee covering processing
            and next-day payouts. Recording cash or bank-transfer payments is
            free. Pro is available monthly or annually, in the app or on the
            web, and you can cancel any time.
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
              <div key={item.title} className="rounded-[2rem] bg-white p-8">
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

      {/* Founding offer note */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div
            className="rounded-[2.5rem] px-8 py-12 sm:px-12 lg:px-16"
            style={{ backgroundColor: "#0C0C0E" }}
          >
            <Eyebrow tone="light">Founding instructors</Eyebrow>
            <h2 className="mt-8 max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
              The waitlist is the best deal Driive will ever offer.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
              Founding instructors get first access, a direct line to the team
              building the product, and Pro at £5.99 a month or £59.90 a year
              — locked in forever, not an introductory rate. Full details land
              in your inbox before launch — no payment is taken on the
              waitlist.
            </p>
          </div>
        </div>
      </section>

      <FaqSection faqs={PRICING_FAQS} background={CREAM} />

      <CtaSection source="pricing" />
    </>
  );
}
