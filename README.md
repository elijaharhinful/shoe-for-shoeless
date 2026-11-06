# Shoe for the Shoeless

Donation website for [shoefortheshoeless.org](https://shoefortheshoeless.org): durable, locally handmade shoes for school children in Ghana.

## Run it

```bash
pnpm install
cp .env.local.example .env.local   # then fill in MongoDB + Paystack keys
pnpm dev                           # http://localhost:3000
```

## Edit content

All copy, live counters (pairs, schools, cost per pair), donation presets, partners and contact details are in [`src/content/site.ts`](src/content/site.ts).

## Donations (Paystack)

1. Donor picks an amount in GHS and enters name + email on the home page.
2. `POST /api/donations/create` saves a pending donation and opens Paystack checkout (card, Mobile Money, bank).
3. Paystack returns the donor to `/thank-you`, which confirms the payment server-side.
4. `POST /api/webhooks/paystack` also confirms it. Register that URL in the Paystack dashboard once the site is live.

Test card: `4084 0840 8408 4081`, any future expiry, CVV `408`, PIN `0000`, OTP `123456`.

## Going live checklist

- [ ] Real `MONGODB_URI` (Atlas) in production env
- [ ] Switch to `sk_live_` / `pk_live_` Paystack keys
- [ ] `NEXT_PUBLIC_BASE_URL=https://shoefortheshoeless.org`
- [ ] Register the webhook URL in Paystack
- [ ] Point the domain's DNS at the host (e.g. Vercel)

## Design workflow

See [`CLAUDE.md`](CLAUDE.md) for the design system and conventions. Screenshot tool: `node screenshot.mjs <url> <label> [--full|--mobile|--selector=".x"]`.
