# Shoe for Shoeless - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment Variables

Copy `.env.local` and add your API keys:

```bash
# MongoDB (choose one)
MONGODB_URI=mongodb://localhost:27017/shoeforshoeless
# OR
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shoeforshoeless

# Get API keys from payment providers
PAYSTACK_PUBLIC_KEY=pk_test_xxx
PAYSTACK_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
PAYPAL_CLIENT_ID=xxx
PAYPAL_CLIENT_SECRET=xxx
```

### 3. Run Development Server
```bash
pnpm run dev
```

Visit http://localhost:3000

### 4. Test Donations

Use test credentials:
- **Stripe**: 4242 4242 4242 4242
- **Paystack**: 4084 0840 8408 4081 (PIN: 0000, OTP: 123456)
- **PayPal**: Use sandbox account

## Payment Provider Setup

### Paystack
1. Sign up: https://paystack.com
2. Dashboard → Settings → API Keys
3. Copy test keys to `.env.local`

### Stripe
1. Sign up: https://stripe.com
2. Dashboard → Developers → API keys
3. Copy test keys to `.env.local`
4. Create webhook: `https://yourdomain.com/api/webhooks/stripe`
5. Add webhook secret to `.env.local`

### PayPal
1. Sign up: https://developer.paypal.com
2. Create sandbox app
3. Copy credentials to `.env.local`

## MongoDB Setup

### Option A: MongoDB Atlas (Recommended)
1. Create account: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI`

### Option B: Local MongoDB
1. Install MongoDB
2. Start service
3. Use `mongodb://localhost:27017/shoeforshoeless`

## Deployment

### Vercel (Recommended)
```bash
pnpm add -g vercel
vercel
```

Add environment variables in Vercel dashboard.

### Production Checklist
- [ ] Switch to production API keys
- [ ] Update `NEXT_PUBLIC_BASE_URL`
- [ ] Configure production MongoDB
- [ ] Set up webhook endpoints
- [ ] Test all payment methods
- [ ] Enable SSL

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Homepage
├── components/       # React components
├── lib/
│   ├── mongodb.ts    # Database connection
│   └── payments/     # Payment handlers
└── models/           # Database schemas
```

## Available Scripts

```bash
pnpm run dev      # Start development server
pnpm run build    # Build for production
pnpm run start    # Start production server
pnpm run lint     # Run ESLint
```

## Support

See [walkthrough.md](file:///C:/Users/Doxa/.gemini/antigravity/brain/ffbdcf81-29cc-4e6b-a6b1-aeda55d634df/walkthrough.md) for detailed documentation.
