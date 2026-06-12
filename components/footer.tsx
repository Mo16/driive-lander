import Link from "next/link";
import { Logo, CONTAINER } from "./ui";
import { FEATURES } from "@/data/features";

const COLUMNS: { title: string; links: { name: string; href: string; soon?: boolean }[] }[] = [
  {
    title: "Product",
    links: [
      { name: "Features overview", href: "/features" },
      ...FEATURES.map((f) => ({ name: f.name, href: `/features/${f.slug}` })),
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "For driving instructors", href: "/instructors" },
      { name: "For driving schools", href: "/schools", soon: true },
      { name: "Pricing", href: "/pricing" },
      { name: "Join the waitlist", href: "/waitlist" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
      { name: "Security", href: "/security" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white pb-12 pt-10">
      <div className={CONTAINER}>
        <div className="grid gap-12 border-t border-neutral-200 pt-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="dark" />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-neutral-500">
              The booking, payments and progress platform for UK driving
              instructors.
            </p>
            <p className="mt-5 text-[15px] text-neutral-500">@driiveapp</p>
          </div>
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="font-semibold">{column.title}</p>
              <ul className="mt-5 space-y-3 text-[15px] text-neutral-500">
                {column.links.map((link) => (
                  <li key={link.href + link.name}>
                    <Link
                      href={link.href}
                      className="transition hover:text-neutral-900"
                    >
                      {link.name}
                      {link.soon && (
                        <span className="ml-2 rounded-full bg-[#F9D7E2] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#2546F5]">
                          Soon
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-neutral-200 pt-8 text-[13px] leading-relaxed text-neutral-400">
          <p>
            © 2026 Driive. Driive is a trading name of Aurelo Web Studio Ltd,
            a company registered in England and Wales (Company No. 16930106).
            Registered office: 11 Pains Road, Southsea, England, PO5 1HE.
          </p>
          <p className="mt-2">
            Driive is an independent product and is not affiliated with,
            endorsed by, or connected to the Driver and Vehicle Standards
            Agency (DVSA).
          </p>
        </div>
      </div>
    </footer>
  );
}
