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
import { PageIntro, CtaSection, FaqSection, type Faq } from "@/components/sections";

const maybeFeature = getFeature("smart-diary");
if (!maybeFeature) throw new Error("smart-diary missing from data/features.ts");
const feature = maybeFeature;
const PATH = "/features/smart-diary";

export const metadata = meta(feature.metaTitle, feature.metaDescription, PATH);

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

const PATTERN_TILES = [
  {
    label: "Working hours",
    value: "Mon – Fri · 09:00 – 17:00",
    note: "Different hours for every day of the week, weekends optional.",
  },
  {
    label: "Recurring breaks",
    value: "School run · 15:00 – 15:45",
    note: "Lunch, prayer, the school run — repeats weekly, booked around automatically.",
  },
  {
    label: "Travel buffer",
    value: "15 min between pick-ups",
    note: "Back-to-back lessons without the sprint across town.",
  },
  {
    label: "Days off & holidays",
    value: "Sundays + two weeks in August",
    note: "Block out a day or a fortnight in a tap — nothing can land on it.",
  },
  {
    label: "Lesson lengths & prices",
    value: "1h £38 · 1.5h £55 · 2h £70",
    note: "Pupils request in the durations you offer, priced your way.",
  },
  {
    label: "Your cars",
    value: "Manual · Automatic",
    note: "Run more than one car and the right one is attached to every lesson.",
  },
];

/* -------------------------------- sync tiles ------------------------------- */

const SYNC_TILES = [
  {
    title: "Subscribe once",
    body: "A live feed puts your whole diary inside Google, Apple or Outlook Calendar — it refreshes itself, so the calendar app you check at night is always current.",
  },
  {
    title: "Invites that follow the lesson",
    body: "Every confirmed lesson arrives as a proper calendar invite, for you and the pupil. Reschedule and the invite updates itself; cancel and it disappears.",
  },
  {
    title: "Push, the moment it changes",
    body: "Connect Google Calendar and changes land the instant they happen — approve a request at a red light and it is on your calendar before the lights change.",
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
            A smarter diary for
            <br />
            driving instructors.
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
            className="mx-auto max-w-5xl rounded-xl p-7 sm:p-10"
            style={{ backgroundColor: CREAM }}
          >
            <Image
              src="/images/features/calendar.png"
              alt="The Driive Smart Diary showing a week of colour-coded driving lessons"
              width={1254}
              height={1254}
              className="h-auto w-full rounded-xl object-contain"
            />
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
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-2`}>
          <div>
            <Eyebrow>Why instructors switch</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
              The paper diary held up — until everything else moved into your
              phone.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-neutral-600">
            <p>
              A driving instructor&apos;s diary isn&apos;t a list of meetings.
              Lessons have pick-up points, travel time between them, pupils who
              pay in prepaid blocks, and a working week with school runs and
              days off carved into it. Generic calendar apps understand none of
              that — and the paper diary can&apos;t text your pupils.
            </p>
            <p>
              The Smart Diary is built on those rules. You set your working
              pattern once — hours, recurring breaks, days off and the travel
              buffer you need between pick-ups — and everything else derives
              from it: the gaps pupils can request, the slots you can offer,
              and the free hours the diary totals up for you each week.
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
      </section>

      <Road from="#FFFFFF" to={CREAM} />

      {/* Working pattern */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
        <div className={CONTAINER}>
          <Eyebrow>Your working pattern</Eyebrow>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-neutral-900">
              Set your week once.
              <br />
              The diary defends it.
            </h2>
            <p className="text-lg leading-relaxed text-neutral-600">
              Your hours, breaks and days off aren&apos;t preferences —
              they&apos;re the boundary every booking is checked against.
              Nothing can land over your lunch, your school run or your Sunday.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PATTERN_TILES.map((tile) => (
              <div key={tile.label} className="rounded-xl bg-white p-7">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                  {tile.label}
                </p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-[#2546F5]">
                  {tile.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {tile.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Road from={CREAM} to={BLUE} />

      {/* Booking requests */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: BLUE }}>
        <div className={`${CONTAINER} grid items-center gap-14 lg:grid-cols-2`}>
          <div>
            <Eyebrow tone="light">Booking requests</Eyebrow>
            <h2 className="mt-8 text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#F9D7E2]">
              Pupils request.
              <br />
              You approve.
              <br />
              Nothing else gets in.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#F9D7E2]/90">
              From their own side of the app, pupils see only the gaps you
              genuinely have — never your breaks, never your day off. Each
              request arrives with the duration, pick-up point and a note, and
              you approve or decline it in a tap.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#F9D7E2]/90">
              Want the money first? Turn on pay-to-confirm and a requested slot
              is only held until the card payment clears — unpaid holds release
              themselves after 48 hours, so a slot is never blocked by a
              maybe.
            </p>
            <ul className="mt-8 space-y-3.5 text-base font-medium text-[#F9D7E2]">
              {[
                "Requests can only land in real gaps",
                "Approve or decline with one tap",
                "Block-funded lessons confirm instantly",
                "Pay-to-confirm holds release after 48 hours",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-semibold text-[#2546F5]"
                style={{ backgroundColor: PINK }}
              >
                CB
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-neutral-900">
                  Chloe Bennett
                </p>
                <p className="text-xs text-neutral-400">Booking request · 2h ago</p>
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
            <p className="mt-5 text-center text-xs leading-relaxed text-neutral-400">
              One tap — the diary, the pupil&apos;s app and both calendars
              update together.
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
                <p className="mt-4 text-xs leading-relaxed text-white/70">
                  Everyone else is stood down automatically — no &ldquo;sorry,
                  just gone&rdquo; texts to send.
                </p>
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
          <Eyebrow>Calendar sync</Eyebrow>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-neutral-900">
              In the calendar
              <br />
              you already use.
            </h2>
            <p className="text-lg leading-relaxed text-neutral-600">
              Driive doesn&apos;t ask you to abandon Google, Apple or Outlook
              Calendar — it feeds them. Three layers, from a simple
              subscription to instant push. Use one or all of them.
            </p>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {SYNC_TILES.map((tile, index) => (
              <div
                key={tile.title}
                className="rounded-xl border border-neutral-200 p-7"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#2546F5] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="mt-5 text-lg font-semibold tracking-tight text-neutral-900">
                  {tile.title}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-500">
                  {tile.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-neutral-200 p-5">
            <div className="flex items-center gap-3">
              <span className="h-10 w-1.5 shrink-0 rounded-full bg-[#2546F5]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-neutral-900">
                  Driving lesson — Chloe Bennett
                </p>
                <p className="truncate text-xs text-neutral-400">
                  Tue 14:00 – 16:00 · Pick-up PO5 2AB
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-neutral-200 px-3 py-1 text-[11px] font-medium text-neutral-500">
                Google Calendar
              </span>
            </div>
            <p className="mt-4 text-center text-xs leading-relaxed text-neutral-400">
              Pupils get calendar invites too — the lesson lives in both
              diaries, so &ldquo;I forgot&rdquo; stops being a reason.
            </p>
          </div>
        </div>
      </section>

      {/* Everything follows */}
      <section className="bg-[#0C0C0E] py-20 lg:py-28">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-2 lg:items-center`}>
          <div>
            <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
              Move a lesson once.
              <br />
              Everything follows.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
              Reschedule in the diary and the pupil is notified, calendar
              invites update themselves, and any block credit or payment is
              carried across — without you touching anything else.
              That&apos;s the difference between a calendar and a diary that
              runs the business.
            </p>
          </div>
          <ul className="space-y-4 text-lg font-medium text-[#F9D7E2]">
            {[
              "Pupil notified the moment a lesson moves",
              "Calendar invites update and cancel themselves",
              "Credits and refunds handled automatically",
              "Lesson history kept for progress and your accounts",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-1" />
                {item}
              </li>
            ))}
          </ul>
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
