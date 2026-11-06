# CLAUDE.md: Shoe for the Shoeless

## What this is
Donation website for **Shoe for the Shoeless** (shoefortheshoeless.org), a Ghanaian initiative led by founder Edna Frimpong ("The ShoemakerGurl") that makes durable, locally handmade shoes and fits them in person for school children who walk to school barefoot. Visitors are Ghanaian and diaspora donors, corporate/church sponsors, and volunteers. The one job of the home page: get a donation (Paystack) or a partnership email.

## Stack & layout
- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · pnpm. Single repo, no separate backend (API lives in `src/app/api/*` route handlers), so Orval does not apply.
- MongoDB via Mongoose (`src/lib/mongodb.ts`, `src/models/*`) stores donation records.
- `src/content/site.ts`: **all copy, stats, contacts, presets.** Edit numbers here, never in components.
- `src/components/`: `Header`, `Hero`, `DonateForm`, `Footer`, `ui.tsx` (Button, ButtonLink, Eyebrow, Container), `sections/*` (one file per home section).
- `src/app/thank-you/`: Paystack callback page; verifies server-side via `src/lib/donations.ts`.
- `public/brand/` logo PNGs (white/maroon, full lockup + mark). `public/images/` program photos (EXIF stripped). `public/videos/` hero loop (mp4+webm, muted) and full film.
- Source material (photos, PDFs, raw video) lives outside the repo in `C:\Users\Doxa\Desktop\web\Edna\`. Raw films are on Google Drive (see `Edna/instruction.txt`).

## Commands
- `pnpm dev`: dev server on :3000
- `pnpm build`: production build (also type-checks)
- `pnpm lint`: ESLint; must pass clean
- `node screenshot.mjs <url> <label> [--full|--mobile|--tablet|--selector=".x"]`: design screenshots into `screenshots/` (git-ignored)

## Payments (non-negotiable)
- **Paystack only, for now.** GHS, channels card + mobile_money + bank_transfer. Stripe/PayPal code exists but is not exposed in the UI.
- Flow: `DonateForm` -> `POST /api/donations/create` (creates pending Donation, initializes Paystack) -> Paystack checkout -> `/thank-you?reference=` (server verifies, checks amount) + `POST /api/webhooks/paystack` (HMAC-SHA512 of raw body, amount check).
- Amounts are cedis in the DB; Paystack gets pesewas via `Math.round(amount * 100)`.
- Never trust the client amount on confirm: always compare Paystack's charged amount with the stored donation.
- Direct Mobile Money fallback number is shown on the page and in errors: 053 916 0861 (Edna Frimpong).

## Design system (non-negotiable)
Own brand system derived from the logo and campaign artwork. Layout references: food4education.org (huge confident type, bold color-blocked sections, odometer counters) and soles4souls.org (video hero with donation form on top). Match their structure and feel, never their branding or copy.
- Tokens live in `src/app/globals.css` `@theme`. Use theme keys, no raw hex in markup.
  - maroon-700 `#7a1332` brand · maroon-800/900/950 dark sections
  - flame-500 `#ff4e45` primary action (Donate buttons, the Big Idea band) · flame-600 hover
  - gold-500 `#fac55d` numbers and highlights on dark
  - blush-50/100/200 page backgrounds (warm paper, from the sponsorship deck)
  - ink / ink-muted text
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
- Live counters come from `Edna/instruction.txt`: 530 pairs · 7 schools · $10 per pair. Older docs show 183/187 pairs and 200 GHS or 50 GHS per pair. instruction.txt is the newest; confirm before changing.
- Partners (2025 wrap-up): Ahofade Cosmo Cosmetics, Evolve.You, The Adelaide Vera.
- Contact: shoefortheshoeless@gmail.com · 053 916 0861 · Instagram @shoe_4_the_shoeless.

## Conventions
- No `any`; lint errors fail.
- Forms: React Hook Form + Zod (schema co-located with the form).
- Secrets only via server `process.env`; never add them to `next.config.ts` `env`.

## Text generation
- No em-dashes in generated code, comments, or docs.
