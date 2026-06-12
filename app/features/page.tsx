import Link from "next/link";
import { meta } from "@/lib/meta";
import { CONTAINER, CREAM, Eyebrow, Road } from "@/components/ui";
import {
  PageIntro,
  CtaSection,
  FeatureLinkGrid,
  FaqSection,
} from "@/components/sections";

export const metadata = meta(
  "Features",
  "Everything a UK driving instructor needs in one place: smart diary, pupil hub, payments, DVSA progress tracking, mock tests, accounts, your own website and enquiries.",
  "/features",
);

export default function FeaturesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Features"
        title={
          <>
            One app.
            <br />
            Your whole business.
          </>
        }
        lede="Diary, pupils, payments, progress, lesson tools, accounts, your website and enquiries — built to work together, so nothing falls through the cracks between five different apps."
        waveTo={CREAM}
      />

      <section className="py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
        <div className={CONTAINER}>
          <FeatureLinkGrid />
        </div>
      </section>

      <Road from={CREAM} to="#FFFFFF" />

      <section className="bg-white py-24 lg:py-32">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <Eyebrow>Why it matters</Eyebrow>
              <h2 className="mt-8 text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
                Built as one system,
                <br />
                not six subscriptions.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-neutral-600">
              <p>
                Most instructors run their business across a paper diary, a
                banking app, a wall of text messages and a spreadsheet that has
                not been opened since March. Every gap between those tools is
                a place where money leaks: the no-show nobody chased, the
                lesson that never got rebooked, the pupil who quietly drifted
                to another instructor.
              </p>
              <p>
                Driive closes the gaps. A booking request lands in a real gap
                in your diary. A completed lesson burns the block hour, writes
                the ledger row and schedules your payout. Progress builds into
                the record that says &ldquo;book the test&rdquo;. Everything
                you see on this page is one product and one login —{" "}
                <Link href="/pricing" className="font-medium text-[#2546F5] underline underline-offset-2">
                  free for your first ten pupils
                </Link>{" "}
                — designed end to end for how driving instruction actually
                works in the UK.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection background={CREAM} />

      <CtaSection source="features-index" />
    </>
  );
}
