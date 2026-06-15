import Link from "next/link";
import type { ReactNode } from "react";
import { meta } from "@/lib/meta";
import {
  JsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
  faqPageJsonLd,
} from "@/lib/json-ld";
import {
  CONTAINER,
  CREAM,
  PINK,
  Eyebrow,
  Road,
  Check,
} from "@/components/ui";
import {
  PageIntro,
  CtaSection,
  FaqSection,
  type Faq,
} from "@/components/sections";
import WaitlistForm from "@/components/waitlist-form";

const DESCRIPTION =
  "The Driive pupil app is the free learner-driver side of Driive: request lessons, pay by card, track prepaid blocks and follow your DVSA progress. Instructors bring pupils on board — no waitlist for learners.";

export const metadata = meta(
  "For learner drivers",
  DESCRIPTION,
  "/learners",
);

/* ---------------------------------------------------------------------------
   ICP note: this page is read by INSTRUCTORS deciding whether Driive's pupil
   side is good enough to put in front of their learners. So every section
   shows the learner experience, then ties it back to why it wins for the
   instructor (pupils self-serve, pay on time, and stay). The only signup is
   the instructor waitlist — pupils join free via their instructor's code.
--------------------------------------------------------------------------- */

/* Why it matters to the instructor — the real audience. */
const FOR_INSTRUCTORS: { title: string; body: string }[] = [
  {
    title: "Pupils book themselves",
    body: "Learners request the gaps you choose to offer and you approve with one tap. No more evening text threads to fill Thursday afternoon.",
  },
  {
    title: "Pupils pay on time",
    body: "Card payments and prepaid blocks live in the pupil's app. The awkward 'have you got cash?' conversation disappears, and your money lands.",
  },
  {
    title: "Pupils stay the course",
    body: "When a learner can see their DVSA progress build lesson by lesson, they understand why they're not test-ready yet — and keep booking with you.",
  },
];

/* What the learner actually gets — the pupil experience, with deep links. */
const FOR_LEARNERS: { key: string; text: ReactNode }[] = [
  {
    key: "request",
    text: (
      <>
        Request lessons from the times their instructor offers in the{" "}
        <Link
          href="/features/smart-diary"
          className="font-medium text-[#2546F5] underline underline-offset-2"
        >
          smart diary
        </Link>{" "}
        — every request is approved by the instructor before it&apos;s booked.
      </>
    ),
  },
  {
    key: "pay",
    text: (
      <>
        Pay by card in the app, or draw down a prepaid block tracked to the
        penny in{" "}
        <Link
          href="/features/payments"
          className="font-medium text-[#2546F5] underline underline-offset-2"
        >
          Payments
        </Link>{" "}
        — block hours burn on lesson completion, never on booking.
      </>
    ),
  },
  {
    key: "progress",
    text: (
      <>
        Watch their{" "}
        <Link
          href="/features/progress"
          className="font-medium text-[#2546F5] underline underline-offset-2"
        >
          DVSA &lsquo;Ready to Pass?&rsquo; progress
        </Link>{" "}
        build skill by skill, with the lesson debrief their instructor left
        after each drive.
      </>
    ),
  },
  {
    key: "calendar",
    text: "Lessons land in their own phone calendar — Google, Apple or Outlook — and move automatically when a lesson is rescheduled.",
  },
  {
    key: "parents",
    text: "Parents and guardians can follow along through a private, read-only web link — no app for them to download.",
  },
  {
    key: "free",
    text: "Free on iPhone and Android. Pupils never pay for Driive — only their lessons.",
  },
];

/* Learner-focused FAQ — distinct from the instructor FAQ. */
const LEARNER_FAQS: Faq[] = [
  {
    q: "How do I get the Driive pupil app?",
    schemaAnswer:
      "Learner drivers join Driive through their driving instructor. The instructor shares a join code, the pupil enters it in the free Driive app on iPhone or Android, and the instructor approves the request. There is no separate waitlist for pupils.",
    a: (
      <>
        Through your driving instructor. They share a join code, you enter it in
        the free Driive app, and they approve you — that&apos;s it. There&apos;s
        no separate waitlist for pupils. If your instructor isn&apos;t on Driive
        yet, point them at the{" "}
        <Link
          href="/instructors"
          className="font-medium text-[#2546F5] underline underline-offset-2"
        >
          instructor page
        </Link>
        .
      </>
    ),
  },
  {
    q: "Does the pupil app cost anything?",
    schemaAnswer:
      "No. The Driive pupil app is free for learner drivers on iPhone and Android. Pupils only pay for their driving lessons, charged by their instructor — never for the app itself.",
    a: "No. The pupil app is free on iPhone and Android. You only ever pay for your driving lessons, charged by your instructor — never for the app.",
  },
  {
    q: "Can I book lessons whenever I want?",
    schemaAnswer:
      "Pupils request lessons from the times their instructor chooses to make available. The instructor approves or declines each request before it is added to the diary, so they stay in control of their schedule.",
    a: "You can request any of the times your instructor makes available, and they approve each one before it's booked. So you choose from real free slots, and your instructor stays in control of their diary.",
  },
  {
    q: "Can my parents see how I'm getting on?",
    schemaAnswer:
      "Yes. A pupil can invite a parent or guardian to follow their lessons and DVSA progress through a private, read-only web link. The parent does not need to download an app and cannot change any bookings.",
    a: (
      <>
        Yes. You can invite a parent or guardian to follow your lessons and
        progress through a private, read-only web link — they don&apos;t need to
        download anything, and they can&apos;t change your bookings. It&apos;s
        part of how Driive keeps{" "}
        <Link
          href="/features/progress"
          className="font-medium text-[#2546F5] underline underline-offset-2"
        >
          progress
        </Link>{" "}
        visible to everyone supporting you.
      </>
    ),
  },
];

/* --------------------------------- icons ---------------------------------
   Hand-drawn inline SVGs only (per CLAUDE.md — no icon libraries). */

const iconStroke = {
  fill: "none",
  stroke: "currentColor" as const,
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const MessageIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...iconStroke}>
    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9.6 9.6 0 0 1-4-.8L3 21l1.8-5.5a8.38 8.38 0 0 1-.8-4A8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />
  </svg>
);
const PhoneIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...iconStroke}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);
const CalPlusIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...iconStroke}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4" />
  </svg>
);

/* ----------------------------- product visual -----------------------------
   The in-app pupil profile, rebuilt in CSS/SVG (no screenshots, per CLAUDE.md)
   — mirrors the team's ProfileMock in the Pupil Hub feature page. Hero with
   quick actions, the five tabs, the live progress bar and the Overview
   snapshot tiles: the whole learner in one card.
--------------------------------------------------------------------------- */

const PROFILE_TABS = ["Overview", "Lessons", "Progress", "Payments", "Detail"];

const SNAPSHOT = [
  { label: "Upcoming", value: "8h", note: "booked" },
  { label: "Credit", value: "6h", note: "block left" },
  { label: "Delivered", value: "21h", note: "14 lessons" },
  { label: "Outstanding", value: "£0", note: "owed", good: true },
] as const;

function PupilProfileCard() {
  return (
    <div className="w-full max-w-[420px] rounded-xl bg-white p-4 shadow-[0_50px_100px_-35px_rgba(0,0,0,0.5)] sm:p-6">
      {/* hero */}
      <div className="flex items-center gap-3.5">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#F9D7E2] text-lg font-semibold text-[#2546F5]">
          PS
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-semibold tracking-tight text-neutral-900">
              Priya Shah
            </p>
            <span className="rounded-full bg-[#2546F5]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#2546F5]">
              Active
            </span>
          </div>
          <p className="mt-0.5 text-sm text-neutral-500">Manual · £34/hr</p>
        </div>
      </div>

      {/* quick actions */}
      <div className="mt-5 grid grid-cols-3 gap-2 text-[13px] font-medium">
        <span className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-3 py-2.5 text-neutral-700">
          <MessageIcon />
          Message
        </span>
        <span className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-3 py-2.5 text-neutral-700">
          <PhoneIcon />
          Call
        </span>
        <span className="flex items-center justify-center gap-2 rounded-full bg-[#2546F5] px-3 py-2.5 text-white">
          <CalPlusIcon />
          Book
        </span>
      </div>

      {/* tabs */}
      <div className="mt-5 flex items-center gap-1 overflow-hidden rounded-full bg-[#F0EEE7] p-1">
        {PROFILE_TABS.map((tab) => (
          <span
            key={tab}
            className={`flex-1 rounded-full py-1.5 text-center text-[11px] font-medium ${
              tab === "Overview"
                ? "bg-white font-semibold text-[#2546F5] shadow-sm"
                : "text-neutral-500"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* overall progress */}
      <div className="mt-5 rounded-xl bg-[#2546F5] p-5 text-white">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-white/70">Overall progress</p>
            <p className="text-3xl font-semibold tracking-tight">72%</p>
          </div>
          <p className="text-xs font-medium text-[#F9D7E2]">
            131/182 confident · 12 started
          </p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-[#F9D7E2]" style={{ width: "72%" }} />
        </div>
      </div>

      {/* overview snapshot tiles */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        {SNAPSHOT.map((tile) => (
          <div key={tile.label} className="rounded-xl bg-neutral-50 p-3.5">
            <p className="text-[11px] font-medium text-neutral-400">{tile.label}</p>
            <p
              className={`mt-1 text-xl font-semibold tracking-tight ${
                "good" in tile && tile.good ? "text-[#16A34A]" : "text-neutral-900"
              }`}
            >
              {tile.value}
            </p>
            <p className="text-[11px] text-neutral-400">{tile.note}</p>
          </div>
        ))}
      </div>

      {/* next lesson */}
      <div className="mt-3 flex items-center justify-between rounded-xl border border-neutral-200 p-4">
        <div>
          <p className="text-[11px] font-medium text-neutral-400">Next lesson</p>
          <p className="mt-1 text-sm font-semibold text-neutral-900">
            Tue 16 Jun · 14:00
          </p>
          <p className="mt-0.5 text-xs text-neutral-500">2h · pick-up PO5 2AB</p>
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-[#2546F5]"
          style={{ backgroundColor: PINK }}
        >
          Practical · in 12d
        </span>
      </div>
    </div>
  );
}

export default function LearnersPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/learners",
            name: "Driive for learner drivers",
            description: DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "For learner drivers", path: "/learners" },
          ]),
          faqPageJsonLd(
            LEARNER_FAQS.map((faq) => ({
              question: faq.q,
              answer: faq.schemaAnswer,
            })),
          ),
        ]}
      />

      <PageIntro
        eyebrow="For learner drivers"
        title={
          <>
            The other half
            <br />
            of every lesson.
          </>
        }
        lede="Every Driive instructor brings their pupils a free app of their own — to book, pay and watch their driving progress build. It's the side of Driive your learners hold, and the reason they stick with you."
      >
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div>
            <p className="max-w-md text-base leading-relaxed text-[#F9D7E2]/85">
              Pupils don&apos;t sign up here — their instructor brings them in.
              Bring it to yours by joining the instructor waitlist.
            </p>
            <div className="mt-6">
              <WaitlistForm variant="blue" source="learners-hero" />
            </div>
          </div>
          <div className="justify-self-center">
            <PupilProfileCard />
          </div>
        </div>
      </PageIntro>

      {/* Why it wins for the instructor — the real audience */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <Eyebrow>Why it matters to you</Eyebrow>
          <h2 className="mt-8 max-w-3xl text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
            A pupil app that
            <br />
            does your admin for you.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
            The better your pupils&apos; side of Driive, the less work lands on
            yours. Give learners a place to book, pay and track progress, and
            the chasing stops looking after itself.
          </p>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FOR_INSTRUCTORS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-8"
                style={{ backgroundColor: CREAM }}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#2546F5] text-white">
                  <Check className="h-4 w-4" />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-neutral-900">
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

      <Road from="#FFFFFF" to={PINK} />

      {/* What the learner actually gets */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: PINK }}>
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <Eyebrow>What your pupils get</Eyebrow>
              <h2 className="mt-8 text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
                Everything they need,
                <br />
                in one free app.
              </h2>
            </div>
            <ul className="space-y-5">
              {FOR_LEARNERS.map((item) => (
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

      {/* How pupils join — clarify the model for instructors */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <Eyebrow>How pupils join</Eyebrow>
          <h2 className="mt-8 max-w-3xl text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
            No waitlist for them.
            <br />
            You bring them in.
          </h2>
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {(
              [
                {
                  step: "1",
                  title: "Share your join code",
                  body: "Send your code, or add a pupil yourself in seconds. Bring your whole existing book across in minutes.",
                },
                {
                  step: "2",
                  title: "They connect, free",
                  body: "Your pupil downloads the free app, enters the code, and requests to join from their own phone.",
                },
                {
                  step: "3",
                  title: "You approve",
                  body: "Approve the request and they're in — with their lessons, balance and progress from day one.",
                },
              ] as const
            ).map((item) => (
              <div
                key={item.step}
                className="rounded-xl p-8"
                style={{ backgroundColor: CREAM }}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#2546F5] text-base font-semibold text-white">
                  {item.step}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-base leading-relaxed text-neutral-600">
            Pupils never pay for Driive and never wait for access — that&apos;s
            all on your side. Get yours by joining the{" "}
            <Link
              href="/waitlist"
              className="font-medium text-[#2546F5] underline underline-offset-2"
            >
              instructor waitlist
            </Link>
            , then read how the{" "}
            <Link
              href="/instructors"
              className="font-medium text-[#2546F5] underline underline-offset-2"
            >
              instructor side
            </Link>{" "}
            fits together.
          </p>
        </div>
      </section>

      <FaqSection faqs={LEARNER_FAQS} background={CREAM} />

      <CtaSection source="learners" />
    </>
  );
}
