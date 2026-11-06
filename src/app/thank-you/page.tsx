import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { confirmPaystackDonation, type DonationOutcome } from '@/lib/donations';
import { site } from '@/content/site';
import { ButtonLink } from '@/components/ui';

export const metadata: Metadata = { title: 'Thank you', robots: { index: false } };
export const dynamic = 'force-dynamic';

async function outcomeFor(reference?: string): Promise<DonationOutcome> {
  if (!reference) return { status: 'not_found' };
  try {
    return await confirmPaystackDonation(reference);
  } catch (err) {
    console.error('Thank-you verification failed:', err);
    return { status: 'pending' };
  }
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string; trxref?: string }>;
}) {
  const sp = await searchParams;
  const reference = sp.reference ?? sp.trxref;
  const outcome = await outcomeFor(reference);

  const content = {
    completed: {
      icon: <CheckCircle2 className="size-14 text-gold-500" aria-hidden />,
      title:
        outcome.status === 'completed' && outcome.donorName
          ? `Thank you, ${outcome.donorName.split(' ')[0]}.`
          : 'Thank you.',
      body:
        outcome.status === 'completed'
          ? `Your gift of ${outcome.currency} ${outcome.amount.toLocaleString()} is confirmed. A receipt is on its way to your inbox. You just helped a child walk to school in shoes.`
          : '',
    },
    pending: {
      icon: <Clock className="size-14 text-gold-500" aria-hidden />,
      title: 'Almost there.',
      body: 'We’re waiting for your payment to confirm. If you paid with Mobile Money, approve the prompt on your phone. This can take a minute; you’ll get an email receipt once it clears.',
    },
    failed: {
      icon: <XCircle className="size-14 text-flame-300" aria-hidden />,
      title: 'The payment didn’t go through.',
      body: 'No money was taken. You can try again, or give directly by Mobile Money.',
    },
    not_found: {
      icon: <XCircle className="size-14 text-flame-300" aria-hidden />,
      title: 'We couldn’t find that donation.',
      body: `If you were charged, email us at ${site.contact.email} with your payment reference and we’ll sort it out.`,
    },
  }[outcome.status];

  return (
    <main className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden bg-maroon-950 px-5 py-20 text-white">
      <Image src="/images/hero-poster.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-maroon-950/70 to-maroon-950" />

      <div className="w-full max-w-xl text-center">
        <Link href="/" aria-label={`${site.name} home`} className="inline-block">
          <Image src="/brand/logo-white.png" alt={site.name} width={446} height={132} className="mx-auto h-12 w-auto" />
        </Link>
        <div className="mt-14 flex justify-center">{content.icon}</div>
        <h1 className="mt-6 font-display text-5xl font-black tracking-[-0.02em] sm:text-6xl">{content.title}</h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-white/80">{content.body}</p>

        {outcome.status !== 'completed' && (
          <p className="mt-6 text-white/70">
            Mobile Money: <strong className="text-white">{site.contact.momo.number}</strong> ({site.contact.momo.name})
          </p>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {outcome.status === 'failed' ? (
            <ButtonLink href="/#donate">Try again</ButtonLink>
          ) : (
            <ButtonLink href={site.social.instagram} target="_blank" rel="noopener noreferrer">
              Follow the journey
            </ButtonLink>
          )}
          <ButtonLink href="/" tone="outline-light">
            Back to home
          </ButtonLink>
        </div>
        {reference && <p className="mt-10 text-xs text-white/40">Reference: {reference}</p>}
      </div>
    </main>
  );
}
