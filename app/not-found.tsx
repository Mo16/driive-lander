import Link from "next/link";
import { BLUE, PINK, CONTAINER, Arrow, Road } from "@/components/ui";

export default function NotFound() {
  return (
    <main>
      <section
        className="pb-24 pt-44 lg:pb-32 lg:pt-56"
        style={{ backgroundColor: BLUE }}
      >
        <div className={CONTAINER}>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F9D7E2]/60">
            404
          </p>
          <h1 className="mt-6 max-w-3xl text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#F9D7E2]">
            Looks like
            <br />a wrong turn.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#F9D7E2]/90">
            This page doesn&apos;t exist — but the diary that runs itself does.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[15px] font-medium text-[#2546F5] transition hover:bg-[#F9D7E2]"
            >
              Back to home
              <Arrow />
            </Link>
            <Link
              href="/waitlist"
              className="inline-flex items-center rounded-full bg-[#F9D7E2] px-7 py-4 text-[15px] font-medium text-[#2546F5] transition hover:bg-white"
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </section>
      <Road from={BLUE} to={PINK} />
      <div className="h-16" style={{ backgroundColor: PINK }} />
    </main>
  );
}
