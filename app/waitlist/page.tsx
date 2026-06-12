import Link from "next/link";
import { meta } from "@/lib/meta";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { CONTAINER, CREAM, Eyebrow, Road } from "@/components/ui";
import { PageIntro, FaqSection, DEFAULT_FAQS } from "@/components/sections";
import WaitlistForm from "@/components/waitlist-form";

const DESCRIPTION =
  "Join the Driive waitlist for early access and launch updates for UK driving instructor software.";

export const metadata = meta(
  "Join the waitlist",
  DESCRIPTION,
  "/waitlist",
);

const STEPS = [
  {
    step: "01",
    title: "You join with one email",
    body: "No card, no forms, no calls. Your place in the queue is confirmed straight away.",
  },
  {
    step: "02",
    title: "We open access in waves",
    body: "Through 2026, instructors are invited in waitlist order. You will get an email when your wave opens.",
  },
  {
    step: "03",
    title: "You start with your real diary",
    body: "Set your hours, prices and car, add pupils or share your join code — with hands-on help from us, day one looks like your actual week, not an empty app.",
  },
];

export default function WaitlistPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/waitlist",
            name: "Join the Driive waitlist",
            description: DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Waitlist", path: "/waitlist" },
          ]),
        ]}
      />

      <PageIntro
        eyebrow="Waitlist"
        title={
          <>
            Get in before
            <br />
            the doors open.
          </>
        }
        lede="Access opens in waves. Join the waitlist to get in first and shape what gets built next."
        waveTo={CREAM}
      />

      {/* Form */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
        <div className={CONTAINER}>
          <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-[0_35px_80px_-40px_rgba(12,12,14,0.3)] sm:p-12">
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-neutral-900">
              Join the waitlist
            </h2>
            <p className="mt-3 text-base leading-relaxed text-neutral-500">
              One email address. We use it for launch updates only — no
              spam, unsubscribe any time. Plans and prices are detailed on
              the{" "}
              <Link href="/pricing" className="font-medium text-[#2546F5] underline underline-offset-2">
                pricing page
              </Link>
              .
            </p>
            <div className="mt-8">
              <WaitlistForm variant="light" source="waitlist-page" />
            </div>
          </div>
        </div>
      </section>

      <Road from={CREAM} to="#FFFFFF" />

      {/* What happens next */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <Eyebrow>What happens next</Eyebrow>
          <h2 className="mt-8 max-w-2xl text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
            Three steps between
            <br />
            you and launch day.
          </h2>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-xl p-8"
                style={{ backgroundColor: CREAM }}
              >
                <p className="text-sm font-semibold text-[#2546F5]">
                  {item.step}
                </p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-neutral-900">
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

      <FaqSection faqs={DEFAULT_FAQS.slice(0, 5)} background={CREAM} />
    </>
  );
}
