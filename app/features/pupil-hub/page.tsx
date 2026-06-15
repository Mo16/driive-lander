import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { featureFaqSchema, getFeature } from "@/data/features";
import { meta } from "@/lib/meta";
import {
  JsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from "@/lib/json-ld";
import {
  BLUE,
  PINK,
  CREAM,
  CONTAINER,
  Arrow,
  Check,
  Eyebrow,
  Road,
  RichText,
} from "@/components/ui";
import { PageIntro, CtaSection, FaqSection, type Faq } from "@/components/sections";

const maybeFeature = getFeature("pupil-hub");
if (!maybeFeature) throw new Error("pupil-hub missing from data/features.ts");
const feature = maybeFeature;
const PATH = "/features/pupil-hub";

export const metadata = meta(feature.metaTitle, feature.metaDescription, PATH);

/* --------------------------------- icons ---------------------------------
   Hand-drawn inline SVGs only (per CLAUDE.md — no icon libraries). */

type IconProps = { className?: string };
const stroke = {
  fill: "none",
  stroke: "currentColor" as const,
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Phone = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);
const Message = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9.6 9.6 0 0 1-4-.8L3 21l1.8-5.5a8.38 8.38 0 0 1-.8-4A8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />
  </svg>
);
const CalPlus = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4" />
  </svg>
);
const Search = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const Pin = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const Lock = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <rect x="4" y="11" width="16" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

/* --------------------------------------------------------------------------
   1 · PROFILE MOCK — a CSS rebuild of the in-app pupil profile: hero with
   quick actions, the five tabs, the Overview snapshot tiles and the live
   progress bar. No screenshots, per CLAUDE.md.
-------------------------------------------------------------------------- */

const PROFILE_TABS = ["Overview", "Lessons", "Progress", "Payments", "Details"];

const SNAPSHOT = [
  { label: "Upcoming", value: "8h", note: "booked" },
  { label: "Credit", value: "12h", note: "block left" },
  { label: "Delivered", value: "21h", note: "taught" },
  { label: "Outstanding", value: "£0", note: "owed", good: true },
] as const;

function ProfileMock() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_40px_90px_-45px_rgba(12,12,14,0.3)] sm:p-7">
      {/* hero */}
      <div className="flex flex-wrap items-center gap-4">
        <Image
          src="https://randomuser.me/api/portraits/women/65.jpg"
          alt="Maya Thompson"
          width={56}
          height={56}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-semibold tracking-tight text-neutral-900">
              Maya Thompson
            </p>
            <span className="rounded-full bg-[#2546F5]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#2546F5]">
              Active
            </span>
            <span className="rounded-full bg-[#22C55E]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#16A34A]">
              On app
            </span>
          </div>
          <p className="mt-0.5 text-sm text-neutral-500">Manual · £32/hr</p>
        </div>
      </div>

      {/* quick actions */}
      <div className="mt-5 grid grid-cols-3 gap-2 text-[13px] font-medium">
        <span className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-3 py-2.5 text-neutral-700">
          <Message />
          Message
        </span>
        <span className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-3 py-2.5 text-neutral-700">
          <Phone />
          Call
        </span>
        <span className="flex items-center justify-center gap-2 rounded-full bg-[#2546F5] px-3 py-2.5 text-white">
          <CalPlus />
          Book
        </span>
      </div>

      {/* tabs */}
      <div className="mt-6 flex items-center gap-1 overflow-hidden rounded-full bg-[#F0EEE7] p-1">
        {PROFILE_TABS.map((tab) => (
          <span
            key={tab}
            className={`flex-1 rounded-full py-1.5 text-center text-[11px] font-medium sm:text-xs ${
              tab === "Overview"
                ? "bg-white font-semibold text-[#2546F5] shadow-sm"
                : "text-neutral-500"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* overview: snapshot tiles */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
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

      {/* progress card */}
      <div className="mt-3 rounded-xl bg-[#2546F5] p-5 text-white">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-white/70">Overall progress</p>
            <p className="text-3xl font-semibold tracking-tight">68%</p>
          </div>
          <p className="text-xs font-medium text-[#F9D7E2]">23/34 confident · 6 started</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-[#F9D7E2]" style={{ width: "68%" }} />
        </div>
      </div>

      {/* next lesson + tests */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 p-4">
          <p className="text-[11px] font-medium text-neutral-400">Next lesson</p>
          <p className="mt-1 text-sm font-semibold text-neutral-900">
            Tue 16 Jun · 14:00
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-neutral-500">
            <Pin className="h-3.5 w-3.5" /> 2h · pick-up PO5 2AB
          </p>
        </div>
        <div className="rounded-xl border border-neutral-200 p-4">
          <p className="text-[11px] font-medium text-neutral-400">Tests</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#22C55E]/10 px-2.5 py-1 text-[11px] font-semibold text-[#16A34A]">
              Theory · Passed
            </span>
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-[#2546F5]"
              style={{ backgroundColor: PINK }}
            >
              Practical · in 12d
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const GLANCE_TILES = [
  {
    title: "Everything in one tap",
    body: "Open a pupil and their lessons, credit, notes and test dates are all right there — no scrolling back through a text thread to find anything.",
  },
  {
    title: "Numbers that keep themselves",
    body: "Credit to the penny, hours delivered, what's still owed — every figure is derived live from real lessons and payments, never typed in by hand.",
  },
  {
    title: "Five tabs, one pupil",
    body: "Overview, Lessons, Progress, Payments and Details — the whole relationship behind one name, the same place every time.",
  },
];

/* --------------------------------------------------------------------------
   2 · DETAILS PANEL — the Details tab rebuilt: contact, pick-up, transmission,
   tests and the private note, for the "why instructors switch" split.
-------------------------------------------------------------------------- */

const DETAIL_ROWS = [
  { label: "Phone", value: "07700 900 812" },
  { label: "Email", value: "maya.t@email.com" },
  { label: "Default pick-up", value: "12 Elm Road, PO5 2AB" },
  { label: "Transmission", value: "Manual" },
  { label: "Lesson rate", value: "£32/hr · 2h default" },
];

function DetailsPanel() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_40px_90px_-45px_rgba(12,12,14,0.3)] sm:p-7">
      {/* hero */}
      <div className="flex items-center gap-3.5">
        <Image
          src="https://randomuser.me/api/portraits/women/65.jpg"
          alt="Maya Thompson"
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-semibold tracking-tight text-neutral-900">
              Maya Thompson
            </p>
            <span className="rounded-full bg-[#2546F5]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#2546F5]">
              Active
            </span>
          </div>
          <p className="mt-0.5 text-sm text-neutral-500">Manual · £32/hr</p>
        </div>
      </div>

      {/* quick actions */}
      <div className="mt-5 grid grid-cols-3 gap-2 text-[13px] font-medium">
        <span className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-3 py-2.5 text-neutral-700">
          <Message />
          Message
        </span>
        <span className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-3 py-2.5 text-neutral-700">
          <Phone />
          Call
        </span>
        <span className="flex items-center justify-center gap-2 rounded-full bg-[#2546F5] px-3 py-2.5 text-white">
          <CalPlus />
          Book
        </span>
      </div>

      {/* tabs — Details active */}
      <div className="mt-6 flex items-center gap-1 overflow-hidden rounded-full bg-[#F0EEE7] p-1">
        {PROFILE_TABS.map((tab) => (
          <span
            key={tab}
            className={`flex-1 rounded-full py-1.5 text-center text-[11px] font-medium sm:text-xs ${
              tab === "Details"
                ? "bg-white font-semibold text-[#2546F5] shadow-sm"
                : "text-neutral-500"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* details rows */}
      <dl className="mt-5 divide-y divide-neutral-100">
        {DETAIL_ROWS.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 py-3">
            <dt className="text-sm text-neutral-400">{row.label}</dt>
            <dd className="text-sm font-medium text-neutral-900">{row.value}</dd>
          </div>
        ))}
      </dl>

      {/* private note */}
      <div className="mt-2 rounded-xl bg-[#F0EEE7] p-4">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
          <Lock className="h-3.5 w-3.5" /> Private note · only you
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          &ldquo;Nervous on roundabouts — keep building those up. Mum is paying,
          test booked for the 28th.&rdquo;
        </p>
      </div>

      {/* app access */}
      <div className="mt-3 flex items-center justify-between rounded-xl border border-neutral-200 p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#2546F5]/10 text-[#2546F5]">
            <Phone />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-900">App access</p>
            <p className="text-xs text-neutral-400">Lessons &amp; progress on their phone</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-[#22C55E]/10 px-2.5 py-1 text-[11px] font-semibold text-[#16A34A]">
          On app
        </span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   3 · PUPIL LIST — the roster screen: search, filter pills, the "Follow up
   today" card and a few pupil rows with live mini-stats.
-------------------------------------------------------------------------- */

const FILTER_PILLS = ["All", "Active", "New", "Test soon", "Unpaid", "Paused"];

const FOLLOW_UP = [
  { value: "2", label: "Unpaid balance", hint: "Collect" },
  { value: "1", label: "Test ≤7 days", hint: "Confirm slot" },
  { value: "3", label: "No lesson booked", hint: "Nudge" },
];

type Row = {
  photo: string;
  name: string;
  when: string;
  status: string;
  statusTone: "active" | "new";
  dot: string;
  stats: string;
  badge?: { label: string; tone: "due" | "test" };
};

const PUPIL_ROWS: Row[] = [
  {
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Jack Wilson",
    when: "Today · 14:00 · 2h · Manual",
    status: "Active",
    statusTone: "active",
    dot: "bg-[#16A34A]",
    stats: "12 done · 6 booked · 9h credit",
  },
  {
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Emily Brown",
    when: "No lesson booked",
    status: "Active",
    statusTone: "active",
    dot: "bg-[#16A34A]",
    stats: "8 done · pay-as-you-go",
    badge: { label: "£45 due", tone: "due" },
  },
  {
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
    name: "Tom Reid",
    when: "Fri · 09:00 · 2h · Automatic",
    status: "New",
    statusTone: "new",
    dot: "bg-[#C99A2E]",
    stats: "2 done · 4 booked",
    badge: { label: "Test in 5d", tone: "test" },
  },
];

function ListMock() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_40px_90px_-45px_rgba(12,12,14,0.3)] sm:p-6">
      {/* search */}
      <div className="flex items-center gap-2.5 rounded-full bg-neutral-50 px-4 py-2.5 text-sm text-neutral-400">
        <Search />
        Search pupils by name or phone
      </div>

      {/* filter pills */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {FILTER_PILLS.map((pill, i) => (
          <span
            key={pill}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${
              i === 0
                ? "bg-[#2546F5] text-white"
                : "bg-neutral-50 text-neutral-500"
            }`}
          >
            {pill}
          </span>
        ))}
      </div>

      {/* follow-up card */}
      <div className="mt-4 rounded-xl p-4" style={{ backgroundColor: PINK }}>
        <p className="text-sm font-semibold text-[#2546F5]">Follow up today</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {FOLLOW_UP.map((tile) => (
            <div key={tile.label} className="rounded-xl bg-white p-3 text-center">
              <p className="text-xl font-semibold tracking-tight text-[#2546F5]">
                {tile.value}
              </p>
              <p className="mt-0.5 text-[10px] font-medium leading-tight text-neutral-500">
                {tile.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* rows */}
      <div className="mt-4 space-y-2.5">
        {PUPIL_ROWS.map((row) => (
          <div
            key={row.name}
            className="flex items-center gap-3 rounded-xl border border-neutral-100 p-3"
          >
            <span className="relative shrink-0">
              <Image
                src={row.photo}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
              <span
                className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${row.dot}`}
              />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-neutral-900">
                  {row.name}
                </p>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    row.statusTone === "new"
                      ? "bg-[#C99A2E]/15 text-[#C99A2E]"
                      : "bg-[#2546F5]/10 text-[#2546F5]"
                  }`}
                >
                  {row.status}
                </span>
              </div>
              <p className="truncate text-xs font-medium text-neutral-600">{row.when}</p>
              <p className="truncate text-[11px] text-neutral-400">{row.stats}</p>
            </div>
            {row.badge && (
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  row.badge.tone === "due"
                    ? "bg-rose-500 text-white"
                    : "bg-[#2546F5]/10 text-[#2546F5]"
                }`}
              >
                {row.badge.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   4 · GUARDIAN PORTAL — the read-only parent view delivered by magic link.
-------------------------------------------------------------------------- */

const PORTAL_ROWS = [
  { label: "Lesson · Tue 16 Jun", value: "Completed", tone: "done" as const },
  { label: "Block · 10h purchased", value: "£320 paid", tone: "paid" as const },
  { label: "Progress", value: "68%", tone: "prog" as const },
];

function GuardianPortal() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_40px_90px_-45px_rgba(12,12,14,0.3)]">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
        <span className="ml-2 flex flex-1 items-center gap-1.5 truncate rounded-full bg-neutral-50 px-3 py-1 text-[11px] text-neutral-400">
          <Lock className="h-3 w-3" /> driive.app/p/maya · read-only
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-neutral-400">Maya&apos;s lessons</p>
            <p className="text-lg font-semibold tracking-tight text-neutral-900">
              Hi, you&apos;re following Maya
            </p>
          </div>
          <span className="rounded-full bg-[#2546F5]/10 px-2.5 py-1 text-[11px] font-semibold text-[#2546F5]">
            Guardian
          </span>
        </div>

        <div className="mt-5 space-y-2.5">
          {PORTAL_ROWS.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-3 rounded-xl bg-neutral-50 px-4 py-3"
            >
              <p className="truncate text-sm font-medium text-neutral-700">{row.label}</p>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  row.tone === "paid"
                    ? "bg-[#22C55E]/10 text-[#16A34A]"
                    : row.tone === "prog"
                    ? "bg-[#2546F5]/10 text-[#2546F5]"
                    : "bg-neutral-900 text-white"
                }`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-xs leading-relaxed text-neutral-400">
          No app to download · they can unsubscribe any time
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   5 · KEEPS-ITSELF tiles — what writes back into the record automatically.
-------------------------------------------------------------------------- */

const KEEPS_ITSELF: { title: string; body: string; href: string }[] = [
  {
    title: "Every lesson, logged",
    body: "Completed, cancelled and upcoming lessons file themselves into the history — hours taught and hours booked add up on their own.",
    href: "/features/smart-diary",
  },
  {
    title: "Progress writes back",
    body: "Mark a DVSA skill in a debrief and the pupil's overall percentage moves the same second — no separate sheet to keep.",
    href: "/features/progress",
  },
  {
    title: "Payments reconcile",
    body: "Card payments, blocks and what's outstanding land on the profile to the penny, so the balance is never a guess.",
    href: "/features/payments",
  },
];

/* --------------------------------- page ---------------------------------- */

export default function PupilHubPage() {
  const faqSchema = featureFaqSchema(feature);
  const faqs: Faq[] = feature.faqs.map((faq, index) => ({
    q: faq.q,
    a: <RichText text={faq.a} />,
    schemaAnswer: faqSchema[index].answer,
  }));
  const others = feature.related
    .map((slug) => getFeature(slug))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            path: PATH,
            name: `${feature.name} by Driive`,
            description: feature.metaDescription,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Features", path: "/features" },
            { name: feature.name, path: PATH },
          ]),
          softwareApplicationJsonLd({
            name: `Driive ${feature.name}`,
            description: feature.metaDescription,
            path: PATH,
            featureList: feature.benefits.map((benefit) => benefit.title),
          }),
          faqPageJsonLd(faqSchema),
        ]}
      />

      <PageIntro eyebrow={feature.name} title="Every learner, one profile." lede={feature.lede}>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {[
            "Lessons & history",
            "Credit balance",
            "Test dates",
            "Private notes",
            "Parent portal",
          ].map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-[#F9D7E2] ring-1 ring-white/15"
            >
              {chip}
            </span>
          ))}
        </div>
      </PageIntro>



      {/* Why instructors switch */}
      <section className="bg-white py-20 lg:py-28">
        <div className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
          <DetailsPanel />
          <div>
            <Eyebrow>Manage every pupil</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
             Know every pupil before every lesson.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-neutral-600">
              <p>
                Pick-up address. Lesson history.{" "}
                <Link href="/features/progress" className="font-medium text-[#2546F5] underline underline-offset-2">
                  Progress
                </Link>
                .{" "}
                <Link href="/features/payments" className="font-medium text-[#2546F5] underline underline-offset-2">
                  Payments
                </Link>
                . Test dates. Private notes. Everything you need to remember
                about a pupil is kept in one clean profile, so you can turn up
                prepared without digging through messages, notebooks or
                spreadsheets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Road from="#FFFFFF" to={CREAM} />

      {/* The whole book */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
        <div className={CONTAINER}>
          <Eyebrow>The pupil list</Eyebrow>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-neutral-900">
                Your whole book,
                <br />
                at a glance.
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-600">
                Search any pupil by name or phone, then filter the list down to
                exactly who needs you — test soon, unpaid, paused or just-joined.
                The <span className="font-semibold text-neutral-900">Follow up today</span>{" "}
                card does the thinking first: who owes you, whose test is days
                away, and who hasn&apos;t rebooked.
              </p>
              <ul className="mt-8 space-y-3.5 text-base font-medium text-neutral-900">
                {[
                  "Sort by who's owing, who's due next or who's newest",
                  "Spot the unbooked pupils before the gaps go quiet",
                  "Message or call straight from the row",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 text-[#2546F5]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <ListMock />
          </div>
        </div>
      </section>

      <Road from={CREAM} to={BLUE} />

      {/* Pupils join with a code */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: BLUE }}>
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-2`}>
          <div>
            <Eyebrow tone="light">Onboarding</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#F9D7E2]">
              Pupils join with
              <br />
              a code.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#F9D7E2]/90">
              Share your join code and pupils connect themselves from their own
              side of the app — they fill in their name, transmission and the
              rest, you just approve the request. From that moment you have a
              clean record and they have their lessons,{" "}
              <Link href="/features/payments" className="font-semibold underline underline-offset-2">
                credit
              </Link>{" "}
              and{" "}
              <Link href="/features/progress" className="font-semibold underline underline-offset-2">
                progress
              </Link>
              .
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#F9D7E2]/90">
              Bringing pupils across? Add them yourself in minutes, or invite
              them by email when they&apos;re ready to connect.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-white p-6">
              <p className="text-sm font-medium text-neutral-400">Your join code</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="rounded-xl bg-[#F0EEE7] px-5 py-3 font-mono text-2xl font-semibold tracking-[0.2em] text-[#2546F5]">
                  DRV-7K2Q
                </span>
                <span className="rounded-full bg-[#2546F5] px-5 py-2.5 text-sm font-medium text-white">
                  Share code
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6">
              <div className="flex items-center gap-3">
                <Image
                  src="https://randomuser.me/api/portraits/men/76.jpg"
                  alt="Tom Reid"
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-neutral-900">Tom Reid</p>
                  <p className="text-xs text-neutral-400">
                    Wants to join · entered your code
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[#2546F5] px-3 py-1 text-[11px] font-semibold text-white">
                  New
                </span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex-1 rounded-full border border-neutral-200 px-4 py-3 text-center text-sm font-medium text-neutral-600">
                  Decline
                </span>
                <span className="flex-1 rounded-full bg-[#2546F5] px-4 py-3 text-center text-sm font-medium text-white">
                  Approve
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Road from={BLUE} to={PINK} />

      {/* Parents stay in the loop */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: PINK }}>
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-2`}>
          <div className="order-2 lg:order-1">
            <GuardianPortal />
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow>Parents &amp; guardians</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#2546F5]">
              Keep parents in the
              <br />
              loop, not in your inbox.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#2546F5]/90">
              Add a parent or guardian to any pupil and they get a private,
              read-only view of lessons,{" "}
              <Link href="/features/payments" className="font-semibold underline underline-offset-2">
                payments
              </Link>{" "}
              and{" "}
              <Link href="/features/progress" className="font-semibold underline underline-offset-2">
                progress
              </Link>{" "}
              on the web — the questions that used to fill your evenings,
              answered before they ask.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#2546F5]/90">
              It&apos;s double opt-in, so they confirm by email first, there&apos;s
              no app for them to download, and they can step away whenever they
              like.
            </p>
          </div>
        </div>
      </section>

      <Road from={PINK} to="#FFFFFF" />

      {/* The record keeps itself */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <Eyebrow>Always current</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
              You teach. The profile updates itself.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Pupil Hub isn&apos;t a form you keep topped up. The record is built
              from the work you&apos;re already doing — every lesson, mark and
              payment flows straight in.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {KEEPS_ITSELF.map((tile) => (
              <Link
                key={tile.title}
                href={tile.href}
                className="group rounded-xl border border-neutral-200 p-7 transition hover:-translate-y-0.5 hover:border-[#2546F5]/30"
              >
                <p className="text-lg font-semibold tracking-tight text-neutral-900">
                  {tile.title}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-500">
                  {tile.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2546F5]">
                  Explore
                  <Arrow className="transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} />

      <Road from="#FFFFFF" to={CREAM} />

      {/* Related features */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
        <div className={CONTAINER}>
          <Eyebrow>Works with</Eyebrow>
          <h2 className="mt-8 max-w-2xl text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
            {feature.name} is stronger with the rest of Driive.
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/features/${other.slug}`}
                className="group rounded-xl bg-white p-7 shadow-[0_25px_60px_-35px_rgba(12,12,14,0.25)] transition hover:-translate-y-0.5"
              >
                <p className="text-lg font-semibold tracking-tight text-neutral-900">
                  {other.name}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-500">
                  {other.tagline}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-[#2546F5]">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection source="feature-pupil-hub" />
    </>
  );
}
