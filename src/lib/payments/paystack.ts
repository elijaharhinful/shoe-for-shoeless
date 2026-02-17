// Paystack Payment Handler
import axios from 'axios';

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
  metadata?: Record<string, unknown>
): Promise<PaystackInitializeResponse> {
  try {
    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: amount * 100, // Paystack expects amount in kobo (smallest currency unit)
        reference,
        metadata,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/donations/verify?reference=${reference}`,
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
  const crypto = require('crypto');
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(body))
    .digest('hex');
  
  return hash === signature;
}
