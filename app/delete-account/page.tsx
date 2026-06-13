import { meta } from "@/lib/meta";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { PageIntro, LegalDoc } from "@/components/sections";

const DESCRIPTION =
  "How to delete your Driive account and what data is removed. Delete from inside the app in seconds, or email us and we'll do it for you.";

export const metadata = meta(
  "Delete your account",
  DESCRIPTION,
  "/delete-account",
);

const Email = ({ to }: { to: string }) => (
  <a
    href={`mailto:${to}`}
    className="font-semibold text-[#2546F5] underline-offset-4 hover:underline"
  >
    {to}
  </a>
);

export default function DeleteAccountPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/delete-account",
            name: "Delete your Driive account",
            description: DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Delete your account", path: "/delete-account" },
          ]),
        ]}
      />

      <PageIntro
        eyebrow="Account"
        title="Delete your account"
        lede="You can permanently delete your Driive account and its data from inside the app at any time. This page explains how, and exactly what gets removed."
      />
      <LegalDoc
        updated="13 June 2026"
        sections={[
          {
            heading: "Delete from inside the app",
            paragraphs: [
              "The fastest way to delete your account is in the Driive app, where you are already signed in:",
              <>
                Open <strong>Settings</strong>, tap{" "}
                <strong>Account &amp; data</strong>, then tap{" "}
                <strong>Delete account</strong>. Type <strong>DELETE</strong> to
                confirm. Your account and data are removed immediately and you
                are signed out.
              </>,
              "Deletion is permanent and takes effect straight away — there is no waiting period and the account cannot be recovered afterwards. If you only want to export a copy of your data first, use Account & data → Export data before you delete.",
            ],
          },
          {
            heading: "Prefer us to do it? Email a request",
            paragraphs: [
              <>
                If you can&rsquo;t access the app, email{" "}
                <Email to="support@driive.app" /> from the email address on your
                account and ask us to delete it. We may ask one or two questions
                to confirm it&rsquo;s really you before we act.
              </>,
              "We complete verified deletion requests within 30 days, and usually much sooner. We'll confirm by email once it's done.",
            ],
          },
          {
            heading: "What gets deleted",
            paragraphs: [
              "Permanently removing your account removes the personal data tied to it. For an instructor account this includes your profile and business details, your pupils, lessons and diary, block packages, payment records, progress notes, enquiries and uploaded files. For a pupil account it includes your profile, your lesson history and progress as held in your account, and your link to your instructor.",
              "Your sign-in credentials are deleted, so the email and password can no longer be used to access Driive.",
            ],
          },
          {
            heading: "What we may keep, and for how long",
            paragraphs: [
              "Where the law requires it, we may retain a limited amount of information after deletion — for example transaction and tax records needed to meet legal and accounting obligations. This is kept only for as long as required and is not used to rebuild your account.",
              "If you are a pupil, some records may also remain in your instructor's own account where they are that instructor's records (for example a lesson that took place) — deleting your Driive account does not delete data held independently by your instructor.",
              "Anonymised or aggregated data that can no longer identify you may be retained.",
            ],
          },
          {
            heading: "Questions",
            paragraphs: [
              <>
                For anything about account deletion or your data, email{" "}
                <Email to="support@driive.app" />. For how Driive handles
                personal data more generally, see our{" "}
                <a
                  href="/privacy"
                  className="font-semibold text-[#2546F5] underline-offset-4 hover:underline"
                >
                  privacy policy
                </a>
                .
              </>,
            ],
          },
        ]}
      />
    </>
  );
}
