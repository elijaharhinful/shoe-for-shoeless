# CLAUDE.md: Shoe for the Shoeless

## What this is
Donation website for **Shoe for the Shoeless** (shoefortheshoeless.org), a Ghanaian initiative led by founder Edna Frimpong ("The ShoemakerGurl") that makes durable, locally handmade shoes and fits them in person for school children who walk to school barefoot. Campaign name: **Project 1 Million** (one million pairs). Visitors are Ghanaian and diaspora donors, corporate/church sponsors, and volunteers. The one job of the home page: get a donation (Paystack) or a partnership email.

## Stack & layout
- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · pnpm. Single repo, no separate backend (API lives in `src/app/api/*` route handlers), so Orval does not apply.
- MongoDB via Mongoose (`src/lib/mongodb.ts`, `src/models/*`) stores donation records.
- `src/content/site.ts`: **all copy, stats, contacts, presets, communities, SDGs, partners.** Edit numbers here, never in components.
- `src/components/`: `Header`, `Hero`, `DonateForm`, `Footer`, `ui.tsx` (Button, ButtonLink, Eyebrow, Container), `sections/*` (one file per home section).
- `src/app/thank-you/`: Paystack callback page; verifies server-side via `src/lib/donations.ts`.
- `public/brand/` logo PNGs: `*-plum.png` (current brand color) and `*-white.png`; `*-maroon.png` are the old originals, unused. `public/partners/` partner logos (trimmed, on white). `public/images/` program photos (EXIF stripped). `public/videos/` hero loop (mp4+webm, muted) and full film.
- Source material (photos, PDFs, raw video) lives outside the repo in `C:\Users\Doxa\Desktop\web\Edna\`. Raw films are on Google Drive (see `Edna/instruction.txt`).
- Sibling site: Edna's personal site is `C:\Users\Doxa\Desktop\web\shoemakergurl` (ednafrimpong.com, static HTML, CRLF + non-breaking spaces in places). The two sites link to each other.

## Commands
- `pnpm dev`: dev server on :3000
- `pnpm build`: production build (also type-checks)
- `pnpm lint`: ESLint; must pass clean
- `node screenshot.mjs <url> <label> [--full|--mobile|--tablet|--selector=".x"]`: design screenshots into `screenshots/` (git-ignored). `--full` stitching repeats the hero on long pages; prefer `--selector` per section.
- Screenshots are scratch: delete every old shot before a new visual task and again when it is signed off (user rule). After replacing an image, give it a new filename or `next/image` serves the cached old one.

## Payments (non-negotiable)
- **Paystack only, for now.** Channels card + mobile_money + bank_transfer. Stripe/PayPal code exists but is not exposed in the UI.
- **Donors give in USD, Paystack charges GHS** (Mobile Money is GHS-only). The form sends `currency: 'USD'`; `POST /api/donations/create` converts on the server with the live rate from `src/lib/fx.ts` (open.er-api.com, cached 1h, fallback `USD_GHS_FALLBACK_RATE` env or 11.7). The Donation stores `amount`/`currency` = charged GHS plus `amountUsd` and `exchangeRate`.
- The form shows dollars only (user removed the "about GHS X" note); "Paid in GHS" sits in the small print. Only the email is required (Paystack needs it); the name is optional to keep the form light.
- Flow: `DonateForm` -> `POST /api/donations/create` (creates pending Donation, initializes Paystack) -> Paystack checkout -> `/thank-you?reference=` (server verifies, checks amount) + `POST /api/webhooks/paystack` (HMAC-SHA512 of raw body, amount check).
- Paystack gets pesewas via `Math.round(amount * 100)` of the stored GHS amount.
- Never trust the client amount on confirm: always compare Paystack's charged amount with the stored donation.
- Direct Mobile Money fallback number is shown on the page and in errors: 053 916 0861 (Edna Frimpong).

## Design system (non-negotiable)
Colors come from the Shoe for the Shoeless campaign artwork (ednafrimpong.com/shoeless.html: orange, plum, green and blue panels with yellow). Maroon/brown is Edna's personal brand; do not bring it back here. Layout references: food4education.org (huge confident type, bold color-blocked sections, odometer counters) and soles4souls.org (video hero with donation form on top). Match their structure and feel, never their branding or copy.
- Tokens live in `src/app/globals.css` `@theme`. Use theme keys, no raw hex in markup.
  - plum-700 `#880958` brand (logo, headings on light) · plum-800/900/950 dark sections
  - flame-500 `#c23601` campaign orange: primary action (Donate buttons) and the Big Idea band · flame-600 hover
  - leaf-700 `#026a49` green (Impact band uses leaf-800) · sea-700 `#0e5281` blue (Film band, Problem facts, footer)
  - gold-500 `#fac55d` accent: numbers and highlights on dark
  - blush-50/100/200 page backgrounds (warm paper)
  - ink / ink-muted text
- Each section gets its own color: hero (plum overlay) · Momo band plum · Problem paper + blue card · Big Idea orange · Marquee gold · Impact green · SDGs paper + four colored cards · Film blue · Inspiration paper · Founder plum · Gallery paper · Get involved blush · Footer deep blue.
- Type: Montserrat 800-900 display (matches the wordmark) + Plus Jakarta Sans body. `text-hero` and `text-section` are the display sizes; hero is ~6x body.
- Signature detail: the `toe-trail` utility (the logo's five toe-print dots) marks every section eyebrow. Keep it consistent.
- Radius: `--radius-card` (1.75rem) for cards and media; buttons are full pills.
- Motion: inline head script (`src/lib/motion.ts`) sets `html[data-motion]` and flags `.reveal` / `.reveal-media` with `[data-inview]`; all animation is CSS in `globals.css`. Variants: `.reveal` (+ `from-left`, `from-right`, `pop`), `.reveal-media` (photo wipe), `RiseText` (word-rise headlines), `.odo-col` (rolling counters), `.bar-fill`, toe-trail walk. Stagger with `stagger(i)` from `ui.tsx`. Hero uses `.enter` (CSS on load, never waits for JS). No JS or reduced motion: nothing hidden. Hero video hides under reduced motion; the poster stays.
- Deploy: Vercel project `shoe-for-shoeless` auto-deploys `main`. vercel.app URLs are behind Vercel Authentication; the custom domain is public.
- Light theme only, by decision: both references and all brand material are light. Revisit only if asked.
- No generic AI-default UI: no indigo/violet gradients, glassmorphism, emoji icons, lorem ipsum, invented stats, testimonials or partner logos. Real copy from `site.ts` or ask.
- Photos: real program photos only. Many arrived as Instagram screenshots; crop out app chrome before use. Don't name people in alt text unless you're sure who they are.
- Screenshot loop for every visual task: shoot target and local, compare concretely, iterate.

## Content facts
- Live counters: 530 pairs · 10 communities · $10 per pair (confirmed by Edna, Nov 2026). The `communities` list in `site.ts` must add up to the pairs counter.
- Project 1 Million: goal 1,000,000 pairs; the progress bar tracks `project.nextMilestone` (1,000).
- Partners: Triple A Foundation, Ahofade, Cosmo Cosmetics (logos in `public/partners/`), Emerald Chain Hub, Evolve.You, The Adelaide Vera (no logo yet, shown as name tiles).
- SDG Goal 8 copy: Edna's draft had placeholders (who is paid, where, how many jobs). Filled with the known fact (10 local shoemakers, materials sourced in Ghana); replace when she sends real numbers.
- Contact: shoefortheshoeless@gmail.com · 053 916 0861 · Instagram @shoe_4_the_shoeless_official · LinkedIn linkedin.com/company/linkedgh.

## Conventions
- No `any`; lint errors fail.
- Forms: React Hook Form + Zod (schema co-located with the form).
- Secrets only via server `process.env`; never add them to `next.config.ts` `env`.

## Text generation
- No em-dashes in generated code, comments, or docs.
