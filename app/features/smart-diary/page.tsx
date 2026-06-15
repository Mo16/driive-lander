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
  LogoMark,
  Road,
  RichText,
} from "@/components/ui";
import { PageIntro, CtaSection, FaqSection, FeatureCard, type Faq } from "@/components/sections";
import { CalendarOrbit } from "@/components/calendar-orbit";
import { IosNotifications, type IosAlert } from "@/components/IosNotifications";
import { RevealStack } from "@/components/RevealStack";

const maybeFeature = getFeature("smart-diary");
if (!maybeFeature) throw new Error("smart-diary missing from data/features.ts");
const feature = maybeFeature;
const PATH = "/features/smart-diary";

export const metadata = meta(feature.metaTitle, feature.metaDescription, PATH);

/* -------------------------------- diary mock -------------------------------
   CSS rebuild of the in-app week view: colour-coded lessons, a recurring
   break, an open slot and the today column — no screenshots, per CLAUDE.md. */

const DAY_START = 9;
const DAY_SPAN = 8.5; // 09:00 – 17:30

type DiarySlot =
  | {
    kind: "lesson";
    name: string;
    time: string;
    start: number;
    mins: number;
    tone: "paid" | "block" | "unpaid";
  }
  | { kind: "break"; label: string; start: number; mins: number }
  | { kind: "open"; label: string; start: number; mins: number };

type DiaryDay = {
  day: string;
  date: number;
  today?: boolean;
  /** Mon + Tue are hidden below sm so three columns hold at 375px. */
  desktopOnly?: boolean;
  slots: DiarySlot[];
};

const DIARY_WEEK: DiaryDay[] = [
  {
    day: "Mon",
    date: 8,
    desktopOnly: true,
    slots: [
      { kind: "lesson", name: "Aisha", time: "10:00", start: 10, mins: 120, tone: "paid" },
      { kind: "lesson", name: "Maya", time: "13:30", start: 13.5, mins: 90, tone: "block" },
      { kind: "lesson", name: "Jack", time: "16:00", start: 16, mins: 60, tone: "unpaid" },
    ],
  },
  {
    day: "Tue",
    date: 9,
    desktopOnly: true,
    slots: [
      { kind: "lesson", name: "Priya", time: "09:30", start: 9.5, mins: 90, tone: "paid" },
      { kind: "open", label: "2h free", start: 12, mins: 120 },
      { kind: "lesson", name: "Aisha", time: "14:30", start: 14.5, mins: 120, tone: "block" },
    ],
  },
  {
    day: "Wed",
    date: 10,
    slots: [
      { kind: "lesson", name: "Maya", time: "10:30", start: 10.5, mins: 60, tone: "paid" },
      { kind: "lesson", name: "Aisha", time: "12:00", start: 12, mins: 60, tone: "paid" },
      { kind: "break", label: "School run", start: 15, mins: 45 },
      { kind: "lesson", name: "Liam", time: "16:00", start: 16, mins: 60, tone: "paid" },
    ],
  },
  {
    day: "Thu",
    date: 11,
    slots: [
      { kind: "lesson", name: "Priya", time: "11:00", start: 11, mins: 60, tone: "unpaid" },
      { kind: "lesson", name: "Jack", time: "14:00", start: 14, mins: 120, tone: "paid" },
      { kind: "lesson", name: "Maya", time: "16:30", start: 16.5, mins: 60, tone: "block" },
    ],
  },
  {
    day: "Fri",
    date: 12,
    today: true,
    slots: [
      { kind: "lesson", name: "Maya", time: "09:30", start: 9.5, mins: 60, tone: "paid" },
      { kind: "lesson", name: "Jack", time: "14:00", start: 14, mins: 120, tone: "block" },
      { kind: "lesson", name: "Aisha", time: "16:30", start: 16.5, mins: 60, tone: "paid" },
    ],
  },
];

const slotTop = (start: number) =>
  `${((start - DAY_START) / DAY_SPAN) * 100}%`;
const slotHeight = (mins: number) => `${(mins / 60 / DAY_SPAN) * 100}%`;

const LESSON_TONES = {
  paid: "bg-[#2546F5] text-white",
  block: "bg-[#F9D7E2] text-[#2546F5]",
  unpaid: "bg-rose-500 text-white",
} as const;

const LEGEND = [
  { label: "Paid", swatch: "bg-[#2546F5]" },
  { label: "Block credit", swatch: "bg-[#F9D7E2]" },
  { label: "Unpaid", swatch: "bg-rose-500" },
  { label: "Break", swatch: "bg-neutral-200" },
] as const;

function DiaryMock() {
  const gridCols =
    "grid grid-cols-[2.25rem_repeat(3,1fr)] gap-x-1 sm:grid-cols-[2.5rem_repeat(5,1fr)] sm:gap-x-1.5";
  const dayCol = (day: DiaryDay) =>
    day.desktopOnly ? "hidden sm:block" : "";

  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_40px_90px_-45px_rgba(12,12,14,0.3)] sm:p-7">
      {/* toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="flex items-center gap-1 rounded-full p-1"
          style={{ backgroundColor: CREAM }}
        >
          {["Day", "Week", "Month"].map((view) => (
            <span
              key={view}
              className={`rounded-full px-4 py-1.5 text-xs font-medium ${view === "Week"
                ? "bg-white font-semibold text-[#2546F5] shadow-sm"
                : "text-neutral-500"
                }`}
            >
              {view}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-neutral-200 text-neutral-400">
            ‹
          </span>
          8 – 14 Jun
          <span className="grid h-7 w-7 place-items-center rounded-full border border-neutral-200 text-neutral-400">
            ›
          </span>
          <span
            className="ml-1 rounded-full px-3 py-1 text-[11px] font-semibold text-[#2546F5]"
            style={{ backgroundColor: PINK }}
          >
            Today
          </span>
        </div>
      </div>

      {/* weekday header */}
      <div className={`${gridCols} mt-6`}>
        <span aria-hidden />
        {DIARY_WEEK.map((day) => (
          <div
            key={day.day}
            className={`${dayCol(day)} pb-3 text-center text-xs font-medium text-neutral-400`}
          >
            {day.day}
            <span
              className={`mx-auto mt-1 grid h-7 w-7 place-items-center rounded-full text-[13px] ${day.today
                ? "bg-[#2546F5] font-semibold text-white"
                : "font-semibold text-neutral-900"
                }`}
            >
              {day.date}
            </span>
          </div>
        ))}
      </div>

      {/* time grid */}
      <div className="relative">
        {/* hour lines */}
        {[9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => (
          <div
            key={hour}
            aria-hidden
            className="absolute inset-x-0 border-t border-neutral-100"
            style={{ top: slotTop(hour) }}
          />
        ))}

        <div className={`${gridCols} relative h-92 sm:h-104`}>
          {/* time labels */}
          <div className="relative">
            {[9, 11, 13, 15, 17].map((hour) => (
              <span
                key={hour}
                className="absolute right-1.5 -translate-y-1/2 bg-white pr-0.5 text-[10px] font-medium text-neutral-400"
                style={{ top: slotTop(hour) }}
              >
                {String(hour).padStart(2, "0")}:00
              </span>
            ))}
          </div>

          {DIARY_WEEK.map((day) => (
            <div
              key={day.day}
              className={`${dayCol(day)} relative rounded-xl ${day.today ? "bg-[#F9D7E2]/30" : ""
                }`}
            >
              {/* now line on today */}
              {day.today && (
                <div
                  aria-hidden
                  className="absolute inset-x-0 z-10 flex items-center"
                  style={{ top: slotTop(11.5) }}
                >
                  <span className="h-2 w-2 -translate-x-1 rounded-full bg-rose-500" />
                  <span className="h-0.5 flex-1 bg-rose-500" />
                </div>
              )}

              {day.slots.map((slot) => {
                const pos = {
                  top: slotTop(slot.start),
                  height: slotHeight(slot.mins),
                };
                if (slot.kind === "break") {
                  return (
                    <div
                      key={slot.start}
                      className="absolute inset-x-0.5 flex items-center justify-center overflow-hidden rounded-xl bg-neutral-100 px-1 text-center text-[10px] font-medium text-neutral-500"
                      style={{
                        ...pos,
                        backgroundImage:
                          "repeating-linear-gradient(135deg, rgba(12,12,14,0.05) 0 5px, transparent 5px 10px)",
                      }}
                    >
                      {slot.label}
                    </div>
                  );
                }
                if (slot.kind === "open") {
                  return (
                    <div
                      key={slot.start}
                      className="absolute inset-x-0.5 flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl border-2 border-dashed border-[#2546F5]/40 px-1 text-center"
                      style={pos}
                    >
                      <span className="text-[11px] font-semibold text-[#2546F5]">
                        {slot.label}
                      </span>
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[9px] font-semibold text-[#2546F5]"
                        style={{ backgroundColor: PINK }}
                      >
                        Offer it
                      </span>
                    </div>
                  );
                }
                return (
                  <div
                    key={slot.start}
                    className={`absolute inset-x-0.5 overflow-hidden rounded-xl px-2 py-1.5 ${LESSON_TONES[slot.tone]}`}
                    style={pos}
                  >
                    <p className="truncate text-[11px] font-semibold leading-tight">
                      {slot.name}
                    </p>
                    <p className="text-[10px] leading-tight opacity-80">
                      {slot.time}
                    </p>
                    {slot.mins >= 90 && (
                      <span className="mt-1 inline-block rounded-full bg-white/20 px-1.5 py-0.5 text-[9px] font-semibold">
                        {slot.mins === 90 ? "1h30" : `${slot.mins / 60}h`}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* stats + legend */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 pt-5">
        <div className="flex items-center gap-3">
          <span
            className="grid h-10 w-10 place-items-center rounded-xl text-[#2546F5]"
            style={{ backgroundColor: PINK }}
          >
            <LogoMark tile={PINK} road={BLUE} className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              14 lessons this week
            </p>
            <p className="text-xs text-neutral-400">
              2 sellable hours still free on Tuesday
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {LEGEND.map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-1.5 text-xs font-medium text-neutral-500"
            >
              <span className={`h-2.5 w-2.5 rounded-full ${item.swatch}`} />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ diary glance ------------------------------ */

const GLANCE_TILES = [
  {
    title: "Colour-coded by payment",
    body: "Paid, unpaid, block credit and awaiting payment each get their own colour — who owes what is visible from across the room.",
  },
  {
    title: "Your gaps, counted",
    body: "Free time is totalled for the day and the week, so you always know exactly how many sellable hours are sitting in the diary.",
  },
  {
    title: "Day, week and month views",
    body: "A live line through now, pick-up points on every booking, and a tap takes any month-view day straight into the detail.",
  },
];

/* ----------------------------- working pattern ---------------------------- */

/** Featured working-pattern card: a visual on top, centred copy below. */
/** Lesson-status feed — the app's real statuses (see driive-app lib/labels.ts). */
type LessonStatus = "Scheduled" | "Completed" | "Cancelled" | "No-show";

const LESSON_FEED: { time: string; pupil: string; status: LessonStatus }[] = [
  { time: "Mon · 14:00", pupil: "Sam Carter", status: "Completed" },
  { time: "Tue · 10:00", pupil: "Aisha Khan", status: "Scheduled" },
  { time: "Wed · 16:00", pupil: "Leah Morgan", status: "Cancelled" },
  { time: "Thu · 09:00", pupil: "Tom Reid", status: "No-show" },
];

/** Status chip styles, within the page's palette (rose already used for unpaid). */
const STATUS_CHIP: Record<LessonStatus, string> = {
  Scheduled: "bg-[#2546F5]/10 text-[#2546F5]",
  Completed: "bg-neutral-900 text-white",
  Cancelled: "bg-neutral-100 text-neutral-400",
  "No-show": "bg-rose-500 text-white",
};

/** Automatic change alerts the pupil receives in-app — real notification kinds
    (lesson_rescheduled, lesson_cancelled) fired when the instructor edits a lesson. */
const CHANGE_ALERTS: IosAlert[] = [
  {
    title: "Lesson rescheduled",
    body: "Your lesson with Marcus has moved to Thu 16 Jun, 16:00.",
    when: "Just now",
  },
  {
    title: "Lesson cancelled",
    body: "Your lesson on Fri 17 Jun, 14:00 has been cancelled.",
    when: "2m ago",
  },
];

/* ---------------------------------- page ---------------------------------- */

export default function SmartDiaryPage() {
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

      <PageIntro
        eyebrow={feature.name}
        title={
          <>
            A smarter driving instructor diary app
            <br />

          </>
        }
        lede={feature.lede}
      >
        <div className="mt-8 flex flex-wrap gap-2.5">
          {[
            "Day · Week · Month",
            "Booking requests",
            "Open-slot offers",
            "Google · Apple · Outlook sync",
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

      {/* The diary itself */}
      <section className="bg-white pb-4 pt-20 lg:pt-28">
        <div className={CONTAINER}>
          <div
            className="mx-auto max-w-5xl rounded-xl p-4 sm:p-10"
            style={{ backgroundColor: CREAM }}
          >
            <DiaryMock />
          </div>
          <div className="mx-auto mt-6 grid max-w-5xl gap-5 sm:grid-cols-3">
            {GLANCE_TILES.map((tile) => (
              <div
                key={tile.title}
                className="rounded-xl border border-neutral-200 p-6"
              >
                <p className="font-semibold tracking-tight text-neutral-900">
                  {tile.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {tile.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why a normal calendar doesn't cut it */}
      <section className="bg-white py-20 lg:py-28">
        <div className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
          {/* The diary that replaced the paper book */}
          <Image
            src="/images/features/calendar.png"
            alt="The Driive diary showing a week of lessons, colour-coded by payment"
            width={1254}
            height={1254}
            className="h-auto w-full object-contain"
          />

          <div>
            <Eyebrow>Why instructors switch</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
              A diary built for driving instructors.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-neutral-600">
              <p>
                Paper diaries are fine for writing lessons down.
                They are not built to manage gaps, travel time, pickup points, payments, pupil updates and reminders.

                Smart Diary turns your working hours into real availability, so pupils can only book where it actually fits.
              </p>

              <ul className="space-y-3.5 pt-2 text-base font-medium text-neutral-900">
                {[
                  "Bookings can only ever land in genuine gaps",
                  "Every lesson carries its pick-up point and lesson type",
                  "Payment status is visible on the booking itself",
                  "One change updates pupils, payments and calendars together",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 text-[#2546F5]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Road from="#FFFFFF" to={CREAM} />

      {/* Working pattern */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
        <div className={CONTAINER}>
          <Eyebrow>When plans change</Eyebrow>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-neutral-900">
              Handle changes
              <br />
              without the chaos.
            </h2>
            <p className="text-lg leading-relaxed text-neutral-600">
Need to change a lesson? Update the booking once and everything stays in sync. Your diary, lesson record and pupil notifications all update together.
            </p>
          </div>
          {/* Two featured cards — narrow + wide, a visual on top, copy below */}
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <FeatureCard
              className="bg-white lg:col-span-1"
              label="Lesson status"
              value="Tracked in real time"
              note="Scheduled, completed, cancelled or no-show — every lesson carries its own status, derived from the clock as your day unfolds."
            >
              <RevealStack className="w-full max-w-xs space-y-2" step={120}>
                {LESSON_FEED.map((lesson) => {
                  const cancelled = lesson.status === "Cancelled";
                  return (
                    <div
                      key={lesson.pupil}
                      className="flex items-center justify-between rounded-xl bg-neutral-50 px-4 py-3"
                    >
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-medium ${cancelled
                              ? "text-neutral-400 line-through"
                              : "text-neutral-800"
                            }`}
                        >
                          {lesson.pupil}
                        </span>
                        <span
                          className={`text-xs ${cancelled ? "text-neutral-300" : "text-neutral-400"
                            }`}
                        >
                          {lesson.time}
                        </span>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_CHIP[lesson.status]
                          }`}
                      >
                        {lesson.status}
                      </span>
                    </div>
                  );
                })}
              </RevealStack>
            </FeatureCard>

            <FeatureCard
              className="bg-[#F9D7E2]/40 lg:col-span-2"
              label="Pupils told automatically"
              value="No awkward texts"
              note="Move or cancel a lesson and the update lands in your pupil's Driive app the moment it changes — no chasing, no double-bookings, no group-chat scrolling."
            >
              <div className="w-full max-w-md">
                <IosNotifications alerts={CHANGE_ALERTS} />
                <p className="pt-3 text-center text-xs font-medium text-neutral-400">
                  Sent the instant you make the change
                </p>
              </div>
            </FeatureCard>
          </div>
        </div>
      </section>

      <Road from={CREAM} to={BLUE} />

      {/* Less texting, more teaching */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: BLUE }}>
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-2`}>
          <div>
            <Eyebrow tone="light">No more WhatsApp admin</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#F9D7E2]">
              Let pupils book without
              <br />
              the back and forth
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#F9D7E2]/90">
Booking lessons shouldn't mean a dozen texts a day. With the smart diary, pupils handle it themselves — viewing lessons, requesting slots, and asking to reschedule from the app. You stay in charge: set your hours, approve what works, show only the gaps you want filled.
            </p>
           
          
          </div>

          <div className="rounded-xl bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Image
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Chloe Bennett"
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-neutral-900">
                  Chloe Bennett
                </p>
                <p className="text-xs text-neutral-400">
                  Booking request · 2h ago
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-[#2546F5] px-3 py-1 text-[11px] font-semibold text-white">
                New
              </span>
            </div>

            <div
              className="mt-5 rounded-xl p-5"
              style={{ backgroundColor: CREAM }}
            >
              <p className="text-lg font-semibold tracking-tight text-neutral-900">
                Tue 16 Jun · 14:00 – 16:00
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                2 hrs · pick-up PO5 2AB
              </p>
              <p className="mt-3 rounded-xl bg-white px-4 py-3 text-sm leading-relaxed text-neutral-600">
                &ldquo;After college works best — Wednesday could also
                work.&rdquo;
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#2546F5]/10 px-3 py-1.5 text-xs font-semibold text-[#2546F5]">
                Fits your gap
              </span>
              <span
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#2546F5]"
                style={{ backgroundColor: PINK }}
              >
                Block credit · 6h left
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="flex-1 rounded-full border border-neutral-200 px-4 py-3 text-center text-sm font-medium text-neutral-600">
                Decline
              </span>
              <span className="flex-1 rounded-full bg-[#2546F5] px-4 py-3 text-center text-sm font-medium text-white">
                Approve
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-dashed border-[#2546F5]/30 px-4 py-3">
              <p className="text-sm font-medium text-neutral-600">
                Rather pick the time yourself?
              </p>
              <span className="shrink-0 rounded-full bg-[#2546F5] px-4 py-2 text-[13px] font-medium text-white">
                Book a lesson
              </span>
            </div>

            <p className="mt-5 text-center text-xs leading-relaxed text-neutral-400">
              Approve her request or book her in yourself — either way the diary,
              her app and both calendars update together.
            </p>
          </div>
        </div>
      </section>

      <Road from={BLUE} to={PINK} />

      {/* Open slots / cancellations */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: PINK }}>
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-2`}>
          <div className="order-2 lg:order-1">
            <div className="space-y-4">
              <div className="rounded-xl bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-lg font-semibold tracking-tight text-neutral-900">
                    Thu 18 Jun · 11:00 – 13:00
                  </p>
                  <span className="shrink-0 rounded-full border border-neutral-200 px-3 py-1 text-[11px] font-medium text-neutral-500">
                    Cancelled
                  </span>
                </div>
                <p className="mt-1 text-sm text-neutral-500">
                  Maya cancelled — 2 sellable hours freed up
                </p>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2546F5] px-5 py-2.5 text-sm font-medium text-white">
                  Offer slot to pupils
                  <Arrow />
                </span>
              </div>
              <div
                className="rounded-xl p-6 text-white"
                style={{ backgroundColor: BLUE }}
              >
                <div className="flex items-center gap-2">
                  <LogoMark tile={PINK} road={BLUE} className="h-5 w-5" />
                  <p className="text-sm font-semibold">Offered to 14 pupils · 09:42</p>
                </div>
                <div className="mt-4 rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                  <p className="text-sm font-medium">
                    Liam Carter requested · 09:45
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-4 py-3 text-neutral-900">
                  <p className="text-sm font-semibold">Slot filled</p>
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-semibold text-[#2546F5]"
                    style={{ backgroundColor: PINK }}
                  >
                    3 minutes later
                  </span>
                </div>

              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow>Open-slot offers</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#2546F5]">
              A cancellation is now
              <br />
              just an open slot.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#2546F5]/90">
              When someone cancels, the gap doesn&apos;t have to die quietly.
              Offer the freed slot to every active pupil — or just the few you
              choose — in one tap, with a note if you like. The first request
              you approve takes it.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#2546F5]/90">
              And if the cancelled lesson was prepaid, the hours flow straight
              back to the pupil&apos;s{" "}
              <Link
                href="/features/payments"
                className="font-medium underline underline-offset-2"
              >
                credit balance
              </Link>{" "}
              — the slot refills and the money sorts itself.
            </p>
          </div>
        </div>
      </section>

      <Road from={PINK} to="#FFFFFF" />

      {/* Calendar sync */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <CalendarOrbit />
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

      <CtaSection source="feature-smart-diary" />
    </>
  );
}
