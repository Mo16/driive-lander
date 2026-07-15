import { BLUE, PINK, LogoMark } from "./ui";

/* ============================================================================
   Instructor pillar-page visuals — CSS/SVG only, no imagery (see CLAUDE.md).
   Each mockup recreates a real Driive instructor screen so the page can show,
   not tell. Realistic UK details (£35/hr, 14:00, Wandsworth) throughout.
   Shared frames keep every visual on the same device language as the rest of
   the site (rounded-[3rem] phone, browser chrome, floating rounded-xl cards).
============================================================================ */

/* -------------------------------- shells ---------------------------------- */

function PhoneFrame({
  rotate = "",
  children,
}: {
  rotate?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative mx-auto w-[290px] shrink-0 rounded-[3rem] border-[10px] border-neutral-950 bg-white shadow-[0_50px_100px_-30px_rgba(0,0,0,0.45)] sm:w-[320px] ${rotate}`}
    >
      <div className="absolute left-1/2 top-3 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-neutral-950" />
      <div className="overflow-hidden rounded-[2.35rem]">
        <div className="flex h-[500px] flex-col bg-[#F7F5F2] pt-12 text-[13px] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

function PhoneHeader({ chip }: { chip: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-neutral-200 bg-white px-5 pb-3 pt-1">
      <LogoMark tile={BLUE} road={PINK} className="h-6 w-6" />
      <span className="text-sm font-semibold text-neutral-900">driive</span>
      <span className="ml-auto rounded-full bg-[#F9D7E2] px-2.5 py-1 text-[10px] font-semibold text-[#2546F5]">
        {chip}
      </span>
    </div>
  );
}

function PhoneFooter({ label }: { label: string }) {
  return (
    <p className="pb-4 text-center text-[10px] text-neutral-300">{label}</p>
  );
}

/* ------------------------------- 1 · diary -------------------------------- */

export function DiaryPhone() {
  return (
    <PhoneFrame rotate="rotate-2">
      <PhoneHeader chip="Tue 14 Apr" />
      <div className="flex-1 space-y-2.5 px-4 py-4">
        <div className="rounded-xl bg-[#2546F5] px-4 py-3.5 text-white">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#F9D7E2]">
            Today
          </p>
          <p className="mt-1 flex items-center justify-between text-[15px] font-semibold">
            3 lessons
            <span className="text-[#F9D7E2]">£105 booked</span>
          </p>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-neutral-200">
          <div>
            <p className="font-medium text-neutral-900">09:00 · Priya Shah</p>
            <p className="text-[11px] text-neutral-400">Manual · Wandsworth</p>
          </div>
          <span className="rounded-full bg-[#2546F5]/10 px-2.5 py-1 text-[10px] font-semibold text-[#2546F5]">
            Paid
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-neutral-200">
          <div>
            <p className="font-medium text-neutral-900">11:00 · Tom Reed</p>
            <p className="text-[11px] text-neutral-400">Block · 8 of 10 left</p>
          </div>
          <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold text-neutral-500">
            Block
          </span>
        </div>

        <div className="rounded-xl bg-white px-4 py-3 ring-2 ring-[#2546F5]">
          <p className="flex items-center justify-between">
            <span className="font-medium text-neutral-900">
              14:00 · New request
            </span>
            <span className="rounded-full bg-[#2546F5] px-3 py-1 text-[10px] font-semibold text-white">
              Approve
            </span>
          </p>
          <p className="mt-1 text-[11px] text-neutral-400">
            Emily Brown · first lesson
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-dashed border-neutral-300 px-4 py-3 text-[11px] text-neutral-500">
          <span className="h-2 w-2 rounded-full bg-[#2546F5]" />
          13:00 gap — offer to your pupils
        </div>
      </div>
      <PhoneFooter label="Smart Diary · Driive" />
    </PhoneFrame>
  );
}

/* ----------------------------- 2 · payments ------------------------------- */

export function PaymentsCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* main ledger card */}
      <div className="rounded-xl bg-white p-6 shadow-[0_40px_90px_-40px_rgba(12,12,14,0.4)] ring-1 ring-neutral-200/70">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
            This week
          </p>
          <span className="rounded-full bg-[#2546F5]/10 px-2.5 py-1 text-[10px] font-semibold text-[#2546F5]">
            Paid out
          </span>
        </div>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
          £612
          <span className="ml-2 text-sm font-medium text-neutral-400">
            collected
          </span>
        </p>

        <div className="mt-5 space-y-2.5">
          {[
            { who: "Priya Shah", how: "Card · 1 hr", amt: "£35", tone: "paid" },
            { who: "Aisha Khan", how: "Block · 2 hr", amt: "−2 hrs", tone: "block" },
            { who: "Liam Doyle", how: "Cash · 1.5 hr", amt: "£52", tone: "paid" },
          ].map((row) => (
            <div
              key={row.who}
              className="flex items-center justify-between rounded-xl bg-[#F7F5F2] px-4 py-3"
            >
              <div>
                <p className="text-[13px] font-medium text-neutral-900">
                  {row.who}
                </p>
                <p className="text-[11px] text-neutral-400">{row.how}</p>
              </div>
              <span
                className={`text-[13px] font-semibold ${
                  row.tone === "block" ? "text-neutral-500" : "text-[#2546F5]"
                }`}
              >
                {row.amt}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* floating block-balance chip */}
      <div className="absolute -right-3 -top-5 rotate-3 rounded-xl bg-[#2546F5] px-4 py-3 text-white shadow-[0_30px_60px_-30px_rgba(37,70,245,0.8)]">
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#F9D7E2]">
          Block balance
        </p>
        <p className="text-lg font-semibold">8 of 10 hrs</p>
      </div>

      {/* floating payout chip */}
      <div className="absolute -bottom-5 -left-3 -rotate-2 rounded-xl bg-white px-4 py-3 shadow-[0_30px_60px_-30px_rgba(12,12,14,0.45)] ring-1 ring-neutral-200">
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-400">
          In your bank
        </p>
        <p className="text-[13px] font-semibold text-neutral-900">
          Tomorrow · £612
        </p>
      </div>
    </div>
  );
}

/* ----------------------------- 3 · progress ------------------------------- */

function ReadyRing({ pct }: { pct: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden>
      <circle cx="32" cy="32" r={r} fill="none" stroke="#F9D7E2" strokeWidth="8" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="#2546F5"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct / 100)}
      />
    </svg>
  );
}

export function ProgressTree() {
  const skills: { name: string; status: string; tone: string }[] = [
    { name: "Roundabouts", status: "Test-ready", tone: "ready" },
    { name: "Dual carriageways", status: "Confident", tone: "good" },
    { name: "Manoeuvres", status: "Improving", tone: "mid" },
    { name: "Independent driving", status: "Needs practice", tone: "low" },
  ];
  const toneClass: Record<string, string> = {
    ready: "bg-[#2546F5] text-white",
    good: "bg-[#2546F5]/12 text-[#2546F5]",
    mid: "bg-[#F9D7E2] text-[#2546F5]",
    low: "bg-neutral-100 text-neutral-500",
  };
  return (
    <PhoneFrame rotate="-rotate-2">
      <PhoneHeader chip="Tom Reed" />
      <div className="flex-1 px-4 py-4">
        <div className="flex items-center gap-4 rounded-xl bg-white px-4 py-4 ring-1 ring-neutral-200">
          <ReadyRing pct={72} />
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
              Test-ready
            </p>
            <p className="text-2xl font-semibold text-neutral-900">72%</p>
            <p className="text-[11px] text-neutral-400">DVSA syllabus</p>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {skills.map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 ring-1 ring-neutral-200"
            >
              <span className="font-medium text-neutral-900">{s.name}</span>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${toneClass[s.tone]}`}
              >
                {s.status}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-3 px-1 text-[11px] text-neutral-400">
          Updated after every lesson — and Tom sees it too.
        </p>
      </div>
      <PhoneFooter label="Progress · Driive" />
    </PhoneFrame>
  );
}

/* ---------------------------- 4 · mock test ------------------------------- */

export function MockTestCard() {
  const faults: { cat: string; minors: number }[] = [
    { cat: "Junctions", minors: 1 },
    { cat: "Mirrors", minors: 2 },
    { cat: "Move off", minors: 0 },
    { cat: "Positioning", minors: 1 },
  ];
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-xl bg-white p-6 shadow-[0_40px_90px_-40px_rgba(12,12,14,0.4)] ring-1 ring-neutral-200/70">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
              DL25-style mock
            </p>
            <p className="mt-1 text-lg font-semibold tracking-tight text-neutral-900">
              Aisha Khan
            </p>
          </div>
          <span className="rounded-full bg-[#F7F5F2] px-3 py-1.5 font-mono text-[13px] font-semibold text-neutral-900">
            38:12
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            { n: "4", l: "Minors", tone: "bg-[#2546F5]/10 text-[#2546F5]" },
            { n: "0", l: "Serious", tone: "bg-[#F9D7E2] text-[#2546F5]" },
            { n: "0", l: "Dangerous", tone: "bg-neutral-100 text-neutral-500" },
          ].map((f) => (
            <div key={f.l} className={`rounded-xl py-3 ${f.tone}`}>
              <p className="text-2xl font-semibold">{f.n}</p>
              <p className="text-[10px] font-medium uppercase tracking-[0.1em]">
                {f.l}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-1.5">
          {faults.map((f) => (
            <div
              key={f.cat}
              className="flex items-center justify-between rounded-lg bg-[#F7F5F2] px-3.5 py-2 text-[12px]"
            >
              <span className="font-medium text-neutral-700">{f.cat}</span>
              <span className="flex items-center gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full ${
                      i < f.minors ? "bg-[#2546F5]" : "bg-neutral-200"
                    }`}
                  />
                ))}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#2546F5] px-4 py-3 text-white">
          <span className="text-[13px] font-medium text-[#F9D7E2]">
            On track to pass
          </span>
          <span className="text-[13px] font-semibold">Saved to lesson</span>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- 5 · accounts ------------------------------- */

export function AccountsCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-xl bg-white p-6 shadow-[0_40px_90px_-40px_rgba(12,12,14,0.4)] ring-1 ring-neutral-200/70">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
          2025/26 tax year
        </p>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-[11px] text-neutral-400">Taxable profit</p>
            <p className="text-3xl font-semibold tracking-tight text-neutral-900">
              £28,640
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-neutral-400">Set aside</p>
            <p className="text-xl font-semibold text-[#2546F5]">£5,728</p>
          </div>
        </div>

        {/* mini cashflow bars */}
        <div className="mt-5 flex h-20 items-end gap-1.5">
          {[40, 55, 48, 62, 70, 58, 75, 68, 80, 72, 88, 84].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t bg-[#2546F5]/15"
              style={{ height: `${h}%` }}
            >
              <span
                className="block w-full rounded-t bg-[#2546F5]"
                style={{ height: `${h * 0.55}%` }}
              />
            </span>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-neutral-400">
          <span>Apr</span>
          <span>Income vs expenses</span>
          <span>Mar</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-[#F7F5F2] px-4 py-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
              Mileage
            </p>
            <p className="text-[15px] font-semibold text-neutral-900">
              9,240 mi
            </p>
            <p className="text-[11px] text-[#2546F5]">£3,560 claimed</p>
          </div>
          <div className="rounded-xl bg-[#F7F5F2] px-4 py-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
              Expenses
            </p>
            <p className="text-[15px] font-semibold text-neutral-900">£6,180</p>
            <p className="text-[11px] text-neutral-400">42 receipts</p>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -right-3 rotate-3 rounded-xl bg-[#2546F5] px-4 py-3 text-white shadow-[0_30px_60px_-30px_rgba(37,70,245,0.8)]">
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#F9D7E2]">
          Year-end
        </p>
        <p className="text-[13px] font-semibold">Export in one tap</p>
      </div>
    </div>
  );
}

/* ----------------------------- 6 · website -------------------------------- */

export function WebsiteFrame() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_40px_90px_-40px_rgba(12,12,14,0.45)] ring-1 ring-neutral-200/70">
        {/* browser chrome */}
        <div className="flex items-center gap-2 border-b border-neutral-200 bg-[#F7F5F2] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="ml-2 flex-1 rounded-full bg-white px-3 py-1 text-[11px] text-neutral-400 ring-1 ring-neutral-200">
            sophie.driive.app
          </span>
        </div>

        {/* hero strip */}
        <div className="bg-[#2546F5] px-6 py-6 text-white">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#F9D7E2]">
            Manual lessons · Croydon
          </p>
          <p className="mt-1.5 text-xl font-semibold leading-tight">
            Pass with Sophie.
            <br />
            Calm, patient, local.
          </p>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#2546F5]">
              Book a lesson
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white">
              £36 / hr
            </span>
          </div>
        </div>

        {/* enquiry form */}
        <div className="px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
            Enquire
          </p>
          <div className="mt-2.5 space-y-2">
            <div className="rounded-lg bg-[#F7F5F2] px-3.5 py-2.5 text-[12px] text-neutral-500">
              Jordan Miles
            </div>
            <div className="rounded-lg bg-[#F7F5F2] px-3.5 py-2.5 text-[12px] text-neutral-500">
              07700 900 812 · CR0
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[#2546F5] px-3.5 py-2.5 text-[12px] font-semibold text-white">
              Send enquiry
              <span aria-hidden>→</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -right-3 -top-4 rotate-3 rounded-xl bg-white px-4 py-3 shadow-[0_30px_60px_-30px_rgba(12,12,14,0.45)] ring-1 ring-neutral-200">
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-400">
          New enquiry
        </p>
        <p className="text-[13px] font-semibold text-neutral-900">
          Straight to your inbox
        </p>
      </div>
    </div>
  );
}
