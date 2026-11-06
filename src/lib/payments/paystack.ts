// Paystack Payment Handler
import axios from 'axios';
import { createHmac, timingSafeEqual } from 'node:crypto';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

export interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    status: 'success' | 'failed' | 'abandoned';
    reference: string;
    amount: number;
    currency: string;
    paid_at: string;
    customer: {
      email: string;
      customer_code: string;
    };
  };
}

/**
 * Initialize a Paystack transaction
 */
export async function initializePaystackPayment(
  email: string,
  amount: number,
  reference: string,
  metadata?: Record<string, unknown>,
  currency: string = 'GHS'
): Promise<PaystackInitializeResponse> {
  try {
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        // Paystack expects the smallest currency unit (pesewas for GHS). Round to avoid float drift.
        amount: Math.round(amount * 100),
        currency,
        reference,
        metadata,
        // Card + Mobile Money cover almost every Ghanaian donor.
        channels: ['card', 'mobile_money', 'bank_transfer'],
        // Donor lands on a real page that verifies the payment server-side.
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you?reference=${reference}`,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Paystack initialization error:', error);
    throw new Error('Failed to initialize Paystack payment');
  }
}

/**
 * Verify a Paystack transaction
 */
export async function verifyPaystackPayment(
  reference: string
): Promise<PaystackVerifyResponse> {
  try {
    const response = await axios.get(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Paystack verification error:', error);
    throw new Error('Failed to verify Paystack payment');
  }
}

/**
 * Verify Paystack webhook signature
 */
export function verifyPaystackWebhook(signature: string, body: string): boolean {
  // HMAC the raw request body exactly as received (stringifying it again adds quotes and never matches).
  const hash = createHmac('sha512', PAYSTACK_SECRET_KEY).update(body).digest('hex');
  const a = Buffer.from(hash, 'utf8');
  const b = Buffer.from(signature, 'utf8');
  return a.length === b.length && timingSafeEqual(a, b);
}
