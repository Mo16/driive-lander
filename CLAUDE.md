# CLAUDE.md — Driive Marketing Site

This file defines how to work on this codebase. Follow it exactly. When in doubt, copy an existing pattern from the codebase rather than inventing a new one.

## What this is

Marketing site for **Driive** — a SaaS platform for UK driving instructors (bookings, payments, reminders, DVSA progress tracking, reporting). Pre-launch: the single business goal of every page is **waitlist signups**. Audience: solo ADIs first, driving schools later ("For Schools" is marked Coming soon everywhere).

The site must read like a funded, enterprise-grade company: precise copy, real legal pages, consistent design, zero placeholder filler visible to users.

## Stack

- Next.js 15, App Router, TypeScript strict, React Server Components by default
- Tailwind CSS v4 (`@import "tailwindcss"` in `app/globals.css`, no tailwind.config)
- Geist Sans via the `geist` npm package (never next/font/google)
- Supabase (waitlist storage) + Resend (notifications) — server-side only, in `app/api/waitlist/route.ts`
- No other dependencies without explicit approval. No shadcn, no framer-motion, no icon libraries — all icons are hand-written inline SVGs.

Commands: `npm run dev` / `npm run build` (build must pass before any work is considered done).

## Design system — never deviate

The design language is flat, bold, editorial SaaS (Weav-style). It is NOT glassmorphism, NOT gradients, NOT pastel cards with blur.

### Tokens (import from `components/ui.tsx`, never hardcode new hexes)

| Token | Hex       | Use |
|-------|-----------|-----|
| BLUE  | `#2546F5` | Primary brand. Section backgrounds, buttons, links, accents |
| PINK  | `#F9D7E2` | Headlines/text on blue, soft badges, secondary buttons |
| CREAM | `#F0EEE7` | Neutral section backgrounds, visual panels |
| INK   | `#0C0C0E` | Dark sections, device frames |
| White / neutral-900/600/500/400/200/100 | Tailwind | Body text and surfaces |

Selection colour is pink/blue (set in globals.css). Never use default Tailwind blues, purples, or gradient text.

### Typography

- One family: Geist Sans. Weights: semibold for display, medium for UI/buttons, regular for body.
- Display headings: `font-semibold tracking-[-0.03em]` (hero `-0.04em`), `leading-[0.98–1.04]`, sized with clamp, e.g. `text-[clamp(2.8rem,6vw,5.5rem)]`.
- Statement bands (full-bleed blue sections) use pink display type.
- Body: `text-lg leading-relaxed`, `text-neutral-600` on light, `text-[#F9D7E2]/90` on blue.
- Logo wordmark is lowercase `driive`, semibold, tight tracking. Never uppercase the brand.

### Layout & shape

- Container: `mx-auto w-full max-w-[1380px] px-6 lg:px-12` (exported as `CONTAINER`).
- Section rhythm: `py-24 lg:py-32` (hero/pricing larger). Sections alternate full-bleed background colours: blue → pink → white card → cream → dark.
- Radius scale: cards `rounded-[2rem]`–`rounded-[2.5rem]`, inner tiles `rounded-xl`/`rounded-2xl`, buttons + pills always `rounded-full`. Phone frames `rounded-[3rem] border-[10px] border-neutral-950`.
- Section transitions between colour blocks use the `<Wave from to />` SVG divider — never straight gradients, never diagonal clips.

### Recurring components (reuse, never re-implement)

From `components/ui.tsx`: `Logo`, `LogoMark`, `Arrow`, `Check`, `Eyebrow`, `Wave`, `CONTAINER`, colour tokens.
From `components/sections.tsx`: `PageIntro` (blue page hero — every subpage starts with one), `CtaSection` (blue waitlist band — every subpage ends with one), `FaqSection`, `FeatureLinkGrid`.
From `components/`: `Nav` (client, dropdowns), `Footer`, `WaitlistForm` (client).

Buttons: pill, `px-7 py-4 text-[15px] font-medium`, white-on-blue / pink-on-blue / blue-on-light, with the shared `<Arrow />`. Eyebrow chips introduce sections. Checklists use the shared `<Check />` square-tick.

Product visuals are **CSS/SVG mockups only** (chat bubbles, diary rows, stat tiles, phone/tablet frames) — never stock photos, never AI-generated imagery, never emoji.

## Copy voice

- UK English (organised, colour, diary, pupils — not students). Audience words: instructor, ADI, pupil, lesson, diary, test.
- Confident, concrete, benefit-led. Pattern: short declarative pairs ("Train it once. Watch it run forever."), "X that actually Y".
- Numbers and specifics over adjectives. £35/hr, 14:00, Tue — realistic UK details in mockups.
- Banned: emojis, exclamation overuse, "supercharge/unlock/seamless/revolutionary", fake testimonials, fake user counts, fake investor/press logos, competitor names, lorem ipsum.
- Driive is independent — never imply DVSA affiliation or endorsement (the footer disclaimer must stay).
- CTAs: primary is always "Join the waitlist". Forms carry the consent microcopy linking to /privacy.

## Pages & routing

Every new page must: start with `PageIntro`, end with `CtaSection`, export metadata via `meta()` from `lib/meta.ts`, be added to `app/sitemap.ts`, and be reachable from Nav and/or Footer. One `h1` per page. Content for features lives in `data/features.ts`; blog posts in `data/posts.ts` — pages render from data, copy is never duplicated into JSX.

Current routes: `/`, `/features`, `/features/[slug]` (smart-diary, pupil-hub, payments, reminders, progress, reports), `/instructors`, `/schools` (coming soon), `/pricing`, `/about`, `/contact`, `/blog`, `/blog/[slug]`, `/waitlist`, `/privacy`, `/terms`, `/cookies`, `/security`, plus `not-found`, `sitemap.ts`, `robots.ts`.

## SEO requirements (non-negotiable)

- `meta(title, description, path)` on every route; layout provides `metadataBase` + `%s · Driive` template.
- Canonical + OpenGraph on every page. JSON-LD: Organization (layout), SoftwareApplication + FAQPage (home). Add Article JSON-LD to new blog posts.
- Semantic headings in order, descriptive link text, no "click here".

## Forms & data

- `WaitlistForm` POSTs `{ email, source, company }` to `/api/waitlist`. `company` is a honeypot — must stay.
- The API route validates server-side, inserts into Supabase table `waitlist` (see README for SQL) and notifies via Resend. Both are optional via env vars — the route must never crash when keys are absent, and Supabase/Resend clients are only ever created inside the handler with server-side keys. Never expose service keys to the client.

## Enterprise/trust rules

- Legal pages (/privacy, /terms, /cookies, /security) are real documents, not stubs. Keep them current when data practices change; update "Last updated" dates. Placeholders that must be replaced before launch: company number, registered address, VAT number.
- Never fabricate compliance claims (no "ISO certified", no "SOC 2") — describe practices honestly ("aligned with", "working toward").
- Footer always carries: company registration line, DVSA independence disclaimer, legal links.

## Definition of done

1. `npm run build` passes (types + static generation).
2. Checked at mobile width (~375px) and desktop — nav, forms, and mockups all hold.
3. Metadata + sitemap updated for any new route.
4. No new hexes, fonts, radii, shadows, or dependencies outside this document.
5. Reads like it was written by the same team that wrote the rest of the site.
