"use client";

import { useState } from "react";
import { CREAM, Check } from "@/components/ui";
import {
  FREE_INCLUDED,
  PRO_INCLUDED,
  PRO_MONTHLY_PENCE,
  PRO_ANNUAL_MONTHLY_EQUIV_PENCE,
  FOUNDERS_MONTHLY_PENCE,
  FOUNDERS_ANNUAL_PENCE,
  FOUNDERS_ANNUAL_MONTHLY_EQUIV_PENCE,
  formatPounds,
} from "@/data/pricing";

type Billing = "annual" | "monthly";

export default function PricingPlans({
  tone = "light",
}: {
  tone?: "light" | "blue";
}) {
  const [billing, setBilling] = useState<Billing>("annual");

  const standardPence =
    billing === "annual" ? PRO_ANNUAL_MONTHLY_EQUIV_PENCE : PRO_MONTHLY_PENCE;
  const foundersPence =
    billing === "annual"
      ? FOUNDERS_ANNUAL_MONTHLY_EQUIV_PENCE
      : FOUNDERS_MONTHLY_PENCE;

  return (
    <div className="text-left">
      <div className="flex justify-center">
        <div
          role="group"
          aria-label="Billing period"
          className={`inline-flex items-center gap-1 rounded-full p-1 ${
            tone === "blue"
              ? "bg-white/10 ring-1 ring-white/15"
              : "border border-neutral-200 bg-white"
          }`}
        >
          {(
            [
              ["annual", "Annual"],
              ["monthly", "Monthly"],
            ] as const
          ).map(([value, label]) => {
            const active = billing === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => setBilling(value)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  active
                    ? tone === "blue"
                      ? "bg-[#F9D7E2] text-[#2546F5]"
                      : "bg-[#2546F5] text-white"
                    : tone === "blue"
                      ? "text-[#F9D7E2]/80 hover:text-[#F9D7E2]"
                      : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {label}
                {value === "annual" && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      active
                        ? tone === "blue"
                          ? "bg-[#2546F5] text-[#F9D7E2]"
                          : "bg-[#F9D7E2] text-[#2546F5]"
                        : tone === "blue"
                          ? "bg-white/10 text-[#F9D7E2]/80"
                          : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    2 months free
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div
          className="rounded-[2.5rem] p-8 sm:p-12"
          style={{ backgroundColor: CREAM }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
            Free
          </p>
          <p className="mt-6 text-5xl font-semibold tracking-[-0.03em] text-neutral-900">
            £0
            <span className="ml-2 text-lg font-medium tracking-normal text-neutral-500">
              forever
            </span>
          </p>
          <p className="mt-2 text-sm font-medium text-neutral-500">
            No card, no trial clock
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            Everything you need to run a round of up to ten pupils.
          </p>
          <ul className="mt-8 space-y-3.5">
            {FREE_INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#2546F5] text-white">
                  <Check className="h-3 w-3" />
                </span>
                <p className="text-[15px] font-medium leading-snug text-neutral-800">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`rounded-[2.5rem] p-8 text-white sm:p-12 ${
            tone === "blue" ? "ring-1 ring-white/25" : ""
          }`}
          style={{ backgroundColor: "#2546F5" }}
        >
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#F9D7E2]">
            Pro
            <span className="rounded-full bg-[#F9D7E2] px-3 py-1 text-[10px] font-semibold normal-case tracking-normal text-[#2546F5]">
              Founding price
            </span>
          </p>
          <p className="mt-6 text-5xl font-semibold tracking-[-0.03em]">
            <span className="mr-3 align-middle text-2xl font-medium tracking-normal text-[#F9D7E2]/50 line-through">
              {formatPounds(standardPence)}
            </span>
            {formatPounds(foundersPence)}
            <span className="ml-2 text-lg font-medium tracking-normal text-[#F9D7E2]/80">
              a month
            </span>
          </p>
          <p className="mt-2 text-sm font-medium text-[#F9D7E2]/80">
            {billing === "annual"
              ? `Billed annually — ${formatPounds(FOUNDERS_ANNUAL_PENCE)} a year, two months free`
              : "Billed monthly — cancel any time"}
          </p>
          <p className="mt-3 text-sm font-medium text-[#F9D7E2]">
            Founding instructor price — join from the waitlist and keep it
            forever.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#F9D7E2]/90">
            Unlimited pupils, plus the teaching tools that set your school
            apart.
          </p>
          <ul className="mt-8 space-y-3.5">
            {PRO_INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#F9D7E2] text-[#2546F5]">
                  <Check className="h-3 w-3" />
                </span>
                <p className="text-[15px] font-medium leading-snug">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
