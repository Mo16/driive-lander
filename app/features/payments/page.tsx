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
import { PageIntro, CtaSection, FaqSection, type Faq } from "@/components/sections";
import { PaymentOrbit } from "@/components/payment-orbit";

const maybeFeature = getFeature("payments");
if (!maybeFeature) throw new Error("payments missing from data/features.ts");
const feature = maybeFeature;
const PATH = "/features/payments";

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

const Card = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20M6 15h4" />
  </svg>
);
const Link2 = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
  </svg>
);
const Bank = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <path d="M3 9 12 4l9 5M4 9v9m4-9v9m8-9v9m4-9v9M3 20h18" />
  </svg>
);
const Shield = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <path d="M12 3 5 6v6c0 4 3 6.5 7 8 4-1.5 7-4 7-8V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const Lock = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <rect x="4" y="11" width="16" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);
const Bolt = ({ className = "" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} aria-hidden {...stroke}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>
);

/* --------------------------------------------------------------------------
   1 · MONEY DASHBOARD — a CSS rebuild of the instructor Money tab: the two
   headline figures, an unpaid lesson with its record-or-link actions, and the
   next-payout card. No screenshots, per CLAUDE.md.
-------------------------------------------------------------------------- */

const MONEY_STATS = [
  { value: "£2,840", label: "Income this month" },
  { value: "£243", label: "Outstanding", owed: true },
] as const;

function MoneyDashboard() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_40px_90px_-45px_rgba(12,12,14,0.3)] sm:p-7">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-neutral-900">Your money</p>
        <span className="rounded-full bg-[#2546F5]/10 px-2.5 py-1 text-[11px] font-semibold text-[#2546F5]">
          2026–27 tax year
        </span>
      </div>

      {/* headline figures */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {MONEY_STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-neutral-50 p-4">
            <p
              className={`text-2xl font-semibold tracking-tight ${
                "owed" in stat && stat.owed ? "text-rose-500" : "text-neutral-900"
              }`}
            >
              {stat.value}
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-neutral-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* unpaid lesson + actions */}
      <div className="mt-3 rounded-xl border border-neutral-200 p-4">
        <div className="flex items-center gap-3">
          <Image
            src="https://randomuser.me/api/portraits/women/65.jpg"
            alt="Maya Thompson"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-neutral-900">£38.00</p>
            <p className="truncate text-xs text-neutral-400">
              Maya Thompson · Pay as you go · 1h
            </p>
          </div>
          <span
            className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold text-[#2546F5]"
            style={{ backgroundColor: PINK }}
          >
            Unpaid
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-[13px] font-medium">
          <span className="flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-3 py-2.5 text-neutral-700">
            <Link2 />
            Payment link
          </span>
          <span className="flex items-center justify-center gap-2 rounded-full bg-[#2546F5] px-3 py-2.5 text-white">
            <Check className="h-4 w-4" />
            Mark as paid
          </span>
        </div>
      </div>

      {/* next payout */}
      <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-[#2546F5] p-5 text-white">
        <div>
          <p className="text-sm font-semibold">Next payout</p>
          <p className="mt-0.5 text-xs text-white/70">In your bank tomorrow</p>
        </div>
        <span className="shrink-0 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-[#2546F5]">
          £342.00
        </span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   2 · CREDIT LEDGER — the pupil's prepaid block as a credit balance that
   burns on lesson completion, never on booking. Mirrors the app's derived
   credit (hours/minutes), to the penny.
-------------------------------------------------------------------------- */

const CREDIT_ROWS = [
  { label: "Lesson completed · Tue 10 Jun", delta: "−2h", tone: "burn" as const },
  { label: "Lesson completed · Thu 5 Jun", delta: "−2h", tone: "burn" as const },
  { label: "10-hour block purchased", delta: "+10h", tone: "add" as const },
];

function CreditLedger() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_40px_90px_-45px_rgba(12,12,14,0.3)] sm:p-7">
      {/* balance */}
      <div className="rounded-xl bg-[#2546F5] p-5 text-white">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-white/70">Maya&apos;s credit</p>
            <p className="text-3xl font-semibold tracking-tight">6h left</p>
          </div>
          <p className="text-xs font-medium text-[#F9D7E2]">
            10h block · £304 paid
          </p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-[#F9D7E2]" style={{ width: "60%" }} />
        </div>
        <p className="mt-2 text-[11px] text-white/60">
          4 hours delivered · 6 hours remaining
        </p>
      </div>

      {/* ledger */}
      <div className="mt-4 space-y-2">
        {CREDIT_ROWS.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-3 rounded-xl bg-neutral-50 px-4 py-3"
          >
            <p className="truncate text-sm font-medium text-neutral-700">
              {row.label}
            </p>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                row.tone === "add"
                  ? "bg-[#22C55E]/10 text-[#16A34A]"
                  : "bg-neutral-900 text-white"
              }`}
            >
              {row.delta}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 flex items-center gap-1.5 rounded-xl bg-[#F0EEE7] px-4 py-3 text-xs font-medium text-neutral-500">
        <Bolt className="h-3.5 w-3.5 text-[#2546F5]" />
        Hours burn only when a lesson is completed — never on booking.
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------------
   3 · PAY SHEET — the pupil's in-app payment sheet: pick the lessons to pay,
   pay the sum in one tap. Mirrors the native Stripe PaymentSheet flow where
   "due now" rows are pre-selected and "pay ahead" rows are optional.
-------------------------------------------------------------------------- */

type PayRow = {
  pupilLabel: string;
  when: string;
  amount: string;
  checked: boolean;
  group: "due" | "ahead";
};

const PAY_ROWS: PayRow[] = [
  { pupilLabel: "Lesson · Tue 16 Jun · 2h", when: "Due now", amount: "£64.00", checked: true, group: "due" },
  { pupilLabel: "Lesson · Mon 8 Jun · 1h", when: "Due now", amount: "£38.00", checked: true, group: "due" },
  { pupilLabel: "Lesson · Fri 20 Jun · 2h", when: "Pay ahead", amount: "£64.00", checked: false, group: "ahead" },
];

function PaySheet() {
  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_90px_-40px_rgba(12,12,14,0.5)]">
      {/* sheet grabber */}
      <div className="flex justify-center pt-3">
        <span className="h-1.5 w-10 rounded-full bg-neutral-200" />
      </div>

      <div className="px-5 pb-6 pt-4">
        <p className="text-lg font-semibold tracking-tight text-neutral-900">
          Pay for lessons
        </p>
        <p className="mt-0.5 text-sm text-neutral-400">
          Choose what to pay — settle it in one go.
        </p>

        <div className="mt-5 space-y-2.5">
          {PAY_ROWS.map((row) => (
            <div
              key={row.pupilLabel}
              className={`flex items-center gap-3 rounded-xl border p-3.5 ${
                row.checked ? "border-[#2546F5] bg-[#2546F5]/[0.04]" : "border-neutral-200"
              }`}
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-md ${
                  row.checked
                    ? "bg-[#2546F5] text-white"
                    : "border border-neutral-300 text-transparent"
                }`}
              >
                <Check className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-neutral-900">
                  {row.pupilLabel}
                </p>
                <p className="text-[11px] font-medium text-neutral-400">
                  {row.group === "due" ? (
                    <span className="text-rose-500">{row.when}</span>
                  ) : (
                    row.when
                  )}
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-neutral-900">
                {row.amount}
              </span>
            </div>
          ))}
        </div>

        {/* total */}
        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
          <p className="text-sm text-neutral-500">2 lessons selected</p>
          <p className="text-xl font-semibold tracking-tight text-neutral-900">
            £102.00
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#2546F5] py-3.5 text-sm font-semibold text-white">
          <Card />
          Pay £102.00
        </div>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-medium text-neutral-400">
          <Lock className="h-3 w-3" />
          Card &amp; Apple Pay · secured by Stripe
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   4 · PAYOUTS — Stripe Connect "online payments on", the next scheduled payout
   and a settled-payout ledger. T+1 next-day payouts, per the app.
-------------------------------------------------------------------------- */

const PAYOUT_LEDGER = [
  { label: "Mon 8 Jun", value: "£296.00", tone: "done" as const },
  { label: "Mon 1 Jun", value: "£318.00", tone: "done" as const },
];

function Payouts() {
  return (
    <div className="space-y-4">
      {/* connect status */}
      <div className="flex items-center justify-between gap-3 rounded-xl bg-white p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2546F5]/10 text-[#2546F5]">
            <Bank />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-900">
              Online payments
            </p>
            <p className="text-xs text-neutral-400">
              Connected · paid to •••• 4471
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-[#22C55E]/10 px-2.5 py-1 text-[11px] font-semibold text-[#16A34A]">
          On
        </span>
      </div>

      {/* next payout */}
      <div className="rounded-xl bg-[#2546F5] p-6 text-white">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white/70">Next payout</p>
          <span
            className="rounded-full px-3 py-1 text-[11px] font-semibold text-[#2546F5]"
            style={{ backgroundColor: PINK }}
          >
            Tomorrow
          </span>
        </div>
        <p className="mt-2 text-4xl font-semibold tracking-tight">£342.00</p>
        <p className="mt-1 text-xs text-white/60">
          5 lessons settled · lands the day after payment
        </p>
      </div>

      {/* ledger */}
      <div className="rounded-xl bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
          Recent payouts
        </p>
        <div className="mt-3 space-y-2.5">
          {PAYOUT_LEDGER.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-3"
            >
              <p className="text-sm font-medium text-neutral-700">
                Paid out · {row.label}
              </p>
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-semibold text-neutral-900">
                  {row.value}
                </span>
                <span className="rounded-full bg-[#22C55E]/10 px-2 py-0.5 text-[10px] font-semibold text-[#16A34A]">
                  Paid out
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   5 · REFUND ROW — a pupil refunding an unused payment before it pays out,
   then the dispute fallback once money has moved.
-------------------------------------------------------------------------- */

function RefundCard() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_40px_90px_-45px_rgba(12,12,14,0.3)]">
      <div className="flex items-center gap-2 border-b border-neutral-100 px-5 py-3.5">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#2546F5]/10 text-[#2546F5]">
          <Shield className="h-3.5 w-3.5" />
        </span>
        <p className="text-sm font-semibold text-neutral-900">Maya&apos;s payment</p>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3 rounded-xl bg-neutral-50 px-4 py-3.5">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-900">£64.00</p>
            <p className="text-xs text-neutral-400">
              Lesson · Fri 20 Jun · not yet paid out
            </p>
          </div>
          <span
            className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold text-[#2546F5]"
            style={{ backgroundColor: PINK }}
          >
            Refundable
          </span>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2 rounded-full border border-neutral-200 py-3 text-sm font-medium text-neutral-700">
          <Arrow className="rotate-180" />
          Refund to card
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-[#F0EEE7] px-4 py-3">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2546F5]" />
          <p className="text-xs leading-relaxed text-neutral-500">
            Once a lesson has paid out, refunds go through a proper dispute flow
            — evidence on both sides, settled fairly.
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   6 · KEEPS-ITSELF tiles — what the money side writes back automatically.
-------------------------------------------------------------------------- */

const KEEPS_ITSELF: { title: string; body: string; href: string }[] = [
  {
    title: "Balances on every profile",
    body: "Credit, what's owed and what's been paid land on the pupil's profile to the penny — derived from real lessons, never typed in by hand.",
    href: "/features/pupil-hub",
  },
  {
    title: "Colour-coded in the diary",
    body: "Paid, unpaid and block-credit lessons each carry their colour in the diary, so who owes what is visible from across the room.",
    href: "/features/smart-diary",
  },
  {
    title: "Straight into your accounts",
    body: "Every card payment and marked-paid lesson posts to your income ledger, categorised and dated, ready for self-assessment.",
    href: "/features/accounts",
  },
];

/* --------------------------------- page ---------------------------------- */

export default function PaymentsPage() {
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
        title="Less payment admin. Faster cash in the bank."
        lede={feature.lede}
      >
        <div className="mt-8 flex flex-wrap gap-2.5">
          {[
            "Card payments",
            "Automatic allocation",
            "Lesson credits",
            "Payouts",
            "Receipts",
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
          <MoneyDashboard />
          <div>
            <Eyebrow>Why instructors switch</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
              Know exactly where your money is.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-neutral-600">
              <p>
                Income this month, what&apos;s still outstanding, and the payout
                landing in your bank tomorrow — all on one screen, all derived
                from real lessons. No spreadsheet to reconcile on Sunday night,
                no guessing who still owes you for last Tuesday.
              </p>
              <ul className="space-y-3.5 pt-2 text-base font-medium text-neutral-900">
                {[
                  "Card payments in the app — pupils pay in a tap",
                  "Cash or transfer? Mark the lesson paid in a tap",
                  "Send a payment link to anyone not on the app",
                  "Every figure derived live, never typed in by hand",
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

      {/* Prepaid blocks */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
        <div className={CONTAINER}>
          <Eyebrow>Prepaid blocks</Eyebrow>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-neutral-900">
                Blocks that
                <br />
                cannot go wrong.
              </h2>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-600">
                Sell a ten-hour block and Driive keeps the balance for you. Hours
                burn only when a lesson is{" "}
                <span className="font-semibold text-neutral-900">completed</span>{" "}
                — never when it&apos;s booked — so the maths can never drift, and
                the pupil always sees exactly what is left.
              </p>
              <ul className="mt-8 space-y-3.5 text-base font-medium text-neutral-900">
                {[
                  "Balance tracked to the penny, derived not stored",
                  "A cancelled prepaid lesson returns its hours automatically",
                  "Pupils watch their credit count down in their own app",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 text-[#2546F5]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <CreditLedger />
          </div>
        </div>
      </section>

      <Road from={CREAM} to={BLUE} />

      {/* Pupils pay by card */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: BLUE }}>
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-2`}>
          <div>
            <Eyebrow tone="light">Card in the app</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#F9D7E2]">
              Pupils pay by
              <br />
              card, in a tap.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#F9D7E2]/90">
              Pupils settle one lesson or several in a single payment, straight
              from their side of the app — card or Apple Pay, secured by Stripe.
              What&apos;s due now is pre-selected; they can pay ahead for the
              week if they like.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#F9D7E2]/90">
              Not on the app? Send a{" "}
              <span className="font-semibold">payment link</span> by message
              instead, or mark a cash or transfer lesson paid yourself. However
              the money arrives, the{" "}
              <Link
                href="/features/pupil-hub"
                className="font-semibold underline underline-offset-2"
              >
                pupil&apos;s balance
              </Link>{" "}
              stays right.
            </p>
          </div>
          <PaySheet />
        </div>
      </section>

      <Road from={BLUE} to="#FFFFFF" />

      {/* Every way they pay — the methods orbit */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <PaymentOrbit />
        </div>
      </section>

      <Road from="#FFFFFF" to={PINK} />

      {/* Payouts the next day */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: PINK }}>
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-2`}>
          <div className="order-2 lg:order-1">
            <Payouts />
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow>Next-day payouts</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#2546F5]">
              In your bank
              <br />
              the next day.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#2546F5]/90">
              Turn on online payments once — a quick, Stripe-hosted setup
              pre-filled from your details — and card money lands in your bank
              account the day after it settles. Next-day payouts, not weekly
              batches, so cash flow stops being a waiting game.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#2546F5]/90">
              Card payments carry a small per-transaction fee — and it&apos;s{" "}
              <Link
                href="/pricing"
                className="font-semibold underline underline-offset-2"
              >
                lower on Pro
              </Link>
              . Recording a cash or bank-transfer lesson is always free.
            </p>
          </div>
        </div>
      </section>

      <Road from={PINK} to="#FFFFFF" />

      {/* Refunds & disputes */}
      <section className="bg-white py-20 lg:py-28">
        <div className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
          <RefundCard />
          <div>
            <Eyebrow>Refunds &amp; disputes</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
              Fair both ways, no awkward standoffs.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-neutral-600">
              <p>
                A pupil can refund an unused payment themselves, any time before
                it has paid out — clean and instant, no message needed. Once the
                money has moved, anything contested goes through a proper dispute
                flow with evidence on both sides and a fair resolution.
              </p>
              <p>
                No chasing refunds over text, no awkward standoff over £35 — the
                rules are the same for everyone, and the record speaks for
                itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Road from="#FFFFFF" to={CREAM} />

      {/* The money sorts itself */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <Eyebrow>Always reconciled</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
              You teach. The money sorts itself.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Payments aren&apos;t a separate ledger you keep topped up. Every
              payment, block and payout flows straight into the rest of Driive —
              so the numbers are right everywhere, all the time.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {KEEPS_ITSELF.map((tile) => (
              <Link
                key={tile.title}
                href={tile.href}
                className="group rounded-xl bg-white p-7 shadow-[0_25px_60px_-35px_rgba(12,12,14,0.25)] transition hover:-translate-y-0.5"
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

      <CtaSection source="feature-payments" />
    </>
  );
}
