import Link from "next/link";
import type { ReactNode } from "react";
import { meta } from "@/lib/meta";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { CONTAINER, CREAM, PINK, Eyebrow, Road, Check } from "@/components/ui";
import {
  PageIntro,
  CtaSection,
  FeatureLinkGrid,
  FaqSection,
} from "@/components/sections";

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
      />

      {/* Day comparison */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <Eyebrow>A normal day, fixed</Eyebrow>
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

      <FaqSection background={CREAM} />

      <CtaSection source="instructors" />
    </>
  );
}
