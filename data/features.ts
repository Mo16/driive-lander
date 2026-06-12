export type Feature = {
  slug: string;
  name: string;
  tagline: string;
  lede: string;
  metaTitle: string;
  metaDescription: string;
  benefits: { title: string; body: string }[];
  /** Slugs shown in the "Works with" grid — curated so every feature
      receives inbound links from related pages, not just the first three. */
  related: [string, string, string];
};

export const FEATURES: Feature[] = [
  {
    slug: "smart-diary",
    name: "Smart Diary",
    tagline: "Your week, sorted before it starts.",
    lede: "Pupils request the gaps you actually have, open slots are offered to your pupils in one tap, and every lesson lands in the calendar you already use.",
    metaTitle: "Smart Diary — Driving instructor diary software",
    metaDescription:
      "A diary built for UK driving instructors. Booking requests against your real availability, one-tap open-slot offers, and sync with Google, Apple and Outlook calendars.",
    benefits: [
      {
        title: "Pupils request the slots you actually have",
        body: "Set your working pattern once — hours, breaks, days off and travel time between pick-ups. Booking requests only ever land in genuine gaps, and you approve or decline each one with a tap.",
      },
      {
        title: "Open slots fill themselves",
        body: "When a cancellation leaves a hole in your day, offer the slot to your pupils in one tap. The first to claim it gets it, the diary updates, and a quiet Thursday gap stops meaning lost income.",
      },
      {
        title: "Synced to the calendar you already use",
        body: "Every lesson appears in Google, Apple or Outlook Calendar with the pick-up point attached, and moves the moment a lesson moves. Pupils get calendar invites too, so the time lives in both diaries.",
      },
    ],
    related: ["pupil-hub", "payments", "lesson-tools"],
  },
  {
    slug: "pupil-hub",
    name: "Pupil Hub",
    tagline: "Every learner, one profile.",
    lede: "Contact details, lesson history, credit balance, notes and test dates in one place — no more scrolling through texts to find anything.",
    metaTitle: "Pupil Hub — Pupil management for driving instructors",
    metaDescription:
      "One profile per pupil: contact details, lesson history, notes, credit balances and test dates. Pupil management software built for UK driving instructors.",
    benefits: [
      {
        title: "The full picture in one tap",
        body: "Open a pupil and see everything: upcoming lessons, their [credit balance](/features/payments) to the penny, what they owe, your notes from last time, and their theory and practical test dates.",
      },
      {
        title: "Pupils join with a code",
        body: "Share your join code and pupils connect themselves from their own side of the app — you just approve the request. They get their lessons, progress and payments; you get a clean record from day one.",
      },
      {
        title: "Parents stay in the loop",
        body: "Add a parent or guardian to any pupil and they get a private, read-only view of lessons, progress and payments on the web — no app needed, and they can step away whenever they like.",
      },
    ],
    related: ["progress", "payments", "enquiries"],
  },
  {
    slug: "payments",
    name: "Payments",
    tagline: "Balances right to the penny.",
    lede: "Card payments in the app, prepaid blocks that track themselves, and payouts in your bank the next day.",
    metaTitle: "Payments — Card payments and blocks for driving instructors",
    metaDescription:
      "Take card payments and sell prepaid blocks as a UK driving instructor. Hours burn on completion, balances are always right, and payouts land the next day.",
    benefits: [
      {
        title: "Blocks that cannot go wrong",
        body: "Sell 10-hour blocks and Driive keeps the balance — hours burn only when a lesson is completed, never on booking, so the maths can never drift and pupils always see exactly what is left.",
      },
      {
        title: "Card payments, payouts the next day",
        body: "Pupils pay by card in the app — one lesson or several in a single payment — and the money lands in your bank account the day after it settles. Cash or bank transfer? Mark the lesson paid in a tap.",
      },
      {
        title: "Refunds and disputes, handled fairly",
        body: "A pupil can refund an unused payment themselves before it pays out, and anything later goes through a proper dispute flow with evidence on both sides. No awkward standoffs over £35.",
      },
    ],
    related: ["accounts", "pupil-hub", "smart-diary"],
  },
  {
    slug: "progress",
    name: "Progress",
    tagline: "DVSA syllabus, tracked.",
    lede: "Mark skills off lesson by lesson and know exactly who is test-ready before you book the test.",
    metaTitle: "Progress — DVSA syllabus tracking per pupil",
    metaDescription:
      "Track every pupil against the DVSA syllabus. Mark skills from introduced to test-ready, and back the test conversation with evidence rather than gut feel.",
    benefits: [
      {
        title: "Every skill, every pupil",
        body: "Roundabouts, dual carriageways, manoeuvres, independent driving — each pupil has the full syllabus with a clear status for every skill, from introduced and needs practice through to test-ready.",
      },
      {
        title: "Pupils see it too",
        body: "Learners watch their own progress build in the app after every lesson. Seeing how close they are to test-ready keeps them motivated — and makes the next block an easy decision.",
      },
      {
        title: "Test-readiness you can defend",
        body: "When a pupil asks about booking the test, the answer is a record built across real lessons, not a feeling. Pair it with a [DL25-style mock test](/features/lesson-tools) and the conversation gets easier for both of you.",
      },
    ],
    related: ["lesson-tools", "pupil-hub", "smart-diary"],
  },
  {
    slug: "lesson-tools",
    name: "Lesson Tools",
    tagline: "Mock tests, marked like the real thing.",
    lede: "DL25-style mock tests, route sketches over a live map, and a lesson debrief your pupils keep — the teaching toolkit, in the car.",
    metaTitle: "Lesson Tools — Mock tests and debriefs for instructors",
    metaDescription:
      "Run DL25-style mock tests marked against DVSA fault categories, sketch routes over a live map, and share lesson resources — premium teaching tools from Driive.",
    benefits: [
      {
        title: "DL25-style mock tests",
        body: "Mark a mock test live as you drive — minors, serious and dangerous faults against the DVSA categories, with a timer running. The result saves to the lesson, so progress towards the pass standard is on record.",
      },
      {
        title: "Draw the lesson",
        body: "Sketch a junction on a whiteboard or draw straight over a live map of the route you just drove. Snapshots save into the lesson, so 'remember that roundabout' becomes a picture, not an argument.",
      },
      {
        title: "A debrief pupils keep",
        body: "Mock test results, route sketches and any resources you upload — theory sheets, exercises, diagrams — all land in the lesson debrief in [the pupil's app](/features/pupil-hub), ready to revisit before the next drive.",
      },
    ],
    related: ["progress", "smart-diary", "website"],
  },
  {
    slug: "accounts",
    name: "Accounts & Tax",
    tagline: "Your books, done from the car.",
    lede: "Income, expenses, mileage and a running tax estimate — recorded as you teach, ready for self-assessment.",
    metaTitle: "Accounts & Tax — Bookkeeping for driving instructors",
    metaDescription:
      "Built-in accounts for UK driving instructors: income ledger, expenses, per-car mileage, tax pot and a year-end review ready for self-assessment.",
    benefits: [
      {
        title: "Income that records itself",
        body: "Every lesson and [card payment](/features/payments) lands in your ledger automatically, categorised and dated. See profit by month or tax year without reconstructing anything in a spreadsheet on Sunday night.",
      },
      {
        title: "Mileage and expenses, per car",
        body: "Run more than one car, each with its own transmission and mileage log — simplified or actual cost method. Fuel, insurance, franchise fees and CPD all recorded in seconds, receipts attached.",
      },
      {
        title: "Year-end without the shoebox",
        body: "A running tax estimate and tax-pot percentage through the year, then a year-end review that pulls it all together — export clean records for your accountant or self-assessment in one tap.",
      },
    ],
    related: ["payments", "smart-diary", "website"],
  },
  {
    slug: "website",
    name: "Your Website",
    tagline: "yourname.driive.app — live in minutes.",
    lede: "A polished booking site on your own Driive subdomain, with an enquiry form that feeds new pupils straight into your pipeline.",
    metaTitle: "Your Website — A booking site for driving instructors",
    metaDescription:
      "Publish a professional driving-school website at yourname.driive.app: services, prices, gallery, reviews and an enquiry form — no developer needed.",
    benefits: [
      {
        title: "A real site, no developer",
        body: "Pick your address, write a headline, add your services, prices, photos and brand colour — and publish. Changes save as you type, so the site is never out of date.",
      },
      {
        title: "Show what wins pupils",
        body: "Your areas covered, lesson prices, the cars you teach in and your reviews, all on one page that looks right on every phone. Searching learners see a professional school, not a Facebook page.",
      },
      {
        title: "Enquiries become pupils",
        body: "The built-in enquiry form drops every lead into your [enquiries inbox](/features/enquiries), with their details already filled in. When they are ready to start, convert them to a pupil in a tap.",
      },
    ],
    related: ["enquiries", "accounts", "lesson-tools"],
  },
  {
    slug: "enquiries",
    name: "Enquiries",
    tagline: "Turn interest into booked lessons.",
    lede: "Every new-pupil lead in one tidy inbox — qualified, followed up and converted without losing anyone in your messages.",
    metaTitle: "Enquiries — Lead management for driving instructors",
    metaDescription:
      "Capture every new-pupil enquiry in one inbox. A shareable enquiry form, lead statuses and one-tap conversion to pupil — built for UK driving instructors.",
    benefits: [
      {
        title: "One inbox for every lead",
        body: "Enquiries from [your website](/features/website), your shareable form or a phone call all land in one place, with a status that tells you exactly where each one stands — new, contacted, awaiting reply, converted.",
      },
      {
        title: "A form you can put anywhere",
        body: "Share your enquiry form as a link or embed it on an existing site. Learners fill in their details once, and nothing arrives as a half-readable voicemail again.",
      },
      {
        title: "Convert in a tap",
        body: "When a lead is ready to start, one tap turns the enquiry into a pupil — details carried across, first lesson ready to book. No lead quietly forgotten in a messages app.",
      },
    ],
    related: ["website", "pupil-hub", "smart-diary"],
  },
];

export function getFeature(slug: string) {
  return FEATURES.find((f) => f.slug === slug);
}
