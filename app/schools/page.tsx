import Link from "next/link";
import { meta } from "@/lib/meta";
import { JsonLd, breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { CONTAINER, CREAM, Eyebrow, Road, Check } from "@/components/ui";
import { PageIntro } from "@/components/sections";
import WaitlistForm from "@/components/waitlist-form";

const DESCRIPTION =
  "Driive for driving schools is coming soon: multi-instructor diaries, shared pupil records, school-wide payments and reporting. Register interest.";

export const metadata = meta(
  "For driving schools",
  DESCRIPTION,
  "/schools",
);

const PLANNED = [
  {
    title: "Every instructor, one diary view",
    body: "See the whole school's week at a glance, assign pupils to instructors, and spot empty slots across the team before they cost you money.",
  },
  {
    title: "Shared pupil records",
    body: "Pupils belong to the school, not a single phone. Notes, progress and payment history follow the learner if they switch instructor.",
  },
  {
    title: "School-wide payments",
    body: "Take payment centrally, split or pass through to instructors, and see exactly what the school earned this week without a spreadsheet.",
  },
  {
    title: "Reporting across the team",
    body: "Hours taught, pass rates and utilisation per instructor — so you manage the school on numbers, not gut feel.",
  },
];

export default function SchoolsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            path: "/schools",
            name: "Driive for driving schools",
            description: DESCRIPTION,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "For driving schools", path: "/schools" },
          ]),
        ]}
      />

      <PageIntro
        eyebrow="For driving schools · Coming soon"
        title={
          <>
            The school version
            <br />
            is on the way.
          </>
        }
        lede="Driive launches for independent instructors first. Multi-instructor tools for driving schools follow — built on the same diary, payments and progress engine."
      >
        <div className="mt-10 max-w-xl">
          <WaitlistForm variant="blue" source="schools" />
          <p className="mt-4 text-sm text-[#F9D7E2]/80">
            Register interest and we will contact you when school accounts
            open.
          </p>
        </div>
      </PageIntro>

      {/* Planned capabilities */}
      <section className="bg-white py-20 lg:py-28">
        <div className={CONTAINER}>
          <Eyebrow>What is planned</Eyebrow>
          <h2 className="mt-8 max-w-3xl text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
            Run the school like
            <br />
            one business, not ten.
          </h2>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {PLANNED.map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-8"
                style={{ backgroundColor: CREAM }}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#2546F5] text-white">
                  <Check className="h-4 w-4" />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-neutral-400">
            Planned capabilities are subject to change before launch. School
            pricing will be announced separately from{" "}
            <Link href="/pricing" className="underline underline-offset-2">
              instructor pricing
            </Link>
            .
          </p>
        </div>
      </section>

      <Road from="#FFFFFF" to={CREAM} />

      {/* Instructors in schools */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <Eyebrow>In the meantime</Eyebrow>
              <h2 className="mt-8 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-900">
                Your instructors can
                <br />
                start today.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-neutral-600">
              <p>
                Instructors at your school can join the{" "}
                <Link href="/waitlist" className="font-medium text-[#2546F5] underline underline-offset-2">
                  instructor waitlist
                </Link>{" "}
                now and run their own{" "}
                <Link href="/features/smart-diary" className="font-medium text-[#2546F5] underline underline-offset-2">
                  diaries
                </Link>{" "}
                on Driive from day one. When
                school accounts launch, their pupils, lesson history and
                payment records move across — nothing is re-typed and nothing
                is lost.
              </p>
              <p>
                That means the school version starts with real data on day
                one, and your team is already fluent in the tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32" style={{ backgroundColor: "#2546F5" }}>
        <div className={CONTAINER}>
          <h2 className="max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-[#F9D7E2]">
            Be first in line
            <br />
            for school accounts.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#F9D7E2]/90">
            One email address. We will let you know the moment multi-instructor
            accounts open.
          </p>
          <div className="mt-10">
            <WaitlistForm variant="blue" source="schools-footer" />
          </div>
        </div>
      </section>
    </>
  );
}
