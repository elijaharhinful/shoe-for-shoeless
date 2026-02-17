// Stripe Payment Handler
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export interface StripePaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

/**
 * Create a Stripe Payment Intent
 */
export async function createStripePaymentIntent(
  amount: number,
  currency: string = 'usd',
  metadata?: Record<string, string>
): Promise<StripePaymentIntentResponse> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency: currency.toLowerCase(),
      metadata: metadata || {},
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret!,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error('Stripe payment intent creation error:', error);
    throw new Error('Failed to create Stripe payment intent');
  }
}

/**
 * Retrieve a Stripe Payment Intent
 */
export async function retrieveStripePaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Stripe payment intent retrieval error:', error);
    throw new Error('Failed to retrieve Stripe payment intent');
  }
}

/**
 * Verify Stripe webhook signature
 */
export function verifyStripeWebhook(
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  try {
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    return event;
  } catch (error) {
    console.error('Stripe webhook verification error:', error);
    throw new Error('Invalid Stripe webhook signature');
  }
}

/**
 * Create a Stripe Checkout Session (alternative payment flow)
 */
export async function createStripeCheckoutSession(
  amount: number,
  currency: string = 'usd',
  successUrl: string,
  cancelUrl: string,
  metadata?: Record<string, string>
) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'google_pay'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: 'Donation to Shoe for Shoeless',
              description: 'Your contribution helps provide shoes to those in need',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: metadata || {},
    });

    return session;
  } catch (error) {
    console.error('Stripe checkout session creation error:', error);
    throw new Error('Failed to create Stripe checkout session');
  }
}

export { stripe };
