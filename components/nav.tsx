"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo, CONTAINER } from "./ui";
import { FEATURES } from "@/data/features";

type Item = { name: string; href: string; desc?: string; soon?: boolean };

const PRODUCT: Item[] = [
  { name: "Features overview", href: "/features", desc: "Everything in Driive" },
  ...FEATURES.map((f) => ({
    name: f.name,
    href: `/features/${f.slug}`,
    desc: f.tagline,
  })),
];

const SOLUTIONS: Item[] = [
  {
    name: "For driving instructors",
    href: "/instructors",
    desc: "Solo ADIs and PDIs",
  },
  {
    name: "For driving schools",
    href: "/schools",
    desc: "Multi-instructor teams",
    soon: true,
  },
];

const RESOURCES: Item[] = [
  { name: "Blog", href: "/blog", desc: "Notes from the road" },
  { name: "About", href: "/about", desc: "Who's behind Driive" },
  { name: "Security", href: "/security", desc: "How we protect your data" },
  { name: "Contact", href: "/contact", desc: "Talk to the team" },
];

const MENUS: { key: string; label: string; items: Item[] }[] = [
  { key: "product", label: "Product", items: PRODUCT },
  { key: "solutions", label: "Solutions", items: SOLUTIONS },
  { key: "resources", label: "Resources", items: RESOURCES },
];

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <path
      d="m6 9 6 6 6-6"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function SoonBadge() {
  return (
    <span className="ml-2 rounded-full bg-[#F9D7E2] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#2546F5]">
      Coming soon
    </span>
  );
}

export default function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className={`${CONTAINER} flex items-center justify-between py-6`}>
        <Logo variant="light" />

        {/* desktop */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-2 lg:flex"
          onMouseLeave={() => setOpen(null)}
        >
          {MENUS.map((menu) => (
            <div
              key={menu.key}
              className="relative"
              onMouseEnter={() => setOpen(menu.key)}
            >
              <button
                type="button"
                aria-expanded={open === menu.key}
                onClick={() => setOpen(open === menu.key ? null : menu.key)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-medium transition ${
                  open === menu.key
                    ? "bg-white/10 text-white"
                    : "text-[#F9D7E2] hover:text-white"
                }`}
              >
                {menu.label}
                <Chevron open={open === menu.key} />
              </button>

              {open === menu.key && (
                <div className="absolute left-0 top-full pt-3">
                  <div className="w-[300px] rounded-2xl bg-white p-2 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
                    {menu.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(null)}
                        className="block rounded-xl px-4 py-3 transition hover:bg-[#2546F5]/5"
                      >
                        <span className="flex items-center text-[15px] font-medium text-neutral-900">
                          {item.name}
                          {item.soon && <SoonBadge />}
                        </span>
                        {item.desc && (
                          <span className="mt-0.5 block text-[13px] text-neutral-400">
                            {item.desc}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            href="/pricing"
            className="rounded-full px-4 py-2 text-[15px] font-medium text-[#F9D7E2] transition hover:text-white"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/waitlist"
            className="hidden rounded-full bg-[#F9D7E2] px-6 py-3 text-[15px] font-medium text-[#2546F5] transition hover:bg-white sm:block"
          >
            Join the waitlist
          </Link>
          {/* mobile toggle */}
          <button
            type="button"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
            className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-[#F9D7E2] ring-1 ring-white/20 lg:hidden"
          >
            {mobile ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* mobile panel */}
      {mobile && (
        <div className="fixed inset-0 top-[88px] z-40 overflow-y-auto bg-[#2546F5] px-6 pb-16 lg:hidden">
          {MENUS.map((menu) => (
            <div key={menu.key} className="border-t border-white/15 py-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#F9D7E2]/60">
                {menu.label}
              </p>
              <div className="mt-3 space-y-1">
                {menu.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobile(false)}
                    className="flex items-center py-2 text-lg font-medium text-white"
                  >
                    {item.name}
                    {item.soon && <SoonBadge />}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-white/15 py-5">
            <Link
              href="/pricing"
              onClick={() => setMobile(false)}
              className="block py-2 text-lg font-medium text-white"
            >
              Pricing
            </Link>
          </div>
          <Link
            href="/waitlist"
            onClick={() => setMobile(false)}
            className="mt-4 block rounded-full bg-[#F9D7E2] px-6 py-4 text-center text-[15px] font-medium text-[#2546F5]"
          >
            Join the waitlist
          </Link>
        </div>
      )}
    </header>
  );
}
