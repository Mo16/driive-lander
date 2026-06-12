export type Feature = {
  slug: string;
  name: string;
  tagline: string;
  lede: string;
  metaTitle: string;
  metaDescription: string;
  benefits: { title: string; body: string }[];
  /** Topical Q&As rendered on the feature page and emitted as FAQPage
      JSON-LD. Answers must stand alone out of context — answer engines
      quote them without the surrounding page. */
  faqs: { q: string; a: string }[];
  /** Slugs shown in the "Works with" grid — curated so every feature
      receives inbound links from related pages, not just the first three. */
  related: [string, string, string];
};

export const FEATURES: Feature[] = [
  {
    slug: "smart-diary",
    name: "Smart Diary",
    tagline: "Your week, sorted before it starts.",
    lede: "Day, week and month views built on your real working pattern — pupils request the gaps you actually have, cancelled slots are re-offered in one tap, and every lesson lands in the calendar you already use.",
    metaTitle: "Smart Diary — Driving instructor diary & booking app",
    metaDescription:
      "The driving instructor diary that fills itself. Pupils request your real gaps, cancelled slots are re-offered in one tap, and every lesson syncs to Google, Apple and Outlook Calendar.",
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
    faqs: [
      {
        q: "How do driving instructors manage their diary?",
        a: "Most instructors run their week from a paper diary and a stream of texts, where every change means rubbing out, rewriting and re-confirming. Driive replaces that with a diary built on your real working pattern — hours, recurring breaks, days off and the travel time you need between pick-ups. Pupils request the gaps you actually have, you approve each one with a tap, and [payments](/features/payments) and pupil records update with the lesson.",
      },
      {
        q: "Can pupils book driving lessons online?",
        a: "With Driive, yes — pupils request lessons from the genuine gaps in their instructor's diary, from their own side of the app. The instructor approves or declines each request, so nothing lands in the diary without their say-so. Instructors can even require card payment before a booking is confirmed — unpaid holds release automatically after 48 hours, so no slot is ever blocked by a maybe.",
      },
      {
        q: "What happens when a pupil cancels a driving lesson?",
        a: "The slot goes back on the market instead of becoming dead time. In Driive the instructor offers the freed slot to all of their pupils — or just a few — in one tap; the first request they approve takes it, and everyone else is stood down automatically. If the lesson was prepaid, the hours return to the pupil's [credit balance](/features/payments) on their own, so the money side sorts itself too.",
      },
      {
        q: "Does Driive sync with Google, Apple and Outlook calendars?",
        a: "Yes, three ways. Subscribe once and a live feed keeps your calendar app current by itself; every confirmed lesson also arrives as a calendar invite that updates on reschedule and disappears on cancellation; and connecting Google Calendar pushes changes the moment they happen. Pupils get invites too, so the lesson lives in both diaries with the pick-up point attached.",
      },
      {
        q: "Can I control when pupils can book lessons?",
        a: "Completely. Pupils only ever see the genuine gaps in the working pattern the instructor sets — working hours, recurring breaks like the school run, days off and the travel buffer between pick-ups — and every request still needs the instructor's approval before it lands in the diary. Nothing is ever booked over a lunch break or a Sunday off.",
      },
      {
        q: "Can Driive replace my paper diary?",
        a: "That is exactly what it is built for. The Smart Diary gives you day, week and month views, colour-codes every lesson by payment status, counts your free gaps so you know what is sellable, and shows the pick-up point on each booking. Because bookings, [payments](/features/payments) and [progress](/features/progress) live in one place, a change made once updates everywhere — no rubbing out, no re-texting.",
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
    faqs: [
      {
        q: "How do driving instructors keep pupil records?",
        a: "Driive gives every learner one profile holding contact details, lesson history, credit balance, notes and theory and practical test dates — so nothing lives in a scrolled-back text thread. [Progress](/features/progress) and [payments](/features/payments) update the record automatically as you teach.",
      },
      {
        q: "How do pupils join an instructor on Driive?",
        a: "The instructor shares a join code; the pupil enters it in their own app and the instructor approves the request. Instructors can also add existing pupils themselves in minutes and invite them to connect later.",
      },
      {
        q: "Can parents follow a learner's driving lessons and progress?",
        a: "Yes. An instructor can add a parent or guardian to any pupil, giving them a private, read-only web view of lessons, progress and payments. There is no app for them to download, and they can step away whenever they like.",
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
    faqs: [
      {
        q: "How do driving instructors take card payments?",
        a: "With Driive, pupils pay by card inside the app — one lesson or several in a single payment — or through a payment link the instructor sends. Cash and bank-transfer lessons are marked paid in a tap, so [the accounts](/features/accounts) stay complete whichever way the money arrives.",
      },
      {
        q: "What is a prepaid block of driving lessons?",
        a: "A block is a bundle of lesson hours bought up front, usually at a small discount — ten hours is the classic. Driive tracks every block to the penny and burns hours only when a lesson is completed, never when it is booked, so the balance can never drift.",
      },
      {
        q: "When do instructors receive their money?",
        a: "Card payments land in the instructor's bank account the day after they settle — next-day payouts rather than weekly batches. Every payment is recorded in [Accounts & Tax](/features/accounts) automatically, so income never needs reconstructing later.",
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
    faqs: [
      {
        q: "What skills does a learner driver need before the driving test?",
        a: "The DVSA's 'Ready to Pass?' guidance sets out the skills a learner should manage independently before booking a test — junctions, roundabouts, manoeuvres, dual carriageways and independent driving among them. Driive tracks each pupil against the full syllabus, lesson by lesson. Driive is independent and not affiliated with or endorsed by the DVSA.",
      },
      {
        q: "How do you know when a pupil is ready for their driving test?",
        a: "Test-readiness is a judgement, but it should rest on evidence: a record of each skill moving from introduced to test-ready across real lessons, backed by a [DL25-style mock test](/features/lesson-tools) close to the pass standard. Driive keeps that record for every pupil, so the test conversation is built on facts rather than gut feel.",
      },
      {
        q: "Can pupils see their own driving progress?",
        a: "Yes. Pupils watch their progress build in their own side of the Driive app after every lesson. Seeing how close test-ready is keeps them motivated — and makes the next block of lessons an easy decision.",
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
    faqs: [
      {
        q: "What is a DL25 driving test report?",
        a: "The DL25 is the marking sheet used on the UK practical driving test, recording driving faults, serious faults and dangerous faults by category. Driive's mock test mode mirrors that format, so pupils sit practice tests marked the way the real one is. Driive is independent and not affiliated with or endorsed by the DVSA.",
      },
      {
        q: "How do you run a mock driving test?",
        a: "Pick a realistic test-length route, mark faults as they happen rather than coaching, and debrief at the end the way an examiner would. With Driive you mark minors, serious and dangerous faults against the DVSA categories live with a timer running, and the result saves to the lesson and the pupil's [progress record](/features/progress).",
      },
      {
        q: "What should a driving lesson debrief include?",
        a: "A good debrief covers what went well, what needs practice and one clear focus for the next lesson. In Driive the debrief lives in the pupil's app — mock test results, route sketches and any resources the instructor uploads — so it is still there when the pupil revisits it before the next drive.",
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
    faqs: [
      {
        q: "Do driving instructors need to do a Self Assessment tax return?",
        a: "Most independent UK driving instructors are self-employed, so they report income to HMRC through Self Assessment. Driive records lesson income, expenses and mileage as you teach and keeps a running tax estimate through the year — clean records for your return, though not a substitute for an accountant's advice.",
      },
      {
        q: "Can driving instructors claim mileage as an expense?",
        a: "Business mileage is one of an instructor's biggest costs, and HMRC allows it under either simplified mileage rates or actual running costs. Driive logs mileage per car and supports both methods, with receipts attached to every expense as it happens.",
      },
      {
        q: "How does Driive help at tax year end?",
        a: "Through the year Driive keeps a running tax estimate and a tax-pot percentage, so the bill is never a surprise. At year end, a review pulls income, expenses and mileage together — ready to export for your accountant or Self Assessment in one tap.",
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
    faqs: [
      {
        q: "Do driving instructors need a website?",
        a: "Learners increasingly search online before they message anyone, and a professional page — prices, areas covered, reviews — wins enquiries that a social profile alone does not. Driive Pro includes a site at yourname.driive.app, so instructors get one without paying a developer.",
      },
      {
        q: "What should a driving instructor website include?",
        a: "The things a searching learner actually checks: lesson prices, areas covered, the car and transmission they will learn in, reviews and an easy way to enquire. A Driive site covers all of those on one page, with the [enquiry form](/features/enquiries) feeding leads straight into the app.",
      },
      {
        q: "How do I get a driving school website without a developer?",
        a: "With Driive, you pick your web address, write a headline, add your services, prices, photos and brand colour, and publish — changes save as you type. There is no hosting, domain or developer to manage, and the site looks right on every phone.",
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
    faqs: [
      {
        q: "How do driving instructors get new pupils?",
        a: "Word of mouth, local search and a visible web presence bring the leads — the harder part is not losing them in voicemails and message threads. Driive captures every enquiry from [your website](/features/website) or shareable form in one inbox, each with a status, so every lead gets a reply.",
      },
      {
        q: "How should an instructor follow up a new pupil enquiry?",
        a: "Quickly and visibly — learners often enquire with more than one instructor, and the first clear reply usually wins. Driive tracks each lead through new, contacted, awaiting reply and converted, so nobody sits forgotten while you are out teaching.",
      },
      {
        q: "Can I use the enquiry form on an existing website?",
        a: "Yes. Your Driive enquiry form works as a shareable link or embedded on any site you already have, and every submission lands in the same inbox. When a lead is ready to start, one tap converts them into a pupil with their details carried across.",
      },
    ],
    related: ["website", "pupil-hub", "smart-diary"],
  },
];

export function getFeature(slug: string) {
  return FEATURES.find((f) => f.slug === slug);
}

const INLINE_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Plain-text Q&As for FAQPage JSON-LD — markdown links reduced to anchor text. */
export function featureFaqSchema(feature: Feature) {
  return feature.faqs.map((faq) => ({
    question: faq.q,
    answer: faq.a.replace(INLINE_LINK, "$1"),
  }));
}
