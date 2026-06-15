import Link from "next/link";
import type { ReactNode } from "react";
import { meta } from "@/lib/meta";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import {
  CONTAINER,
  BLUE,
  CREAM,
  PINK,
  Eyebrow,
  Road,
  Check,
  LogoMark,
} from "@/components/ui";
import {
  PageIntro,
  CtaSection,
  FeatureLinkGrid,
  FaqSection,
} from "@/components/sections";
import WaitlistForm from "@/components/waitlist-form";
import PricingPlans from "@/components/pricing-plans";

const DESCRIPTION =
  "Driving instructor software for UK ADIs and PDIs: manage your diary, pupils, card payments, prepaid blocks, DVSA progress, mock tests and accounts in one app.";

export const metadata = meta(
  "For driving instructors",
  DESCRIPTION,
  "/instructors",
);

const DAY: { time: string; before: string; after: string }[] = [
  {
    time: "Morning",
    before: "Reply to overnight texts, juggle two reschedules by hand.",
    after: "Overnight booking requests are waiting in the diary — approve them with one tap over coffee.",
  },
  {
    time: "Between lessons",
    before: "Chase a payment, try to remember what Priya worked on last week.",
    after: "Paid by card in the app, or covered by her block. Priya's notes open with her profile.",
  },
  {
    time: "Evening",
    before: "An hour of texting to confirm tomorrow and fill Thursday's gap.",
    after: "Tomorrow is in everyone's calendar already. Thursday's gap is offered to your pupils in one tap.",
  },
];

const TRUST: string[] = [
  "Free to start — no card",
  "Built for UK ADIs & PDIs",
  "Diary to accounts in one app",
  "Cancel any time",
];

/* ---------------------------- product visual -----------------------------
   A diary day mockup for the hero — CSS/SVG only, no imagery. Shows the
   three things that win an instructor over: paid lessons, a tracked block,
   and a booking request waiting to be approved.
--------------------------------------------------------------------------- */

function DiaryPhone() {
  return (
    <div className="relative mx-auto w-[290px] shrink-0 rotate-2 rounded-[3rem] border-[10px] border-neutral-950 bg-white shadow-[0_50px_100px_-30px_rgba(0,0,0,0.45)] sm:w-[320px]">
      <div className="absolute left-1/2 top-3 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-neutral-950" />
      <div className="overflow-hidden rounded-[2.35rem]">
        <div className="flex h-[500px] flex-col bg-[#F7F5F2] pt-12 text-[13px] leading-relaxed">
          <div className="flex items-center gap-2 border-b border-neutral-200 bg-white px-5 pb-3 pt-1">
            <LogoMark tile={BLUE} road={PINK} className="h-6 w-6" />
            <span className="text-sm font-semibold text-neutral-900">driive</span>
            <span className="ml-auto rounded-full bg-[#F9D7E2] px-2.5 py-1 text-[10px] font-semibold text-[#2546F5]">
              Tue 14 Apr
            </span>
          </div>

          <div className="flex-1 space-y-2.5 px-4 py-4">
            <div className="rounded-xl bg-[#2546F5] px-4 py-3.5 text-white">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#F9D7E2]">
                Today
              </p>
              <p className="mt-1 flex items-center justify-between text-[15px] font-semibold">
                3 lessons
                <span className="text-[#F9D7E2]">£105 booked</span>
              </p>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-neutral-200">
              <div>
                <p className="font-medium text-neutral-900">09:00 · Priya Shah</p>
                <p className="text-[11px] text-neutral-400">Manual · Wandsworth</p>
              </div>
              <span className="rounded-full bg-[#2546F5]/10 px-2.5 py-1 text-[10px] font-semibold text-[#2546F5]">
                Paid
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-neutral-200">
              <div>
                <p className="font-medium text-neutral-900">11:00 · Tom Reed</p>
                <p className="text-[11px] text-neutral-400">Block · 8 of 10 left</p>
              </div>
              <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold text-neutral-500">
                Block
              </span>
            </div>

            <div className="rounded-xl bg-white px-4 py-3 ring-2 ring-[#2546F5]">
              <p className="flex items-center justify-between">
                <span className="font-medium text-neutral-900">14:00 · New request</span>
                <span className="rounded-full bg-[#2546F5] px-3 py-1 text-[10px] font-semibold text-white">
                  Approve
                </span>
              </p>
              <p className="mt-1 text-[11px] text-neutral-400">
                Emily Brown · first lesson
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-dashed border-neutral-300 px-4 py-3 text-[11px] text-neutral-500">
              <span className="h-2 w-2 rounded-full bg-[#2546F5]" />
              13:00 gap — offer to your pupils
            </div>
          </div>

          <p className="pb-4 text-center text-[10px] text-neutral-300">
            Smart Diary · Driive
          </p>
        </div>
      </div>
    </div>
  );
}

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
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "For driving instructors", path: "/instructors" },
          ]),
        ]}
      />

      <PageIntro
        eyebrow="For driving instructors"
        title={
          <>
            You teach.
            <br />
            Driive runs the rest.
          </>
        }
        lede="Independent ADIs and PDIs lose hours every week to texts, chasing money and shuffling the diary. Driive gives those hours back — and protects the income hiding inside them."
      >
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <WaitlistForm variant="blue" source="instructors-hero" />
          <div className="justify-self-center">
            <DiaryPhone />
          </div>
        </div>
      </PageIntro>

      {/* Day comparison */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-neutral-100 pb-10 text-sm font-medium text-neutral-600">
            {TRUST.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-[#2546F5]">
                  <Check className="h-4 w-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-12">
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

      {/* Features */}
      <section className="bg-white py-20 lg:py-28">
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

      {/* Pricing teaser */}
      <section className="bg-white pb-24 pt-4 lg:pb-32">
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

      <FaqSection background={CREAM} />

      <CtaSection source="instructors" />
    </>
  );
}
