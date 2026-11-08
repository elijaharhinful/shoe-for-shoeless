// Server-only helpers for confirming donations after the donor returns from Paystack.
import 'server-only';
import connectDB from '@/lib/mongodb';
import Donation from '@/models/Donation';
import { verifyPaystackPayment } from '@/lib/payments/paystack';

export type DonationOutcome =
  | { status: 'completed'; amount: number; currency: string; amountUsd?: number; donorName?: string }
  | { status: 'pending' }
  | { status: 'failed' }
  | { status: 'not_found' };

/**
 * Look up a donation by its Paystack reference and confirm it with Paystack.
 * Safe to call repeatedly: a completed donation is returned as-is.
 */
export async function confirmPaystackDonation(reference: string): Promise<DonationOutcome> {
  await connectDB();

  const donation = await Donation.findOne({ transactionReference: reference });
  if (!donation) return { status: 'not_found' };

  const done = () =>
    ({
      status: 'completed',
      amount: donation.amount,
      currency: donation.currency,
      amountUsd: donation.amountUsd,
      donorName: donation.donorName,
    }) as const;

  if (donation.paymentStatus === 'completed') return done();

  const result = await verifyPaystackPayment(reference);
  const paidInFull = result.data.amount === Math.round(donation.amount * 100);

  if (result.data.status === 'success' && paidInFull) {
    donation.paymentStatus = 'completed';
    await donation.save();
    return done();
  }

  if (result.data.status === 'failed') {
    donation.paymentStatus = 'failed';
    await donation.save();
    return { status: 'failed' };
  }

  // 'abandoned' / 'ongoing': the donor may still finish (e.g. approving a Mobile Money prompt).
  return { status: 'pending' };
}
