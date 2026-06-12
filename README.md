# Driive — Marketing Website

Full multi-page marketing site for Driive, the all-in-one business system for UK driving instructors. Next.js 15 (App Router) · Tailwind CSS v4 · TypeScript · Supabase · Resend.

Every device mockup, wave divider and icon is CSS/SVG — no external image assets. Read `CLAUDE.md` before changing anything: it is the design-system contract for this project.

## Quickstart

```bash
npm install
cp .env.example .env.local   # fill in keys (optional for local dev)
npm run dev
```

→ http://localhost:3000

The site runs without any env keys — the waitlist API simply skips Supabase/Resend when keys are absent, so local dev and previews never crash.

## Production

```bash
npm run build
npm start
```

Deploys cleanly to Vercel. Set the env vars from `.env.example` in your project settings.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, feature showcase, FAQ, waitlist CTAs |
| `/features` | Features index |
| `/features/[slug]` | Six feature pages: `smart-diary`, `pupil-hub`, `payments`, `reminders`, `progress`, `reports` |
| `/instructors` | Solution page for independent ADIs/PDIs |
| `/schools` | Driving schools — coming soon, interest capture |
| `/pricing` | Flat-price promise, included list, founding terms |
| `/about` | Story, principles, honest pre-launch positioning |
| `/contact` | Contact inboxes + company details |
| `/blog`, `/blog/[slug]` | Blog index + three launch articles |
| `/waitlist` | Dedicated signup page |
| `/privacy`, `/terms`, `/cookies`, `/security` | Legal & trust pages (UK GDPR, E&W law) |

Plus `sitemap.xml`, `robots.txt`, branded 404, and JSON-LD (Organization, SoftwareApplication, FAQPage, Article).

## Waitlist API

`POST /api/waitlist` with `{ email, company, source }`. `company` is a honeypot — bots fill it, humans never see it. Valid signups are upserted to Supabase (deduped on email) and a notification is sent via Resend. Both integrations are optional and activate only when their env keys exist.

### Supabase table

```sql
create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);
```

### Environment variables

| Key | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata/sitemap (default `https://driive.app`) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-only, never exposed) |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM` | From address, e.g. `Driive <waitlist@driive.app>` |
| `WAITLIST_NOTIFY_EMAIL` | Inbox that receives signup notifications |

## Before going live

- Replace `[00000000]` and `[Registered address]` in the footer, `/contact`, `/privacy` and `/terms` with real company details.
- Have the legal pages reviewed by a solicitor — they are structured templates, not legal advice.
- Point `driive.app` DNS at Vercel and set `NEXT_PUBLIC_SITE_URL`.

## Design system

Tokens, type scale, component rules, copy voice and the definition of done all live in `CLAUDE.md`. Retheme the entire site by find-replacing `#2546F5` (blue) and `#F9D7E2` (pink).
# driive-lander
