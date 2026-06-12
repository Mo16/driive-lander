"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

const BLUE = "#2546F5";

/* ---------------------------------- icons --------------------------------- */

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M5 12h14m-6-6 6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const iconBase = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ClockIcon = () => (
  <svg {...iconBase}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const CalendarCheckIcon = () => (
  <svg {...iconBase}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" />
  </svg>
);

const BlockIcon = () => (
  <svg {...iconBase}>
    <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
    <path d="M3 7l9 5 9-5M12 12v10" />
  </svg>
);

const MessageIcon = () => (
  <svg {...iconBase}>
    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9.6 9.6 0 0 1-4-.8L3 21l1.8-5.5a8.38 8.38 0 0 1-.8-4A8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />
  </svg>
);

const PhoneIcon = () => (
  <svg {...iconBase}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);

const DocIcon = () => (
  <svg {...iconBase}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v6h6M8 13h8M8 17h6" />
  </svg>
);

const StarIcon = () => (
  <svg {...iconBase}>
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8L12 3.5Z" />
  </svg>
);

const TargetIcon = () => (
  <svg {...iconBase}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

const FlagIcon = () => (
  <svg {...iconBase}>
    <path d="M6 21V4m0 1h11.5l-3 4 3 4H6" />
  </svg>
);

const ChevronIcon = () => (
  <svg {...iconBase} width={10} height={10} strokeWidth={2.5}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const WalletIcon = () => (
  <svg {...iconBase} width={16} height={16}>
    <path d="M20 7H5a2 2 0 0 1-2-2 2 2 0 0 1 2-2h13v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1" />
    <path d="M16 13.5h.01" />
  </svg>
);

const LinkIcon = () => (
  <svg {...iconBase}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const CheckIcon = () => (
  <svg {...iconBase}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/* ------------------------------ mini visuals ------------------------------ */

function DiaryVisual() {
  return (
    <div className="flex h-full items-center justify-center">
      {/* break out of the panel padding so the square diary reads large */}
      <Image
        src="/images/features/calendar.png"
        alt="The Driive diary showing a week of lessons"
        width={1254}
        height={1254}
        className="h-auto w-full max-w-full object-contain lg:-m-6 lg:max-h-[calc(100%+3rem)] lg:w-auto lg:max-w-[calc(100%+3rem)]"
      />
    </div>
  );
}

type Pupil = {
  photo: string;
  name: string;
  when: string;
  last: string;
  done: number;
  booked: number;
  hoursLeft: number;
  source: string;
};

function PupilCard({ pupil }: { pupil: Pupil }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="relative shrink-0">
          <Image
            src={pupil.photo}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#22C55E]" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[15px] font-semibold">{pupil.name}</p>
            <span className="shrink-0 rounded-full bg-[#2546F5]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#2546F5]">
              Active
            </span>
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-neutral-800">
            <ClockIcon />
            {pupil.when}
          </p>
          <p className="text-xs text-neutral-400">{pupil.last}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-neutral-500">
        <span className="flex items-center gap-1.5">
          <CalendarCheckIcon />
          {pupil.done} done
        </span>
        <span className="flex items-center gap-1.5">
          <ClockIcon />
          {pupil.booked} booked
        </span>
        <span className="flex items-center gap-1.5">
          <BlockIcon />
          {pupil.hoursLeft}h left
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="rounded-full bg-[#2546F5]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#2546F5]">
          {pupil.source}
        </span>
        <div className="flex items-center gap-2">
          {[<MessageIcon key="m" />, <PhoneIcon key="p" />, <DocIcon key="d" />].map(
            (icon, i) => (
              <span
                key={i}
                className="grid h-8 w-8 place-items-center rounded-full border border-neutral-200 text-neutral-500"
              >
                {icon}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

function PupilsVisual() {
  const pupils: Pupil[] = [
    {
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Jack Wilson",
      when: "Today, 13:51 · 2h · Manual",
      last: "Last lesson 2 days ago",
      done: 4,
      booked: 8,
      hoursLeft: 9,
      source: "App",
    },
    {
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Emily Brown",
      when: "Tomorrow, 10:00 · 2h · Manual",
      last: "Last lesson yesterday",
      done: 12,
      booked: 6,
      hoursLeft: 4,
      source: "Web",
    },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <p className="mb-1 text-sm font-semibold">Pupils · 23 active</p>
      {pupils.map((pupil) => (
        <PupilCard key={pupil.name} pupil={pupil} />
      ))}
    </div>
  );
}

function PaymentsVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <p className="mb-1 text-sm font-semibold">Your money · 2026–27</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          ["£2,840", "income this month"],
          ["£243", "outstanding"],
        ].map(([stat, label]) => (
          <div key={label} className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xl font-semibold tracking-tight">{stat}</p>
            <p className="text-[11px] text-neutral-400">{label}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2546F5]/10 text-[#2546F5]">
            <WalletIcon />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold tracking-tight">£38.00</p>
            <p className="text-xs text-neutral-400">
              Maya Thompson · Pay as you go · 1h
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-[#F9D7E2] px-2.5 py-1 text-[11px] font-semibold text-[#2546F5]">
            Unpaid
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-center text-[13px] font-medium">
          <span className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-3 py-2.5 text-neutral-700">
            <LinkIcon />
            Payment link
          </span>
          <span className="flex items-center justify-center gap-2 rounded-full bg-[#2546F5] px-3 py-2.5 text-white">
            <CheckIcon />
            Mark as paid
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F9D7E2] text-[#2546F5]">
            <WalletIcon />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Outstanding payments</p>
            <p className="truncate text-xs text-neutral-400">
              Chase what pupils owe &amp; mark paid
            </p>
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-[#2546F5]">
          £243.00
          <ChevronIcon />
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-xl bg-[#2546F5] p-4 text-white">
        <div>
          <p className="text-sm font-semibold">Next payout</p>
          <p className="mt-0.5 text-xs text-white/70">
            In your bank tomorrow
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#2546F5]">
          £342.00
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">Last payout · £296.00</p>
          <p className="truncate text-xs text-neutral-400">
            Landed in your bank Mon 8 Jun
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-[#22C55E]/10 px-2.5 py-1 text-[11px] font-semibold text-[#22C55E]">
          Paid out
        </span>
      </div>
    </div>
  );
}

function ProgressVisual() {
  const skills: [string, string][] = [
    ["Adjusting the mirrors", "Introduced"],
    ["Moving off & stopping", "Practised"],
    ["Roundabouts", "Test-ready"],
  ];
  const feedback: [ReactNode, string, string, string][] = [
    [
      <StarIcon key="i" />,
      "What went well",
      "Smooth gear changes, good observations",
      "bg-[#22C55E]/10 text-[#22C55E]",
    ],
    [
      <TargetIcon key="i" />,
      "Needs work",
      "Roundabout positioning",
      "bg-[#F9D7E2] text-[#2546F5]",
    ],
    [
      <FlagIcon key="i" />,
      "Next focus",
      "Bay parking",
      "bg-[#2546F5]/10 text-[#2546F5]",
    ],
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <p className="mb-1 text-sm font-semibold">Covered this lesson</p>
      {skills.map(([skill, status]) => (
        <div
          key={skill}
          className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-sm"
        >
          <p className="flex min-w-0 items-center gap-2.5 text-sm font-medium">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#2546F5]" />
            <span className="truncate">{skill}</span>
          </p>
          <span
            className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              status === "Test-ready"
                ? "bg-[#2546F5] text-white"
                : status === "Practised"
                  ? "bg-[#F9D7E2] text-[#2546F5]"
                  : "border border-neutral-200 text-neutral-500"
            }`}
          >
            {status}
            <ChevronIcon />
          </span>
        </div>
      ))}
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">All skills</p>
          <p className="text-xs text-neutral-400">61 of 137 test-ready</p>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-neutral-100">
          <div className="h-full w-[45%] rounded-full bg-[#2546F5]" />
        </div>
      </div>
      <div className="rounded-xl bg-white px-4 shadow-sm">
        {feedback.map(([icon, label, note, tone]) => (
          <div
            key={label}
            className="flex items-center gap-3 border-t border-neutral-100 py-3 first:border-t-0"
          >
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${tone}`}
            >
              {icon}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium">{label}</p>
              <p className="truncate text-xs text-neutral-400">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MapSketch() {
  return (
    <svg viewBox="0 0 220 116" className="h-auto w-full" aria-hidden>
      <rect width="220" height="116" className="fill-neutral-100" />
      {/* roads */}
      <rect x="84" width="52" height="116" className="fill-neutral-300" />
      <rect y="64" width="220" height="52" className="fill-neutral-300" />
      {/* centre lines */}
      <line x1="110" y1="6" x2="110" y2="56" stroke="white" strokeWidth="2" strokeDasharray="7 7" />
      <line x1="6" y1="90" x2="76" y2="90" stroke="white" strokeWidth="2" strokeDasharray="7 7" />
      <line x1="144" y1="90" x2="214" y2="90" stroke="white" strokeWidth="2" strokeDasharray="7 7" />
      {/* zebra crossing on the right arm */}
      {[154, 162, 170, 178].map((x) => (
        <rect key={x} x={x} y="69" width="4" height="42" fill="white" rx="1" />
      ))}
      {/* lane arrow */}
      <path
        d="M97 16v14m0 0-4-5m4 5 4-5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* instructor's drawn route: down the road, left turn, exit left */}
      <path
        d="M121 8c2 14-1 28 1 40 1 8-5 14-15 16-17 4-48 3-83 3"
        fill="none"
        className="stroke-neutral-900"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M36 58l-14 9 14 9"
        fill="none"
        className="stroke-neutral-900"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LessonToolsVisual() {
  const faults: [string, number, number][] = [
    ["Junctions · observation", 2, 0],
    ["Reverse park · control", 1, 0],
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="mb-1 flex items-center justify-between">
        <p className="text-sm font-semibold">Mock test · Emily Brown</p>
        <span className="rounded-full bg-[#2546F5] px-3 py-1 text-xs font-medium text-white">
          38:12
        </span>
      </div>
      {faults.map(([item, minors, serious]) => (
        <div
          key={item}
          className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm"
        >
          <p className="text-sm font-medium">{item}</p>
          <div className="flex items-center gap-2 text-[11px] font-medium">
            <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-neutral-500">
              {minors} minor{minors === 1 ? "" : "s"}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 ${
                serious > 0
                  ? "bg-[#2546F5] text-white"
                  : "border border-neutral-200 text-neutral-300"
              }`}
            >
              S
            </span>
          </div>
        </div>
      ))}
      <div className="rounded-xl bg-[#22C55E] p-4 text-white">
        <p className="flex items-center justify-between text-sm font-semibold">
          Result
          <span className="rounded-full bg-white px-3 py-0.5 text-[11px] font-semibold text-[#22C55E]">
            Pass standard
          </span>
        </p>
        <p className="mt-1 text-xs text-white/70">
          4 minors · 0 serious · saved to lesson debrief
        </p>
      </div>
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5">
          <p className="text-sm font-semibold">Map sketch</p>
          <span className="rounded-full bg-[#F9D7E2] px-2.5 py-0.5 text-[11px] font-semibold text-[#2546F5]">
            Shared with Emily
          </span>
        </div>
        <MapSketch />
      </div>
    </div>
  );
}

function AccountsVisual() {
  const bars = [40, 55, 35, 70, 60, 82, 94];
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="grid grid-cols-3 gap-3">
        {[
          ["£2,840", "income · June"],
          ["£412", "expenses"],
          ["£486", "tax pot"],
        ].map(([stat, label]) => (
          <div key={label} className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xl font-semibold tracking-tight">{stat}</p>
            <p className="text-[11px] text-neutral-400">{label}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <p className="mb-3 text-sm font-semibold">Weekly profit</p>
        <div className="flex h-28 items-end gap-2">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-md ${
                i === bars.length - 1 ? "bg-[#2546F5]" : "bg-[#2546F5]/30"
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
        <p className="text-sm text-neutral-500">Mileage · Corsa (manual)</p>
        <span className="rounded-full bg-[#F9D7E2] px-2.5 py-1 text-[11px] font-semibold text-[#2546F5]">
          312 mi this month
        </span>
      </div>
    </div>
  );
}

function WebsiteVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
          </span>
          <span className="ml-2 rounded-full bg-neutral-100 px-3 py-1 text-[11px] font-medium text-neutral-500">
            moss-driving.driive.app
          </span>
        </div>
        <div className="bg-[#2546F5] px-5 py-6 text-white">
          <p className="text-lg font-semibold tracking-tight">
            Moss School of Motoring
          </p>
          <p className="mt-1 text-xs text-white/70">
            Manual &amp; automatic · Portsmouth · from £35/hr
          </p>
          <span className="mt-4 inline-block rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold text-[#2546F5]">
            Book your first lesson
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 p-4 text-center text-[11px] font-medium text-neutral-600">
          {["Services", "Reviews ★ 4.9", "Areas covered"].map((label) => (
            <span
              key={label}
              className="rounded-lg border border-neutral-200 px-2 py-2"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
        <p className="text-sm text-neutral-500">New enquiry from your site</p>
        <span className="rounded-full bg-[#F9D7E2] px-2.5 py-1 text-[11px] font-semibold text-[#2546F5]">
          2 min ago
        </span>
      </div>
    </div>
  );
}

const ENQUIRY_STAGES = ["New enquiry", "Contacted", "Enrolled"];

type Enquiry = {
  initials: string;
  name: string;
  when: string;
  message: string;
  chips: string[];
  stage: number;
};

function EnquiryCard({ enquiry }: { enquiry: Enquiry }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2546F5]/10 text-[13px] font-semibold text-[#2546F5]">
          {enquiry.initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold">{enquiry.name}</p>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                enquiry.stage === 0
                  ? "bg-[#2546F5]/10 text-[#2546F5]"
                  : "bg-[#F9D7E2] text-[#2546F5]"
              }`}
            >
              {enquiry.stage === 0 ? "New" : ENQUIRY_STAGES[enquiry.stage]}
            </span>
          </div>
          <p className="mt-0.5 truncate text-xs text-neutral-400">
            {enquiry.message}
          </p>
        </div>
        <span className="shrink-0 text-[11px] text-neutral-400">
          {enquiry.when}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        {ENQUIRY_STAGES.map((stage, i) => (
          <span key={stage} className="contents">
            {i > 0 && (
              <span
                className={`h-px flex-1 ${
                  i <= enquiry.stage ? "bg-[#2546F5]" : "bg-neutral-200"
                }`}
              />
            )}
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                i <= enquiry.stage ? "bg-[#2546F5]" : "bg-neutral-200"
              }`}
            />
          </span>
        ))}
        <span className="ml-2 shrink-0 text-[11px] font-semibold text-[#2546F5]">
          {ENQUIRY_STAGES[enquiry.stage]}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          {enquiry.chips.map((chip) => (
            <span
              key={chip}
              className="truncate rounded-full border border-neutral-200 px-2.5 py-1 text-[11px] font-medium text-neutral-600"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#F9D7E2] text-[#2546F5]">
            <PhoneIcon />
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full border border-neutral-200 text-[#2546F5]">
            <MessageIcon />
          </span>
        </div>
      </div>
    </div>
  );
}

function EnquiriesVisual() {
  const enquiries: Enquiry[] = [
    {
      initials: "EW",
      name: "Ethan Walsh",
      when: "2h ago",
      message: "Just turned 17 and keen to start straight away!",
      chips: ["Google", "Manual", "M20 4DT"],
      stage: 0,
    },
    {
      initials: "GB",
      name: "Grace Bennett",
      when: "7h ago",
      message: "Had about 5 lessons before, looking to switch.",
      chips: ["Website", "Automatic", "M21 9HG"],
      stage: 1,
    },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="mb-1 flex items-center justify-between">
        <p className="text-sm font-semibold">Recent enquiries</p>
        <span className="text-[13px] font-medium text-[#2546F5]">View all</span>
      </div>
      <div className="flex items-center gap-1.5">
        {["All", "New", "Contacted", "Awaiting", "Enrolled"].map((filter, i) => (
          <span
            key={filter}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${
              i === 0
                ? "bg-[#F9D7E2] text-[#2546F5]"
                : "bg-white text-neutral-500 shadow-sm"
            }`}
          >
            {filter}
          </span>
        ))}
      </div>
      {enquiries.map((enquiry) => (
        <EnquiryCard key={enquiry.name} enquiry={enquiry} />
      ))}
    </div>
  );
}

/* --------------------------------- content -------------------------------- */

/* Map of feature slugs → visuals, reused on /features/[slug] pages. */
export const FEATURE_VISUALS: Record<string, ReactNode> = {
  "smart-diary": <DiaryVisual />,
  "pupil-hub": <PupilsVisual />,
  payments: <PaymentsVisual />,
  progress: <ProgressVisual />,
  "lesson-tools": <LessonToolsVisual />,
  accounts: <AccountsVisual />,
  website: <WebsiteVisual />,
  enquiries: <EnquiriesVisual />,
};

type Feature = {
  id: string;
  slug: string;
  title: string;
  body: string;
  cta: string;
  visual: ReactNode;
};

const FEATURES: Feature[] = [
  {
    id: "diary",
    slug: "smart-diary",
    title: "Your diary, filled for you",
    body: "Your free slots shouldn’t sit empty. Driive shows pupils the times you actually have available, lets them request a lesson, and keeps your diary updated automatically.",
    cta: "Try the diary",
    visual: <DiaryVisual />,
  },
  {
    id: "pupils",
    slug: "pupil-hub",
    title: "Every pupil, under control",
    body: "See each pupil’s lessons, payments, notes, progress and test dates in one simple profile.",
    cta: "View the hub",
    visual: <PupilsVisual />,
  },
  {
    id: "payments",
    slug: "payments",
    title: "Get paid without the chasing",
    body: "Take card payments, send payment links, and track every pupil balance from one clean dashboard. Know who’s paid, who owes, and what’s coming into your bank next.",
    cta: "Explore payments",
    visual: <PaymentsVisual />,
  },
  {
    id: "progress",
    slug: "progress",
    title: "Never forget where a student is up to",
    body: "Mark off skills after each lesson, add notes on what went well, and set the next focus before you forget.",
    cta: "Track progress",
    visual: <ProgressVisual />,
  },
  {
    id: "lesson-tools",
    slug: "lesson-tools",
    title: "Teach more clearly, right from your phone",
    body: "Run DVSA-style mock tests, sketch out manoeuvres, draw over lesson routes, and share handouts or photos in seconds.",
    cta: "See the tools",
    visual: <LessonToolsVisual />,
  },
  {
    id: "accounts",
    slug: "accounts",
    title: "Accounts & Tax",
    body: "Know what you’re making without opening a spreadsheet. Driive tracks income, expenses, mileage and estimated tax as you teach, so your books stay tidy and self-assessment feels less painful.",
    cta: "See the books",
    visual: <AccountsVisual />,
  },
  {
    id: "enquiries",
    slug: "enquiries",
    title: "Turn enquiries into booked pupils",
    body: "Let pupils enquire from your site, then manage the whole journey in Driive.",
    cta: "Capture enquiries",
    visual: <EnquiriesVisual />,
  },
];

/* -------------------------------- component ------------------------------- */

export default function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    blocks.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop: scroll-driven sticky showcase */}
      <div className="hidden rounded-[2.5rem] bg-white lg:grid lg:grid-cols-2">
        <div className="px-10 xl:px-16">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.id}
              data-index={i}
              ref={(el) => {
                blocks.current[i] = el;
              }}
              className="flex min-h-[55vh] flex-col justify-center border-t border-neutral-200 py-10"
            >
              <h3
                className={`text-4xl font-semibold tracking-[-0.03em] transition-colors duration-300 xl:text-5xl ${
                  active === i ? "text-neutral-900" : "text-neutral-300"
                }`}
              >
                {feature.title}
              </h3>
              <div
                className={`grid transition-all duration-500 ${
                  active === i
                    ? "mt-6 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-md text-lg leading-relaxed text-neutral-500">
                    {feature.body}
                  </p>
                  <a
                    href={`/features/${feature.slug}`}
                    className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-white transition hover:opacity-90"
                    style={{ backgroundColor: BLUE }}
                  >
                    {feature.cta}
                    <Arrow />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative rounded-r-[2.5rem] bg-[#FEF8FA]">
          <div className="sticky top-24 h-[64vh]">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.id}
                className={`absolute inset-0 p-10 transition-all duration-500 ${
                  active === i
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-4 opacity-0"
                }`}
              >
                {feature.visual}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: stacked list */}
      <div className="space-y-12 rounded-[2.5rem] bg-white p-6 sm:p-8 lg:hidden">
        {FEATURES.map((feature) => (
          <div key={feature.id} className="border-t border-neutral-200 pt-8 first:border-t-0 first:pt-0">
            <h3 className="text-3xl font-semibold tracking-[-0.03em]">
              {feature.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-neutral-500">
              {feature.body}
            </p>
            <div className="mt-6 rounded-3xl bg-[#FEF8FA] p-5">
              {feature.visual}
            </div>
            <a
              href={`/features/${feature.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2546F5]"
            >
              {feature.cta}
              <Arrow />
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
