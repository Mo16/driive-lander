import Link from "next/link";
import type { ReactNode } from "react";
import { meta } from "@/lib/meta";
import { CONTAINER, CREAM, Eyebrow, Road } from "@/components/ui";
import { PageIntro, CtaSection } from "@/components/sections";

export const metadata = meta(
  "About",
  "Driive is built in the UK for UK driving instructors. Read why we are building it, the principles behind the product, and what we will never do with your data.",
  "/about",
);

const PRINCIPLES: { title: string; body: ReactNode }[] = [
  {
    title: "Built for the car, not the desk",
    body: "Instructors run their business from the driver's seat between lessons. Every screen in Driive is designed to work one-handed on a phone first, and on a laptop second.",
  },
  {
    title: "Automation over admin",
    body: "If software can do a job — keep a balance straight, sync a calendar, offer an empty slot to your pupils — it should. Your evenings are for your family, not your inbox.",
  },
  {
    title: "Plain pricing, plain English",
    body: (
      <>
        <Link href="/pricing" className="font-medium text-[#2546F5] underline underline-offset-2">
          Free for your first ten pupils, one Pro plan after that
        </Link>
        , no jargon. If a sentence on this site would not make sense said out
        loud in a car, we rewrite it.
      </>
    ),
  },
  {
    title: "Your data is yours",
    body: (
      <>
        Pupil records, lesson history and payment data belong to your
        business. Export everything any time, and we never sell personal
        data. Full detail is in our{" "}
        <Link href="/privacy" className="font-medium text-[#2546F5] underline underline-offset-2">
          privacy policy
        </Link>
        .
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About Driive"
        title={
          <>
            Built in the UK,
            <br />
            for UK instructors.
          </>
        }
        lede="Driive exists because running a driving school from a paper diary and a wall of text messages is a full-time job on top of a full-time job."
      />

      {/* Story */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
            <div>
              <Eyebrow>Why we are building this</Eyebrow>
              <h2 className="mt-8 text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
                Great instructors,
                <br />
                buried in admin.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-neutral-600">
              <p>
                Talk to any driving instructor and the same story comes back.
                The teaching is the easy part. The hard part is everything
                around it: the 9pm reschedule texts, the pupil who cancels an
                hour before pick-up, the payments that arrive late or not at
                all, the diary that only exists in one notebook on one
                dashboard.
              </p>
              <p>
                Generic booking tools were not built for this. They do not
                understand travel time between pick-up points, block bookings,
                test dates, or the DVSA syllabus. So instructors stitch
                together four or five apps and fill the gaps with their own
                evenings.
              </p>
              <p>
                Driive is the alternative:{" "}
                <Link href="/features" className="font-medium text-[#2546F5] underline underline-offset-2">
                  one system designed end to end
                </Link>{" "}
                around how driving instruction actually works in the UK,
                priced flat, and built with the instructors on our{" "}
                <Link href="/waitlist" className="font-medium text-[#2546F5] underline underline-offset-2">
                  waitlist
                </Link>{" "}
                rather than for them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Road from="#FFFFFF" to={CREAM} />

      {/* Principles */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
        <div className={CONTAINER}>
          <Eyebrow>Principles</Eyebrow>
          <h2 className="mt-8 max-w-2xl text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
            The rules we build by.
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {PRINCIPLES.map((item) => (
              <div key={item.title} className="rounded-[2rem] bg-white p-8 shadow-[0_25px_60px_-35px_rgba(12,12,14,0.25)]">
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

      <Road from={CREAM} to="#FFFFFF" />

      {/* Straight answers */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
            <div>
              <Eyebrow>Where we are</Eyebrow>
              <h2 className="mt-8 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
                Honest about
                <br />
                the stage we are at.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-neutral-600">
              <p>
                Driive is pre-launch. We are not going to invent user counts
                or paste fake testimonials on this site — when instructors say
                good things about Driive, you will see their real names.
              </p>
              <p>
                What you can hold us to today: access opens in waves from the
                waitlist through 2026, founding instructors shape the roadmap
                directly, and everything described on this site is what we are
                building, not a mock-up of someone else's product. Driive is
                independent and not affiliated with or endorsed by the DVSA.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection source="about" />
    </>
  );
}
