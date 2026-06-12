/** Pro pricing — money is integer pence, never floats. */
export const PRO_MONTHLY_PENCE = 1199;
export const PRO_ANNUAL_PENCE = 11990;

/** Founding-instructor price, locked in forever. Annual = 10× monthly (two months free). */
export const FOUNDERS_MONTHLY_PENCE = 599;
export const FOUNDERS_ANNUAL_PENCE = 5990;

/** Annual plans expressed as a per-month price (rounded to the penny). */
export const PRO_ANNUAL_MONTHLY_EQUIV_PENCE = Math.round(PRO_ANNUAL_PENCE / 12);
export const FOUNDERS_ANNUAL_MONTHLY_EQUIV_PENCE = Math.round(
  FOUNDERS_ANNUAL_PENCE / 12,
);

export function formatPounds(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

export const FREE_INCLUDED = [
  "Smart Diary with booking requests and open-slot offers",
  "Pupil Hub with notes, history and credit balances",
  "Card payments, prepaid blocks and next-day payouts",
  "DVSA-aligned progress tracking per pupil",
  "Enquiries inbox with a shareable form",
  "Accounts: income, expenses, mileage and tax estimate",
  "Calendar sync with Google, Apple and Outlook",
  "Guardian view for parents — no app needed",
];

export const PRO_INCLUDED = [
  "Everything in Free, with unlimited pupils",
  "DL25-style mock tests, marked live in the car",
  "Route sketches and doodles over a live map",
  "Lesson resources and debriefs pupils keep",
  "Your own website at yourname.driive.app",
  "Enquiry form on your site, feeding your pipeline",
];
