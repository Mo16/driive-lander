import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import FeatureShowcase from "./feature-showcase";
import WaitlistForm from "@/components/waitlist-form";
import PricingPlans from "@/components/pricing-plans";
import { FaqSection, DEFAULT_FAQS, DEFAULT_FAQ_SCHEMA } from "@/components/sections";
import { JsonLd, faqPageJsonLd, softwareApplicationJsonLd } from "@/lib/json-ld";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE,
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_WIDTH,
} from "@/lib/site";
import {
  BLUE,
  PINK,
  CREAM,
  CONTAINER,
  Arrow,
  Check,
  LogoMark,
  Eyebrow,
  Road,
} from "@/components/ui";
import { FEATURES } from "@/data/features";

export const metadata: Metadata = {
  title: { absolute: DEFAULT_TITLE },
  description: DEFAULT_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_GB",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: SOCIAL_IMAGE,
        width: SOCIAL_IMAGE_WIDTH,
        height: SOCIAL_IMAGE_HEIGHT,
        alt: SOCIAL_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@driiveapp",
    creator: "@driiveapp",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* --------------------------------- phone ---------------------------------- */

function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-[3rem] border-[10px] border-neutral-950 bg-white shadow-[0_50px_100px_-30px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="absolute left-1/2 top-3 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-neutral-950" />
      <div className="overflow-hidden rounded-[2.35rem]">{children}</div>
    </div>
  );
}

function DarkPhone() {
  return (
    <PhoneFrame className="w-[300px] rotate-2 sm:w-[340px]">
      <div className="flex h-[520px] flex-col bg-neutral-950 pt-12 text-[13px] leading-relaxed">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 pb-3">
          <LogoMark tile={PINK} road={BLUE} className="h-6 w-6" />
          <span className="text-sm font-semibold text-white">driive</span>
          <span className="ml-auto rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-[#F9D7E2] ring-1 ring-white/15">
            Mock test
          </span>
        </div>
        <div className="flex-1 space-y-2.5 px-4 py-4">
          <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
            <span className="text-white">Emily Brown · DL25-style</span>
            <span className="text-[11px] text-white/50">38:12</span>
          </div>
          {[
            ["Junctions · observation", "2 minors"],
            ["Mirrors · change direction", "1 minor"],
            ["Reverse park · control", "1 minor"],
            ["Response to signs", "Clear"],
          ].map(([item, faults]) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
            >
              <span className="text-white/80">{item}</span>
              <span className="text-[11px] text-white/50">{faults}</span>
            </div>
          ))}
          <div className="rounded-xl bg-white px-4 py-3.5 text-neutral-900">
            <p className="flex items-center justify-between text-[13px] font-semibold">
              Result · pass standard
              <span className="rounded-full bg-[#2546F5] px-2.5 py-0.5 text-[10px] font-semibold text-white">
                4 minors
              </span>
            </p>
            <p className="mt-1 text-[11px] text-neutral-400">
              Saved to Emily&apos;s lesson debrief
            </p>
          </div>
        </div>
        <p className="pb-4 text-center text-[10px] text-white/30">
          Lesson Tools · part of Driive Pro
        </p>
      </div>
    </PhoneFrame>
  );
}

/* ---------------------------------- hero ---------------------------------- */

function Hero() {
  return (
    <section
      className="relative -mb-px overflow-hidden pb-0 pt-32 lg:pb-28 lg:pt-44"
      style={{ backgroundColor: BLUE }}
    >
      <div className={`${CONTAINER} grid items-center gap-16 lg:grid-cols-2`}>
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-[#F9D7E2] ring-1 ring-white/15">
            <LogoMark tile={PINK} road={BLUE} className="h-5 w-5" />
            Built for UK driving instructors
          </span>
          <h1 className="mt-8 text-[clamp(2.7rem,6.2vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[#F9D7E2]">
            Your whole
            <br />
            driving school.
            <br />
            One app.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#F9D7E2]/90 sm:text-xl">
            A simple driving instructor app for UK ADIs and PDIs to manage your diary, pupils, payments, lesson reminders and log progress, so you can spend less time on admin and more time teaching.
          </p>
          <div className="mt-10">
            <WaitlistForm variant="blue" source="home-hero" />
          </div>
        </div>
        {/* The image is wider than the viewport, so it's absolutely positioned —
            in flow it would stretch the grid track and throw the centring off. */}
        <div className="relative h-[min(180vw,800px)] w-full self-end lg:h-[560px]">
          <div className="absolute -inset-10 -z-0 rounded-full bg-[#F9D7E2]/20 blur-3xl lg:hidden" />
          <Image
            src="/images/phone.png"
            alt="The Driive app showing an instructor's daily diary"
            width={1254}
            height={1254}
            priority
            className="absolute left-1/2 top-0 w-[min(180vw,800px)] max-w-none -translate-x-1/2 drop-shadow-2xl lg:top-[72%] lg:w-[820px] lg:-translate-y-1/2 xl:w-[980px]"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ statement bands ---------------------------- */

function Mission() {
  return (
    <section className="relative py-24 lg:py-36" style={{ backgroundColor: PINK }}>
      {/* Below lg the wave hangs over the hero's bottom edge from here (the
          page-level <Road /> is lg-only), so the hero's arm image runs under
          it. The 2px pink backstop stops the hero's clipped blue edge from
          blending through the seam at fractional zoom/scale factors. */}
      <div aria-hidden className="absolute inset-x-0 -top-16 sm:-top-24 lg:hidden">
        <Road from="transparent" to={PINK} />
        <div className="h-2" style={{ backgroundColor: PINK }} />
      </div>
      <div className={CONTAINER}>
        <Eyebrow mark>Driive · The one app you&apos;ve been searching for</Eyebrow>
        <p className="mt-10 max-w-5xl text-[clamp(1.8rem,3.6vw,3.3rem)] font-medium leading-snug tracking-[-0.02em] text-[#2546F5]">
          One app for your diary, payments and pupil progress. Approve
          bookings in a tap, get paid without chasing, and know exactly where
          every pupil is up to.
        </p>
      </div>
    </section>
  );
}

function SpeedBand() {
  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: BLUE }}>
      <div className={CONTAINER}>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <LogoMark tile={PINK} road={BLUE} className="h-10 w-10" />
            <h2 className="mt-8 text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#F9D7E2]">
              Every pupil,
              <br />
              test-day ready.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#F9D7E2]/90">
              Mark skills off as you teach, debrief every lesson and run
              DVSA-style mock tests. Your pupil watches it all in their own
              app — so &ldquo;am I ready?&rdquo; answers itself.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/features/progress"
                className="inline-flex items-center gap-2 rounded-full bg-[#F9D7E2] px-7 py-4 text-[15px] font-medium text-[#2546F5] transition hover:bg-white"
              >
                Explore progress tracking
                <Arrow />
              </Link>
              <Link
                href="/features/lesson-tools"
                className="inline-flex items-center rounded-full bg-white/10 px-7 py-4 text-[15px] font-medium text-white ring-1 ring-white/15 transition hover:bg-white/15"
              >
                Mock tests &amp; lesson tools
              </Link>
            </div>
          </div>
          <ul className="space-y-4 text-lg font-medium text-[#F9D7E2]">
            <li className="flex items-start gap-3">
              <Check className="mt-1" />
              The full DVSA syllabus, marked as you teach
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1" />
              Every lesson ends with a debrief
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1" />
              Pupils follow along in their own app
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ feature index ------------------------------ */

function ShowcaseSection() {
  return (
    <section
      id="features"
      className="pb-24 lg:pb-32"
      style={{ backgroundColor: PINK }}
    >
      <div className={CONTAINER}>
        <FeatureShowcase />
      </div>
    </section>
  );
}

/* ------------------------------ problem solved ----------------------------- */

const miniIcon = {
  width: 15,
  height: 15,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const WalletIcon = () => (
  <svg {...miniIcon} width={18} height={18} strokeWidth={1.8}>
    <path d="M20 7H5a2 2 0 0 1-2-2 2 2 0 0 1 2-2h13v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1" />
    <path d="M16 13.5h.01" />
  </svg>
);

const LinkChainIcon = () => (
  <svg {...miniIcon}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const TickIcon = () => (
  <svg {...miniIcon}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const MoneyInIcon = () => (
  <svg {...miniIcon} width={14} height={14}>
    <path d="M17 7 7 17m0 0h7.5M7 17V9.5" />
  </svg>
);

const MoneyOutIcon = () => (
  <svg {...miniIcon} width={14} height={14}>
    <path d="m7 17 10-10m0 0H9.5M17 7v7.5" />
  </svg>
);

function ProblemSolved() {
  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: PINK }}>
      <div className={CONTAINER}>
        <Eyebrow>Problem solved</Eyebrow>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <h2 className="text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#2546F5]">
              Less chasing. <br></br> Less admin.
              <br />
              Cleaner books.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#2546F5]/90 sm:text-xl">
              Take pupil payments in-app, track lesson balances automatically, and keep your driving instructor records organised from one simple dashboard.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/features/payments"
                className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] font-medium text-white transition hover:opacity-90"
                style={{ backgroundColor: BLUE }}
              >
                Explore payments
                <Arrow />
              </Link>
              <Link
                href="/features/accounts"
                className="inline-flex items-center rounded-full bg-white px-7 py-4 text-[15px] font-medium text-[#2546F5] transition hover:bg-white/80"
              >
                Accounts &amp; Tax
              </Link>
            </div>
          </div>
          <ul className="space-y-4 text-lg font-medium text-[#2546F5]">
            <li className="flex items-start gap-3">
              <Check className="mt-1" />
              Card payments and payment links
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1" />
              Cash still welcome, We wont tell HMRC 😉
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1" />
              See who owes at a glance
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1" />
              Income, mileage and tax tracked as you teach
            </li>
          </ul>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-7 sm:p-10">
            <div className="flex items-center gap-2">
              <LogoMark tile={BLUE} road="#FFFFFF" className="h-6 w-6" />
              <span className="text-sm font-semibold">
                Ledger · every money movement
              </span>
            </div>
            <div className="mt-5 hidden items-center gap-2 lg:flex">
              <span
                className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#2546F5]"
                style={{ backgroundColor: PINK }}
              >
                2026–27 · this year
              </span>
              <span className="rounded-full border border-neutral-200 px-3.5 py-1.5 text-xs font-medium text-neutral-500">
                2025–26
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 rounded-xl border border-neutral-200 p-5">
              {[
                ["In", "£800.00", "text-[#2546F5]"],
                ["Out", "£42.50", "text-neutral-900"],
                ["Net", "£757.50", "text-[#2546F5]"],
              ].map(([label, value, tone]) => (
                <div key={label}>
                  <p className="text-xs font-medium text-neutral-400">{label}</p>
                  <p
                    className={`mt-1 text-lg font-semibold tracking-tight ${tone}`}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 hidden items-center gap-2 lg:flex">
              {["All", "Money in", "Money out"].map((filter, i) => (
                <span
                  key={filter}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${i === 0
                    ? "font-semibold text-[#2546F5]"
                    : "border border-neutral-200 text-neutral-500"
                    }`}
                  style={i === 0 ? { backgroundColor: PINK } : undefined}
                >
                  {filter}
                </span>
              ))}
            </div>
            <div className="mt-4 hidden rounded-xl border border-neutral-200 px-5 lg:block">
              {(
                [
                  ["Aisha Khan", "Lesson payment · 6 Jun", "+£80.00", "in"],
                  ["Fuel", "Expense · 5 Jun", "−£42.50", "out"],
                  ["Jack Wilson", "Block payment · 4 Jun", "+£360.00", "in"],
                  ["Maya Thompson", "Block payment · 12 May", "+£360.00", "in"],
                ] as const
              ).map(([name, detail, amount, direction]) => (
                <div
                  key={name}
                  className="flex items-center gap-3 border-t border-neutral-100 py-4 first:border-t-0"
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#2546F5] ${direction === "in" ? "bg-[#2546F5]/10" : ""
                      }`}
                    style={
                      direction === "out"
                        ? { backgroundColor: PINK }
                        : undefined
                    }
                  >
                    {direction === "in" ? <MoneyInIcon /> : <MoneyOutIcon />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{name}</p>
                    <p className="truncate text-xs text-neutral-400">
                      {detail}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-sm font-semibold ${direction === "in" ? "text-[#2546F5]" : "text-neutral-900"
                      }`}
                  >
                    {amount}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-neutral-500 lg:hidden">
              Lesson payments, expenses and blocks land here as you teach —
              tax-year totals, done for you.
            </p>
          </div>

          <div
            className="rounded-xl p-7 text-white sm:p-10"
            style={{ backgroundColor: BLUE }}
          >
            <div className="flex items-center gap-2">
              <LogoMark tile={PINK} road={BLUE} className="h-6 w-6" />
              <span className="text-sm font-semibold">
                Taking a payment
              </span>
            </div>
            <div className="mt-4 rounded-xl bg-white p-5 text-neutral-900">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[#2546F5]"
                  style={{ backgroundColor: PINK }}
                >
                  <WalletIcon />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-2xl font-semibold tracking-tight">
                    £38.00
                  </p>
                  <p className="text-xs text-neutral-400">Pay as you go · 1h</p>
                </div>
                <span
                  className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-[#2546F5]"
                  style={{ backgroundColor: PINK }}
                >
                  Unpaid
                </span>
              </div>
              <p className="mt-5 hidden text-xs font-medium text-neutral-500 lg:block">
                Amount (£)
              </p>
              <div className="mt-2 hidden rounded-xl border border-neutral-200 px-4 py-3 text-sm font-medium lg:block">
                38.00
              </div>
              <div className="mt-4 space-y-2.5">
                <span
                  className="flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-[#2546F5]"
                  style={{ backgroundColor: PINK }}
                >
                  <LinkChainIcon />
                  Send payment link
                </span>
                <span className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2546F5] px-4 py-3 text-sm font-medium text-white">
                  <TickIcon />
                  Mark as paid
                </span>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              One tap sends a card payment link. Cash in the car? Mark it
              paid on the spot — either way it lands in the ledger and the
              books stay straight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ pupil progress ------------------------------ */

function PupilProgress() {
  return (
    <section className="pb-24 lg:pb-32" style={{ backgroundColor: BLUE }}>
      <div className={CONTAINER}>
        <div className="rounded-xl bg-white p-6 sm:p-10 lg:p-14">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl bg-[#F0EEE7] p-7 sm:p-9">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#2546F5]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2546F5]" />
                DVSA progress
              </span>
              <div className="mt-6 rounded-xl bg-white p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Emily Brown · skills</p>
                  <span className="text-xs text-neutral-400">
                    61 of 137 test-ready
                  </span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-neutral-100">
                  <div className="h-full w-[45%] rounded-full bg-[#2546F5]" />
                </div>
                <div className="mt-4 space-y-2.5 text-sm">
                  {(
                    [
                      ["Roundabouts", "Test-ready"],
                      ["Bay parking", "Practised"],
                      ["Dual carriageways", "Introduced"],
                    ] as const
                  ).map(([skill, status]) => (
                    <div
                      key={skill}
                      className="flex items-center justify-between rounded-xl border border-neutral-200 px-4 py-3"
                    >
                      <span className="font-medium">{skill}</span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${status === "Test-ready"
                          ? "bg-[#2546F5] text-white"
                          : status === "Practised"
                            ? "bg-[#F9D7E2] text-[#2546F5]"
                            : "border border-neutral-200 text-neutral-500"
                          }`}
                      >
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-6 text-center text-base font-semibold">
                You&apos;ll know before they ask
              </p>
              <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-relaxed text-neutral-500">
                Every skill sits at introduced, practised or test-ready — so
                booking the test becomes a decision, not a guess.
              </p>
            </div>

            <div className="rounded-xl bg-[#F0EEE7] p-7 sm:p-9">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#2546F5]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2546F5]" />
                The pupil&apos;s side
              </span>
              <div className="mt-6 space-y-3">
                <div className="rounded-xl bg-white p-4 text-sm">
                  <p className="flex items-center justify-between font-medium text-neutral-800">
                    Next lesson · Thu 14:00
                    <span className="rounded-full bg-[#F9D7E2] px-2.5 py-0.5 text-[11px] font-semibold text-[#2546F5]">
                      Confirmed
                    </span>
                  </p>
                  <p className="mt-1 text-neutral-400">
                    2 hrs · covered by block credit
                  </p>
                </div>
                <div className="rounded-xl bg-[#2546F5] p-4 text-sm text-white">
                  <p className="font-medium">Mock test · pass standard</p>
                  <p className="mt-1 text-white/70">
                    4 minors · saved to your debrief
                  </p>
                </div>
                <div className="rounded-xl bg-white p-4 text-sm">
                  <p className="font-medium text-neutral-800">
                    Lesson debrief · Tue 10:00
                  </p>
                  <p className="mt-1 text-neutral-400">
                    Went well: gear changes · Next focus: bay parking
                  </p>
                </div>
              </div>
              <p className="mt-6 text-center text-base font-semibold">
                They get an app too
              </p>
              <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-relaxed text-neutral-500">
                Pupils request lessons, pay by card and watch their progress
                climb — and parents can follow along through a read-only link.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



/* --------------------------- website & enquiries --------------------------- */

const ENQUIRY_STAGES = ["New enquiry", "Contacted", "Enrolled"] as const;

function WebsiteEnquiries() {
  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: CREAM }}>
      <div className={CONTAINER}>
        <Eyebrow>Grow your school</Eyebrow>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <h2 className="text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-neutral-900">
              Turn local learners
              <br />
              into new pupils.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
              Get a professional driving instructor website built from your Driive profile, with your prices, areas, reviews and enquiry form already connected to your app.
            </p>
            <Link
              href="/features/website"
              className="mt-10 inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] font-medium text-white transition hover:opacity-90"
              style={{ backgroundColor: BLUE }}
            >
              Explore your website
              <Arrow />
            </Link>
          </div>
          <ul className="space-y-4 text-lg font-medium text-neutral-900">
            <li className="flex items-start gap-3">
              <Check className="mt-1 text-[#2546F5]" />
              Your own driive.app website, live in minutes
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 text-[#2546F5]" />
              Built from details already in Driive
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 text-[#2546F5]" />
              New enquiries tracked from first message to first lesson
            </li>
          </ul>
        </div>

        <div className="mt-16 overflow-hidden rounded-xl border-[6px] border-neutral-950 bg-white shadow-[0_60px_120px_-40px_rgba(0,0,0,0.35)] sm:border-[12px]">
          <div className="flex items-center gap-2 border-b border-neutral-100 px-5 py-3">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
            </span>
            <span className="ml-2 rounded-full bg-neutral-100 px-3.5 py-1.5 text-xs font-medium text-neutral-500">
              moss-driving.driive.app
            </span>
          </div>
          <div className="grid lg:grid-cols-[1.4fr_1fr]">
            <div
              className="px-7 py-10 text-white sm:px-12 sm:py-14"
              style={{ backgroundColor: BLUE }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-[#F9D7E2] ring-1 ring-white/15">
                <LogoMark tile={PINK} road={BLUE} className="h-4 w-4" />
                Moss School of Motoring
              </span>
              <p className="mt-6 text-[clamp(1.8rem,3.2vw,2.8rem)] font-semibold leading-tight tracking-[-0.02em]">
                Learn to drive
                <br />
                in Portsmouth.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Manual &amp; automatic · lessons from £35/hr · pick-up across
                PO1 – PO6
              </p>
              <span className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#2546F5]">
                Book your first lesson
              </span>
              <div className="mt-8 hidden flex-wrap gap-2 text-xs font-medium text-white/80 sm:mt-10 sm:flex">
                {["Prices & blocks", "Areas covered", "Reviews ★ 4.9"].map(
                  (label) => (
                    <span
                      key={label}
                      className="rounded-full px-3.5 py-1.5 ring-1 ring-white/25"
                    >
                      {label}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="p-7 sm:p-10">
              <p className="text-sm font-semibold">Start your enquiry</p>
              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <p className="text-xs font-medium text-neutral-500">Name</p>
                  <div className="mt-1.5 rounded-xl border border-neutral-200 px-4 py-3 font-medium">
                    Ethan Walsh
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-500">
                    Postcode
                  </p>
                  <div className="mt-1.5 rounded-xl border border-neutral-200 px-4 py-3 font-medium">
                    PO5 2AB
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#2546F5] px-4 py-2 text-xs font-semibold text-white">
                    Manual
                  </span>
                  <span className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-medium text-neutral-500">
                    Automatic
                  </span>
                </div>
                <span
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-[#2546F5]"
                  style={{ backgroundColor: PINK }}
                >
                  Send enquiry
                  <Arrow />
                </span>
              </div>
              <p className="mt-4 text-xs text-neutral-400">
                Lands in your Driive app the second they hit send
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="min-w-0 rounded-xl bg-white p-6 sm:p-10">
            <div className="flex items-center gap-2">
              <LogoMark tile={BLUE} road="#FFFFFF" className="h-6 w-6" />
              <span className="text-sm font-semibold">Enquiries</span>
              <span
                className="ml-auto rounded-full px-3 py-1 text-[11px] font-semibold text-[#2546F5]"
                style={{ backgroundColor: PINK }}
              >
                3 new
              </span>
            </div>
            <div className="mt-5 rounded-xl border border-neutral-200 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[13px] font-semibold text-[#2546F5]"
                  style={{ backgroundColor: PINK }}
                >
                  EW
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">Ethan Walsh</p>
                  <p className="mt-0.5 text-xs text-neutral-400">
                    Just turned 17 and keen to start straight away.
                  </p>
                </div>
                <span className="shrink-0 text-[11px] text-neutral-400">
                  2h ago
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                {ENQUIRY_STAGES.map((stage, i) => (
                  <span
                    key={stage}
                    className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${i === 0
                      ? "bg-[#2546F5] text-white"
                      : "border border-neutral-200 font-medium text-neutral-400"
                      }`}
                  >
                    {stage}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center">
                <div className="hidden flex-wrap items-center gap-1.5 sm:flex">
                  {["Website", "Manual", "PO5 2AB"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] font-medium text-neutral-600"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 sm:ml-auto">
                  <span
                    className="flex-1 rounded-full px-4 py-2 text-center text-[11px] font-semibold text-[#2546F5] sm:flex-none sm:py-1.5"
                    style={{ backgroundColor: PINK }}
                  >
                    Message
                  </span>
                  <span className="flex-1 rounded-full bg-[#2546F5] px-4 py-2 text-center text-[11px] font-semibold text-white sm:flex-none sm:py-1.5">
                    Call
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 hidden items-center gap-3 rounded-xl border border-neutral-100 px-5 py-3.5 sm:flex">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#2546F5]/10 text-[11px] font-semibold text-[#2546F5]">
                SA
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-neutral-600">
                  Sofia Ali
                </p>
                <p className="truncate text-xs text-neutral-400">
                  Automatic · PO4 · asked about evenings
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] font-medium text-neutral-500">
                Contacted
              </span>
            </div>
            <h3 className="mt-8 text-center text-xl font-semibold">
              Enquiries land in your pocket
            </h3>
            <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-neutral-500">
              Every enquiry arrives with name, area and gearbox already
              filled in. Call or message in a tap between lessons, and move
              them through new, contacted, enrolled.
            </p>
          </div>

          <div
            className="min-w-0 rounded-xl p-6 text-white sm:p-10"
            style={{ backgroundColor: BLUE }}
          >
            <div className="flex items-center gap-2">
              <LogoMark tile={PINK} road={BLUE} className="h-6 w-6" />
              <span className="text-sm font-semibold">One tap later</span>
            </div>
            <div className="mt-5 rounded-xl bg-white p-5 text-neutral-900">
              <p className="flex items-center justify-between text-sm font-semibold">
                Ethan Walsh
                <span className="rounded-full bg-[#2546F5] px-2.5 py-0.5 text-[11px] font-semibold text-white">
                  Enrolled
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                Pupil profile created — lessons, payments and progress ready
                to go.
              </p>
              <div
                className="mt-4 rounded-xl p-4"
                style={{ backgroundColor: PINK }}
              >
                <p className="flex items-center justify-between text-sm font-semibold text-[#2546F5]">
                  First lesson · Mon 16:00
                  <span className="rounded-full bg-[#2546F5] px-2.5 py-0.5 text-[10px] font-semibold text-white">
                    Paid
                  </span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#2546F5]/80">
                  2 hrs · manual · pick-up PO5 — requested and paid from his
                  own app.
                </p>
              </div>
            </div>
            <h3 className="mt-8 text-center text-xl font-semibold text-white">
              From enquiry to first lesson
            </h3>
            <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-white/70">
              One tap enrols them as a pupil. They get the app, request their
              first lesson and pay by card — no numbers copied between notes
              apps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- pricing --------------------------------- */

function PricingBand() {
  return (
    <section className="py-28 lg:py-40" style={{ backgroundColor: BLUE }}>
      <div className={`${CONTAINER} text-center`}>
        <h2 className="mx-auto max-w-4xl text-[clamp(2.8rem,6.5vw,6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#F9D7E2]">
          Free to start.
          <br />
          Upgrade when you’re ready.
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg text-[#F9D7E2]/90 sm:text-xl">
          For instructors ready to run their full diary from one app. Unlock unlimited pupils, advanced teaching tools, mock tests, lesson resources and your own website to bring new enquiries straight into Driive.
        </p>
        <div className="mt-12">
          <PricingPlans tone="blue" />
        </div>
      
      </div>
    </section>
  );
}

/* ---------------------------------- launch --------------------------------- */

function Launch() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className={`${CONTAINER} grid items-center gap-16 lg:grid-cols-2`}>
        <div>
          <Eyebrow>Zero-effort setup</Eyebrow>
          <h2 className="mt-8 text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-neutral-900">
            Launch in minutes.
            <br />
            No spreadsheets required.
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-600">
            Set your hours, prices and car, share your join code, and your
            pupils connect themselves — each one arriving with their own app
            for lessons, payments and progress.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/waitlist"
              className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] font-medium text-white transition hover:opacity-90"
              style={{ backgroundColor: BLUE }}
            >
              Join the waitlist
              <Arrow />
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center rounded-full bg-[#2546F5]/10 px-7 py-4 text-[15px] font-medium text-[#2546F5] transition hover:bg-[#2546F5]/15"
            >
              Learn more
            </Link>
          </div>
        </div>
        <div className="relative mx-auto lg:mx-0 lg:justify-self-end">
          <div className="absolute -bottom-8 -right-8 h-72 w-72 rounded-full bg-[#F9D7E2]" />
          <div className="relative">
            <DarkPhone />
          </div>
        </div>
      </div>

      <div
        className={`${CONTAINER} mt-28 grid gap-10 border-t border-neutral-200 pt-16 lg:grid-cols-2`}
      >
        <h3 className="text-[clamp(1.9rem,3.4vw,2.8rem)] font-semibold leading-tight tracking-[-0.02em] text-[#2546F5]">
          Live in minutes,
          <br />
          expert on day one.
        </h3>
        <p className="text-lg leading-relaxed text-neutral-600 sm:text-xl">
          Onboarding walks you through your working pattern, lesson prices,
          blocks and cancellation policy. Add pupils yourself or let them join
          with your code — no spreadsheets, nothing copied across by hand.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------- explore grid ------------------------------ */

const exploreIcons: Record<string, ReactNode> = {
  "smart-diary": (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "pupil-hub": (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  payments: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M3 11h18" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  progress: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "lesson-tools": (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <rect x="5" y="4" width="14" height="17" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M9 3.5h6M9 10h6M9 14h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  accounts: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M5 20V10M12 20V4M19 20v-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  ),
  website: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  enquiries: (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M3 13h5l2 3h4l2-3h5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M5 5h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
};

function ExploreGrid() {
  return (
    <section
      id="explore"
      className="py-24 lg:py-32"
      style={{ backgroundColor: BLUE }}
    >
      <div className={CONTAINER}>
        <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold tracking-[-0.03em] text-[#F9D7E2]">
          Explore Driive
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Link
              key={feature.slug}
              href={`/features/${feature.slug}`}
              className="group flex items-center gap-4 rounded-xl bg-white/10 p-6 ring-1 ring-white/15 transition hover:bg-white/15"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#F9D7E2] text-[#2546F5]">
                {exploreIcons[feature.slug]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-white">
                  {feature.name}
                </span>
                <span className="block truncate text-sm text-[#F9D7E2]/80">
                  {feature.tagline}
                </span>
              </span>
              <Arrow className="shrink-0 text-[#F9D7E2] transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- under hood ------------------------------- */

function UnderHood() {
  return (
    <section className="bg-[#0C0C0E] py-24 lg:py-32">
      <div className={`${CONTAINER} grid items-center gap-16 lg:grid-cols-2`}>
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-[#F9D7E2] ring-1 ring-white/15">
            <LogoMark tile={PINK} road={BLUE} className="h-5 w-5" />
            Driive · Built for scale
          </span>
          <h2 className="mt-8 text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
            Solo ADI today,
            <br />
            full school tomorrow.
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
            Driive delivers clean automations and real-time sync for
            instructors who demand precision — and scales to shared diaries
            and per-instructor reporting when you grow.
          </p>
          <Link
            href="/schools"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[15px] font-medium text-neutral-900 transition hover:bg-[#F9D7E2]"
          >
            Driive for Schools
            <Arrow />
          </Link>
        </div>

        <div className="relative">
          <div className="rounded-xl bg-[#16181D] p-6 font-mono text-[13px] leading-7 text-neutral-400 shadow-2xl ring-1 ring-white/10 sm:p-8">
            <p className="mb-4 font-sans text-sm font-semibold text-white">
              Every lesson, settled
            </p>
            <pre className="overflow-x-auto">
              <code>
                {"{"}
                {"\n"}  <span className="text-[#8FA3FF]">&quot;event&quot;</span>:{" "}
                <span className="text-[#F9A8C9]">&quot;lesson.completed&quot;</span>,
                {"\n"}  <span className="text-[#8FA3FF]">&quot;pupil&quot;</span>:{" "}
                <span className="text-[#F9A8C9]">&quot;Emily Brown&quot;</span>,
                {"\n"}  <span className="text-[#8FA3FF]">&quot;slot&quot;</span>:{" "}
                <span className="text-[#F9A8C9]">
                  &quot;2026-06-16T10:00:00+01:00&quot;
                </span>
                ,{"\n"}  <span className="text-[#8FA3FF]">&quot;duration_mins&quot;</span>
                : <span className="text-emerald-400">120</span>,
                {"\n"}  <span className="text-[#8FA3FF]">&quot;credit&quot;</span>:{" "}
                <span className="text-[#F9A8C9]">&quot;block · 2 hrs burned&quot;</span>,
                {"\n"}  <span className="text-[#8FA3FF]">&quot;ledger&quot;</span>:{" "}
                <span className="text-[#F9A8C9]">&quot;income recorded&quot;</span>,
                {"\n"}  <span className="text-[#8FA3FF]">&quot;payout&quot;</span>:{" "}
                <span className="text-[#F9A8C9]">&quot;scheduled · next day&quot;</span>
                {"\n"}
                {"}"}
              </code>
            </pre>
          </div>
          <div className="absolute -bottom-6 right-6 hidden items-center gap-2 rounded-xl bg-white px-5 py-4 text-sm font-medium text-neutral-900 shadow-xl sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Lesson completed · payout scheduled
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- final cta ------------------------------- */

function FinalCta() {
  return (
    <section id="waitlist" className="bg-white py-28 lg:py-40">
      <div className={CONTAINER}>
        <h2 className="max-w-4xl text-[clamp(2.8rem,6.5vw,6rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-[#2546F5]">
          You&apos;ve seen how it works.
          <br />
          Now put it to work.
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
          Access opens in waves through 2026, in waitlist order. Join now
          and you&apos;re in first.
        </p>
        <div className="mt-10">
          <WaitlistForm variant="light" source="home-final" />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- page ---------------------------------- */

export default function Page() {
  return (
    <main className="overflow-x-clip">
      <JsonLd
        data={[
          softwareApplicationJsonLd(),
          faqPageJsonLd(DEFAULT_FAQ_SCHEMA),
        ]}
      />
      <Hero />
      <div className="hidden lg:block">
        <Road from={BLUE} to={PINK} />
      </div>
      <Mission />
      <ShowcaseSection />
      <ProblemSolved />
      <SpeedBand />
      <PupilProgress />

      <Road from={BLUE} to={CREAM} />
      <WebsiteEnquiries />
      <Road from={CREAM} to={BLUE} />
      <PricingBand />



      <FaqSection faqs={DEFAULT_FAQS} />
      <FinalCta />
    </main>
  );
}
