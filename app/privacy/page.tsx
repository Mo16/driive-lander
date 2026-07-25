import Link from "next/link";
import { meta } from "@/lib/meta";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { PageIntro, LegalDoc } from "@/components/sections";

const DESCRIPTION =
  "How the Driive website and mobile app collect, use, share and protect personal data — including location, payments and pupil records — under UK GDPR, with retention, processors and your data rights.";

export const metadata = meta(
  "Privacy policy",
  DESCRIPTION,
  "/privacy",
);

const Email = ({ to }: { to: string }) => (
  <a
    href={`mailto:${to}`}
    className="font-semibold text-[#2546F5] underline-offset-4 hover:underline"
  >
    {to}
  </a>
);

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/privacy",
            name: "Driive privacy policy",
            description: DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Privacy policy", path: "/privacy" },
          ]),
        ]}
      />

      <PageIntro
        eyebrow="Legal"
        title="Privacy policy"
        lede="Plain English first, legal precision throughout. This policy covers both the Driive website and the Driive mobile app, and explains what personal data we collect, why, who we share it with, and the rights you have over it."
      />
      <LegalDoc
        updated="25 July 2026"
        sections={[
          {
            heading: "Who we are and what this covers",
            paragraphs: [
              <>
                Driive is a trading name of Aurelo Web Studio Ltd, a company
                registered in England and Wales (Company No. 16930106) with
                its registered office at 11 Pains Road, Southsea, England,
                PO5 1HE (&ldquo;Driive&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;). For the purposes of UK data protection law,
                including the UK General Data Protection Regulation (UK GDPR)
                and the Data Protection Act 2018, Aurelo Web Studio Ltd is the
                data controller for personal data collected through this
                website and through the Driive mobile app.
              </>,
              "This policy applies to the marketing website, the Driive app for driving instructors and their pupils (including guardians of pupils), and any web admin surfaces we provide. Where an instructor uses Driive to run their own business, the instructor is a separate data controller for the pupil records they create, and we act as their processor for that content; we remain the controller for the account, technical, payment and location data described below.",
              <>
                Questions about this policy or your data can be sent to{" "}
                <Email to="privacy@driive.app" /> or posted to the registered
                office address above.
              </>,
            ],
          },
          {
            heading: "What we collect",
            paragraphs: [
              "Account and identity data: your name, email address, phone number, date of birth (used to confirm you are old enough to hold an account), password credentials, and profile, badge or vehicle photos you choose to add.",
              "Instructor business data: your teaching qualifications, vehicle and transmission details, hourly rates, block and credit packages, availability, and your driving school affiliation where relevant.",
              "Pupil and lesson data: lesson bookings, pickup and drop-off addresses, DVSA-aligned progress and skill records, lesson notes, feedback, debriefs and any documents or images attached to a lesson.",
              "Location data: when you enable it in the app, we collect precise (fine) and approximate (coarse) device location, including in the background during an active lesson, to record the route driven and to centre maps. This is described in full in the Location data section below.",
              "Payment data: when you buy credit, a block or a subscription, or an instructor takes a payment, our payment processor collects and handles card details. We receive confirmation of the transaction, amounts, payout records and limited card metadata (such as the last four digits and card brand) — we never see or store full card numbers.",
              "Communications data: in-app messages between instructors and pupils, guardian email addresses for younger pupils, correspondence you send us, and enquiry or waitlist details (email address, the page you signed up from, and the date and time).",
              "Calendar data: if you connect Google, Apple or Outlook calendar sync, we process the authorisation tokens and the calendar events needed to keep your lessons and your calendar in step.",
              "Device and technical data: device push-notification tokens, app version and device model, IP address, browser type and pages visited, and diagnostic information you submit through the in-app bug reporter (which may include a screenshot you choose to attach). This is used for security, support and to keep the service working. We do not use advertising trackers.",
            ],
          },
          {
            heading: "Location data",
            paragraphs: [
              "The Driive app uses location data only to deliver features you turn on, and only with the permission you grant on your device. You can decline location access, or later revoke it in your device settings, and continue to use the rest of the app.",
              "Foreground location (while the app is open) is used to centre maps on where you are — for example when sketching or reviewing a lesson route, or setting a pickup point.",
              "Background location is used for one purpose only: when an instructor starts a lesson, the app records the route driven so the instructor and pupil can review it together afterward. Background collection runs only during an active lesson and stops when the lesson ends. We do not track your location when no lesson is in progress, and we do not use location for advertising or sell it to anyone.",
              "Route location data is stored against the relevant lesson and is visible to the instructor and the pupil (and their guardian, where applicable) on that lesson. You can ask us to delete route data at any time.",
              "Lawful basis: consent (Article 6(1)(a) UK GDPR) — given through the device permission prompt and by starting a lesson — which you can withdraw at any time by turning the permission off.",
            ],
          },
          {
            heading: "Why we process it and our lawful bases",
            paragraphs: [
              "To provide the service — creating accounts, booking and running lessons, recording progress, taking payments and enabling messaging. Lawful basis: performance of a contract (Article 6(1)(b)), and consent for optional features such as location and calendar sync (Article 6(1)(a)).",
              "To keep pupils safe — verifying age and, for younger pupils, keeping a nominated guardian informed. Lawful basis: legitimate interests (Article 6(1)(f)) and, where relevant, legal obligation (Article 6(1)(c)).",
              "To send service and marketing communications — booking confirmations, reminders and, for waitlist members, launch updates. Lawful basis: performance of a contract for service messages, and consent for marketing (Article 6(1)(a)), which you can withdraw at any time.",
              "To protect the service and provide support — security, fraud prevention, diagnostics and answering enquiries. Lawful basis: legitimate interests (Article 6(1)(f)).",
              "We do not sell personal data, and we do not use it for third-party advertising.",
            ],
          },
          {
            heading: "Who processes data on our behalf",
            paragraphs: [
              "We use a small number of service providers (processors) to run Driive: Supabase (database, authentication and file storage), Resend (transactional and notification email), Stripe (payment processing and instructor payouts), Twilio (SMS notifications, where an instructor enables that option), Google (Maps and Places for addresses, and Calendar sync where you connect it), Apple (Sign in with Apple and in-app purchases), Expo (mobile push-notification delivery) and Vercel (website hosting).",
              "Each provider processes data under contract with us and only on our instructions. Where data is transferred outside the UK, transfers are protected by appropriate safeguards such as the UK Addendum to the EU Standard Contractual Clauses or an adequacy decision.",
              "We also share data where the service requires it — for example, a pupil's lesson and progress records are visible to their instructor (and their guardian, where set up), and payment records are shared with Stripe to process a charge or payout. We may disclose data where required by law or to establish, exercise or defend legal claims.",
            ],
          },
          {
            heading: "How long we keep it",
            paragraphs: [
              "Account, lesson, progress and payment records are kept for as long as your account is active and for a reasonable period afterward to meet legal, accounting and tax obligations (typically up to 6 years for financial records).",
              "Location and route data is kept against its lesson and can be deleted on request; it is removed when the associated lesson or account is deleted.",
              "Waitlist and enquiry data is kept until communications are complete, until you unsubscribe or ask us to delete it, or for a maximum of 24 months of inactivity — whichever comes first. Correspondence is kept for up to 24 months after the enquiry is closed unless a longer period is needed to comply with a legal obligation or resolve a dispute.",
              "You can delete your account at any time from within the app, which removes your personal data subject to the retention obligations above.",
            ],
          },
          {
            heading: "Your rights",
            paragraphs: [
              "Under UK GDPR you have the right to access the personal data we hold about you, to have it corrected or erased, to restrict or object to processing, to data portability, and to withdraw consent at any time where consent is the basis for processing.",
              <>
                To exercise any right, email <Email to="privacy@driive.app" />.
                We respond within one month. You also have the right to
                complain to the Information Commissioner&rsquo;s Office (ICO)
                at ico.org.uk if you believe your data has been mishandled —
                though we would appreciate the chance to resolve it with you
                first.
              </>,
            ],
          },
          {
            heading: "Cookies",
            paragraphs: [
              <>
                This site uses only essential cookies needed for it to
                function. Details are in our{" "}
                <Link
                  href="/cookies"
                  className="font-semibold text-[#2546F5] underline-offset-4 hover:underline"
                >
                  cookie policy
                </Link>
                .
              </>,
            ],
          },
          {
            heading: "Changes to this policy",
            paragraphs: [
              "If we change this policy in a way that affects how your data is used, we will update this page and, where the change is significant, notify affected users and waitlist members by email or in the app. The date at the top shows when it was last revised.",
            ],
          },
        ]}
      />
    </>
  );
}
