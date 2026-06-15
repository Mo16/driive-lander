import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { PageIntro, CtaSection, FaqSection, FeatureCard, type Faq } from "@/components/sections";

const maybeFeature = getFeature("progress");
if (!maybeFeature) throw new Error("progress missing from data/features.ts");
const feature = maybeFeature;
const PATH = "/features/progress";

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

const Star = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <path d="M12 3.5 14.6 9l6 .8-4.4 4.1 1.1 5.9L12 17l-5.3 2.8 1.1-5.9L3.4 9.8 9.4 9 12 3.5Z" />
  </svg>
);
const Target = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" />
  </svg>
);
const Flag = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <path d="M5 21V4m0 1h11l-2 4 2 4H5" />
  </svg>
);
const Trophy = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
    <path d="M7 6H4v1a3 3 0 0 0 3 3m10-4h3v1a3 3 0 0 1-3 3M9 17h6M10 13v4m4-4v4M8 21h8" />
  </svg>
);
const Clipboard = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4a3 3 0 0 1 6 0M9 11h6M9 15h4" />
  </svg>
);
const Mail = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

/* --------------------------------------------------------------------------
   Skill statuses — the app's six-step grade (lib/domain SKILL_STATUS_ORDER),
   mapped to the page palette: neutral → info → amber → amber → blue → green.
-------------------------------------------------------------------------- */

type Status =
  | "Not started"
  | "Introduced"
  | "Needs practice"
  | "Improving"
  | "Confident"
  | "Test ready";

const STATUS_CHIP: Record<Status, string> = {
  "Not started": "border border-neutral-200 text-neutral-400",
  Introduced: "bg-[#2546F5]/10 text-[#2546F5]",
  "Needs practice": "bg-[#C99A2E]/15 text-[#C99A2E]",
  Improving: "bg-[#C99A2E]/15 text-[#C99A2E]",
  Confident: "bg-[#2546F5] text-white",
  "Test ready": "bg-[#16A34A] text-white",
};
const STATUS_DOT: Record<Status, string> = {
  "Not started": "bg-neutral-300",
  Introduced: "bg-[#2546F5]/40",
  "Needs practice": "bg-[#C99A2E]",
  Improving: "bg-[#C99A2E]",
  Confident: "bg-[#2546F5]",
  "Test ready": "bg-[#16A34A]",
};

/* --------------------------------------------------------------------------
   1 · PROGRESS TREE — the instructor's per-pupil syllabus view: an overall
   readiness ring, then each DVSA category with its derived status and a
   skills-ready count. Topic status is rolled up from leaves, never stored.
-------------------------------------------------------------------------- */

/** A circular readiness gauge — stroke-dashoffset draws the arc to `pct`%. */
function Ring({ pct, size = 92 }: { pct: number; size?: number }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }} aria-hidden>
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="9" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke={PINK}
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct / 100)}
        transform="rotate(-90 50 50)"
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="26"
        fontWeight="600"
        letterSpacing="-0.04em"
      >
        {pct}%
      </text>
    </svg>
  );
}

const CATEGORIES: { name: string; status: Status; done: number; total: number }[] = [
  { name: "Getting ready", status: "Test ready", done: 12, total: 12 },
  { name: "Moving off & stopping", status: "Confident", done: 10, total: 12 },
  { name: "Mirrors, signals & awareness", status: "Improving", done: 7, total: 11 },
  { name: "Junctions & roundabouts", status: "Needs practice", done: 9, total: 21 },
  { name: "Manoeuvres", status: "Introduced", done: 2, total: 9 },
  { name: "Independent driving", status: "Not started", done: 0, total: 8 },
];

function ProgressTree() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_40px_90px_-45px_rgba(12,12,14,0.3)] sm:p-7">
      {/* hero */}
      <div className="flex items-center gap-3.5">
        <Image
          src="https://randomuser.me/api/portraits/women/65.jpg"
          alt="Maya Thompson"
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold tracking-tight text-neutral-900">
            Maya Thompson
          </p>
          <p className="text-sm text-neutral-500">DVSA syllabus · 40 of 73 ready</p>
        </div>
      </div>

      {/* readiness card */}
      <div className="mt-5 flex items-center gap-5 rounded-xl bg-[#2546F5] p-5 text-white">
        <Ring pct={68} />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#F9D7E2]">
            Test readiness
          </p>
          <p className="mt-1 text-lg font-semibold leading-tight">
            Over halfway — great progress
          </p>
          <p className="mt-1 text-xs text-white/70">Practical booked in 12 days</p>
        </div>
      </div>

      {/* categories */}
      <div className="mt-4 space-y-2">
        {CATEGORIES.map((cat) => (
          <div key={cat.name} className="rounded-xl border border-neutral-100 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="flex min-w-0 items-center gap-2.5 text-sm font-medium text-neutral-900">
                <span className={`h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[cat.status]}`} />
                <span className="truncate">{cat.name}</span>
              </p>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_CHIP[cat.status]}`}
              >
                {cat.status}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-[#2546F5]"
                  style={{ width: `${Math.round((cat.done / cat.total) * 100)}%` }}
                />
              </div>
              <span className="shrink-0 text-[11px] font-medium text-neutral-400">
                {cat.done}/{cat.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   2 · SKILL SHEET — the in-app grading control (SkillStatusPicker): tap a
   skill, mark it on the six-step scale, with the DVSA detail to hand. Marked
   in seconds at the side of the road.
-------------------------------------------------------------------------- */

const STATUS_ORDER: Status[] = [
  "Not started",
  "Introduced",
  "Needs practice",
  "Improving",
  "Confident",
  "Test ready",
];

const ASSESSED = [
  "Correct lane and clear signals on approach",
  "Effective observation before committing",
  "Smooth speed and gear for the exit taken",
];

function SkillSheet() {
  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_90px_-40px_rgba(12,12,14,0.45)]">
      <div className="flex justify-center pt-3">
        <span className="h-1.5 w-10 rounded-full bg-neutral-200" />
      </div>
      <div className="px-5 pb-6 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
          Junctions &amp; roundabouts
        </p>
        <p className="mt-1 text-lg font-semibold tracking-tight text-neutral-900">
          Roundabouts — approach &amp; lanes
        </p>

        {/* status picker */}
        <p className="mt-5 text-sm font-semibold text-neutral-900">
          How&apos;s it going?
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {STATUS_ORDER.map((st) => {
            const active = st === "Improving";
            return (
              <span
                key={st}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium ${
                  active
                    ? "border-[#2546F5] bg-[#2546F5]/[0.06] text-[#2546F5]"
                    : "border-neutral-200 text-neutral-600"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${STATUS_DOT[st]}`} />
                {st}
              </span>
            );
          })}
        </div>

        {/* assessed checklist */}
        <div className="mt-5 rounded-xl bg-[#F0EEE7] p-4">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
            <Clipboard className="h-3.5 w-3.5" /> What&apos;s assessed
          </p>
          <ul className="mt-2.5 space-y-2">
            {ASSESSED.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-neutral-600">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2546F5]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#2546F5] py-3.5 text-sm font-semibold text-white">
          Save to this lesson
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   3a · PARENT EMAIL MOCK — the read-only weekly update a parent/guardian you
   add receives. A loose, floating stack (no outer card — FeatureCard supplies
   that): an email header row, the readiness move, and a couple of skill marks.
-------------------------------------------------------------------------- */

const PARENT_SKILLS: { dot: string; skill: string; status: Status }[] = [
  { dot: STATUS_DOT.Confident, skill: "Moving off & stopping", status: "Confident" },
  { dot: STATUS_DOT.Improving, skill: "Mirrors & awareness", status: "Improving" },
];

function ParentEmailMock() {
  return (
    <div className="w-full max-w-sm space-y-3">
      {/* email header row */}
      <div className="flex items-center gap-3 rounded-2xl bg-neutral-50 p-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2546F5]/10 text-[#2546F5]">
          <Mail className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-neutral-900">
            Maya&apos;s progress this week
          </p>
          <p className="truncate text-xs text-neutral-400">
            Driive · to you, as Maya&apos;s guardian
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-[#2546F5]/10 px-2.5 py-1 text-[11px] font-semibold text-[#2546F5]">
          Weekly
        </span>
      </div>

      {/* readiness move */}
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#F0EEE7] px-4 py-3.5">
        <p className="text-sm font-medium text-neutral-700">Test readiness</p>
        <p className="flex items-center gap-2 text-sm font-semibold">
          <span className="text-neutral-400 line-through">62%</span>
          <Arrow className="h-3.5 w-3.5 text-[#16A34A]" />
          <span className="text-[#16A34A]">68%</span>
        </p>
      </div>

      {/* skill updates */}
      {PARENT_SKILLS.map((row) => (
        <div
          key={row.skill}
          className="flex items-center justify-between gap-3 rounded-2xl bg-neutral-50 px-4 py-3"
        >
          <p className="flex min-w-0 items-center gap-2.5 text-[13px] font-medium text-neutral-900">
            <span className={`h-2 w-2 shrink-0 rounded-full ${row.dot}`} />
            <span className="truncate">{row.skill}</span>
          </p>
          <span className="shrink-0 text-[11px] font-medium text-neutral-400">
            {row.status}
          </span>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------------
   3b · PUPIL APP MOCK — the learner's own view, as a loose floating stack:
   the readiness that ticks up, the feedback from their last lesson, and a
   clear "learn next".
-------------------------------------------------------------------------- */

const PUPIL_FEEDBACK: { icon: ReactNode; tone: string; label: string; note: string }[] = [
  {
    icon: <Star className="h-4 w-4" />,
    tone: "bg-[#22C55E]/10 text-[#16A34A]",
    label: "Went well",
    note: "Smooth gear changes, strong observation",
  },
  {
    icon: <Flag className="h-4 w-4" />,
    tone: "bg-[#2546F5]/10 text-[#2546F5]",
    label: "Next focus",
    note: "Roundabout lane positioning",
  },
];

function PupilAppMock() {
  return (
    <div className="w-full max-w-sm space-y-3">
      {/* readiness */}
      <div className="rounded-2xl bg-[#2546F5] p-5 text-white">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#F9D7E2]">
              Test readiness
            </p>
            <p className="mt-1 text-3xl font-semibold tracking-[-0.04em]">68%</p>
          </div>
          <p className="flex items-center gap-1.5 text-xs font-medium text-white/70">
            <Trophy className="h-4 w-4 text-[#F9D7E2]" /> Practical in 12 days
          </p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-[#F9D7E2]" style={{ width: "68%" }} />
        </div>
      </div>

      {/* feedback from last lesson */}
      {PUPIL_FEEDBACK.map((row) => (
        <div
          key={row.label}
          className="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3"
        >
          <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${row.tone}`}>
            {row.icon}
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-neutral-900">{row.label}</p>
            <p className="truncate text-xs text-neutral-400">{row.note}</p>
          </div>
        </div>
      ))}

      {/* learn next */}
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#F0EEE7] px-4 py-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#2546F5]">
            Learn next
          </p>
          <p className="truncate text-sm font-semibold text-neutral-900">
            Roundabouts — approach &amp; lanes
          </p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#2546F5] text-white">
          <Arrow />
        </span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   4 · DEBRIEF + EVIDENCE — the lesson debrief that builds the record, with a
   DL25-style mock-test result feeding test-readiness.
-------------------------------------------------------------------------- */

const DEBRIEF: { icon: ReactNode; label: string; note: string; tone: string }[] = [
  {
    icon: <Star className="h-4 w-4" />,
    label: "What went well",
    note: "Smooth gear changes, strong observation",
    tone: "bg-[#22C55E]/10 text-[#16A34A]",
  },
  {
    icon: <Target className="h-4 w-4" />,
    label: "Needs work",
    note: "Roundabout lane positioning",
    tone: "bg-[#C99A2E]/15 text-[#C99A2E]",
  },
  {
    icon: <Flag className="h-4 w-4" />,
    label: "Next focus",
    note: "Bay parking on quiet roads",
    tone: "bg-[#2546F5]/10 text-[#2546F5]",
  },
];

function DebriefCard() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_40px_90px_-45px_rgba(12,12,14,0.3)] sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-neutral-900">Lesson debrief</p>
        <span className="rounded-full bg-neutral-900 px-2.5 py-1 text-[11px] font-semibold text-white">
          Completed
        </span>
      </div>

      <div className="mt-4 space-y-2.5">
        {DEBRIEF.map((row) => (
          <div
            key={row.label}
            className="flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3"
          >
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${row.tone}`}>
              {row.icon}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-900">{row.label}</p>
              <p className="truncate text-xs text-neutral-400">{row.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* mock test result feeding readiness */}
      <div className="mt-3 rounded-xl p-5 text-white" style={{ backgroundColor: BLUE }}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">DL25 mock test</p>
          <span
            className="rounded-full px-3 py-1 text-[11px] font-semibold text-[#2546F5]"
            style={{ backgroundColor: PINK }}
          >
            Saved to progress
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            ["4", "minors"],
            ["0", "serious"],
            ["0", "dangerous"],
          ].map(([n, label]) => (
            <div key={label} className="rounded-xl bg-white/10 py-2.5 ring-1 ring-white/15">
              <p className="text-xl font-semibold tracking-tight">{n}</p>
              <p className="text-[10px] text-white/70">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   5 · KEEPS-ITSELF tiles — what the record feeds, automatically.
-------------------------------------------------------------------------- */

const KEEPS_ITSELF: { title: string; body: string; href: string }[] = [
  {
    title: "On the pupil profile",
    body: "Overall readiness and every skill status sit on the pupil's profile beside lessons, notes and test dates — one record, always current.",
    href: "/features/pupil-hub",
  },
  {
    title: "Marked from a mock test",
    body: "Run a DL25-style mock test and the result saves straight to the lesson and the pupil's progress, so test-readiness rests on evidence.",
    href: "/features/lesson-tools",
  },
  {
    title: "Built lesson by lesson",
    body: "Every completed lesson in the diary is a chance to mark a skill, so the record grows from the teaching you're already doing.",
    href: "/features/smart-diary",
  },
];

/* --------------------------------- page ---------------------------------- */

export default function ProgressPage() {
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
        eyebrow="Progress tracking"
        title="Know what to teach next."
        lede="Track each pupil against the DVSA syllabus, update skills after every lesson, and see exactly where they are improving, struggling, or nearly test-ready."
      >
        <div className="mt-8 flex flex-wrap gap-2.5">
          {[
            "DVSA syllabus",
            "Skill ratings",
            "Lesson notes",
            "Mock test results",
            "Test readiness",
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
          <ProgressTree />
          <div>
            <Eyebrow>Why instructors switch</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
              The whole syllabus, one clear picture.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-neutral-600">
              <p>
                Every pupil carries the full DVSA syllabus — junctions,
                roundabouts, manoeuvres, independent driving — each skill with a
                clear status, from introduced through to test-ready. The
                category totals and overall readiness add themselves up, so you
                always know where a learner really is.
              </p>
              <ul className="space-y-3.5 pt-2 text-base font-medium text-neutral-900">
                {[
                  "Six-step grading: introduced → needs practice → improving → confident → test-ready",
                  "Category status rolls up from the skills beneath it",
                  "One readiness percentage that tells the real story",
                  "Test dates sit right beside the progress they depend on",
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

      {/* Mark it by the road */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
        <div className={CONTAINER}>
          <Eyebrow>Marked in seconds</Eyebrow>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-neutral-900">
                Grade a skill
                <br />
                at the kerb.
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-600">
                Tap any skill, set where the pupil is on the six-step scale, and
                it saves to the lesson — no paperwork, no end-of-day catch-up.
                The DVSA detail is right there too: what&apos;s assessed, the
                common faults, and a short video to send home.
              </p>
              <ul className="mt-8 space-y-3.5 text-base font-medium text-neutral-900">
                {[
                  "Mark skills live during or after the lesson",
                  "Built on the DVSA national standard, not a homemade list",
                  "Tailor the syllabus — rename, re-order or hide skills",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 text-[#2546F5]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <SkillSheet />
          </div>
        </div>
      </section>

      <Road from={CREAM} to={BLUE} />

      {/* Everyone watches it build — pupils in-app, parents by email */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: BLUE }}>
        <div className={CONTAINER}>
          <Eyebrow tone="light">Pupils &amp; parents</Eyebrow>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#F9D7E2]">
              Everyone watches
              <br />
              the progress.
            </h2>
            <p className="text-lg leading-relaxed text-[#F9D7E2]/90">
              The progress you mark flows two ways — pupils see it climb in the
              app, and the{" "}
              <Link
                href="/features/pupil-hub"
                className="font-semibold underline underline-offset-2"
              >
                parents you add
              </Link>{" "}
              get the same picture by email. Both update the moment you save.
            </p>
          </div>

          {/* Two featured cards — a floating mockup on top, copy below */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <FeatureCard
              className="bg-white"
              label="For parents · by email"
              value="Progress, in their inbox"
              note="Add a parent or guardian and they get a private weekly email — the readiness move, the skills you marked, the test countdown. Read-only, no app to download."
            >
              <ParentEmailMock />
            </FeatureCard>

            <FeatureCard
              className="bg-white"
              label="For pupils · in the app"
              value="Progress & feedback, live"
              note="Pupils watch their readiness climb after every lesson, read your feedback from the last drive, and get a clear “learn next” for what to tackle."
            >
              <PupilAppMock />
            </FeatureCard>
          </div>
        </div>
      </section>

      <Road from={BLUE} to={PINK} />

      {/* Evidence for the test conversation */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: PINK }}>
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-2`}>
          <div className="order-2 lg:order-1">
            <DebriefCard />
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow>Test-readiness you can defend</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#2546F5]">
              Back the test
              <br />
              talk with proof.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#2546F5]/90">
              When a pupil — or a parent — asks about booking the test, the
              answer is a record built across real lessons, not a gut feeling.
              Each debrief notes what went well, what needs work and the next
              focus, and it all writes back to the skill record.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#2546F5]/90">
              Pair it with a{" "}
              <Link
                href="/features/lesson-tools"
                className="font-semibold underline underline-offset-2"
              >
                DL25-style mock test
              </Link>{" "}
              marked to the DVSA fault categories, and the conversation gets
              easier for both of you.
            </p>
          </div>
        </div>
      </section>

      <Road from={PINK} to="#FFFFFF" />

      {/* The record builds itself */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <Eyebrow>Always current</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
              You teach. The record builds itself.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Progress isn&apos;t a separate logbook to keep up. It grows from
              the lessons you teach and the tests you run, and flows straight
              into the rest of Driive — so the picture is the same everywhere.
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

      <CtaSection source="feature-progress" />
    </>
  );
}
