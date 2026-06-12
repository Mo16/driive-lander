export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
  readingTime: string;
  sections: { heading?: string; paragraphs: string[] }[];
};

export const POSTS: Post[] = [
  {
    slug: "why-were-building-driive",
    title: "Why we're building Driive",
    description:
      "Driving instructors run real businesses on texts, paper diaries and bank transfers. Driive exists to take the admin off the passenger seat.",
    date: "2026-05-04",
    dateLabel: "4 May 2026",
    readingTime: "4 min read",
    sections: [
      {
        paragraphs: [
          "Talk to any driving instructor about their week and the lessons are the easy part. The hard part is everything around them: the reminder texts at 9pm, the reschedule negotiations, the chasing of £35 here and £70 there, the paper diary that only one person can read.",
          "An instructor teaching 30 hours a week is running a business with dozens of active customers, recurring appointments, payments, progress records and a waiting list — usually managed across a phone's messages app, a physical diary and memory.",
        ],
      },
      {
        heading: "The admin tax",
        paragraphs: [
          "We kept hearing the same number in different forms: somewhere between five and ten hours a week on admin. That is a full working day, unpaid, every week — spent on work a system should be doing.",
          "Worse than the time is the leakage. A no-show that was never charged. A cancellation that left a two-hour hole in the day. A pupil who quietly owes for three lessons because nobody likes sending the awkward message.",
        ],
      },
      {
        heading: "What Driive does about it",
        paragraphs: [
          "Driive is the [smart diary](/features/smart-diary), the [card payments and prepaid blocks](/features/payments), the [DVSA progress records](/features/progress) and the [books](/features/accounts) in one place — built around how instructors actually work: on the road, between lessons, from a phone.",
          "Pupils request the gaps you actually have. Prepaid blocks burn only when a lesson is completed, so balances are always right. Lessons land in everyone's calendar. A cancelled slot is offered to your pupils in one tap. Progress is tracked against the DVSA syllabus, so test-readiness is a record, not a feeling.",
        ],
      },
      {
        heading: "Where we are",
        paragraphs: [
          "We are building with a small group of UK instructors and opening access in waves from the [waitlist](/waitlist). If you teach, and you are tired of running your business from a messages app, we would like you in early — your feedback will shape what ships.",
        ],
      },
    ],
  },
  {
    slug: "true-cost-of-no-shows",
    title: "The true cost of no-shows for driving instructors",
    description:
      "Two missed lessons a week is over £3,600 a year in quiet losses. Here is the maths, and the three changes that stop it.",
    date: "2026-05-18",
    dateLabel: "18 May 2026",
    readingTime: "5 min read",
    sections: [
      {
        paragraphs: [
          "No-shows rarely feel like a business problem in the moment. A pupil texts an hour before, something has come up, you shrug and get a coffee. But the maths over a year is brutal.",
          "Take a typical rate of £35 an hour. Two lost hours a week — one late cancellation, one no-show — is £70. Over a 52-week year, that is £3,640 of income that simply evaporated, before counting the fuel spent getting to a pick-up that never happened.",
        ],
      },
      {
        heading: "Why polite chasing doesn't fix it",
        paragraphs: [
          "Most instructors respond with reminder texts and a cancellation policy nobody enforces. Both rely on willpower at the worst possible moment: enforcing a fee means an awkward conversation with someone you will sit next to for the next six months.",
          "The fix is structural, not personal. The cost of cancelling has to exist before the lesson, and the empty slot has to be worth something to someone else.",
        ],
      },
      {
        heading: "Three changes that work",
        paragraphs: [
          "First, get paid before the lesson. [Prepaid blocks](/features/payments) mean the hours are already bought — attendance stops being optional and your cancellation policy enforces itself, no awkward message required.",
          "Second, put the lesson in their calendar. A booking that [lives in the pupil's own phone calendar](/features/smart-diary), with a reminder set, removes the honest forgetfulness that causes most missed lessons.",
          "Third, offer empty slots to your pupils. When a gap opens, every pupil should hear about it within minutes — a cancellation becomes a reshuffle, not a loss.",
        ],
      },
      {
        paragraphs: [
          "Driive does all three: prepaid blocks and card payments, calendar invites with built-in reminders, and one-tap open-slot offers the moment a gap appears. [Join the waitlist](/waitlist) and that £3,640 stays in the business, where it belongs.",
        ],
      },
    ],
  },
  {
    slug: "automate-instructor-admin",
    title: "Five admin jobs every driving instructor should automate",
    description:
      "Reminders, payment tracking, reschedules, progress notes and cancellation refills — the five jobs a system should be doing for you.",
    date: "2026-06-01",
    dateLabel: "1 June 2026",
    readingTime: "4 min read",
    sections: [
      {
        paragraphs: [
          "Good automation is not about replacing the instructor — it is about removing the jobs that never needed a human in the first place. These five eat the most hours for the least return.",
        ],
      },
      {
        heading: "1. Lesson reminders",
        paragraphs: [
          "Typing the same message every evening is robot work. When every lesson [lands in the pupil's own calendar](/features/smart-diary) with the time, duration and pick-up point — and moves when the lesson moves — no-shows fall and the evening texting stops.",
        ],
      },
      {
        heading: "2. Payment tracking",
        paragraphs: [
          "The most avoided message in the industry is 'just checking about Tuesday's payment'. Sell [prepaid blocks or let pupils pay by card](/features/payments) in the app — every balance stays right to the penny, and nobody has to send the awkward text.",
        ],
      },
      {
        heading: "3. Reschedules",
        paragraphs: [
          "A reschedule by text is a ten-message negotiation. A booking request against live availability is one tap: the pupil picks from gaps you actually have, you approve it, and the diary and calendars update themselves.",
        ],
      },
      {
        heading: "4. Progress notes",
        paragraphs: [
          "Thirty seconds of structured notes at the end of each lesson beats trying to remember three weeks later. [Track against the DVSA syllabus](/features/progress) and test-readiness becomes a record you can show, not a guess.",
        ],
      },
      {
        heading: "5. Filling cancellations",
        paragraphs: [
          "Somebody on your books wants that Thursday 2pm. The moment a slot opens, offer it to all your pupils in one tap — by the time you have finished the current lesson, the gap is usually gone.",
          "Each of these is built into Driive. [Join the waitlist](/waitlist) and get your evenings back.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
