// API Route: Stripe Webhook Handler
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Donation from '@/models/Donation';
import { verifyStripeWebhook } from '@/lib/payments/stripe';
import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('stripe-signature');
    
    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      );
    }

    const body = await request.text();
    
    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = verifyStripeWebhook(body, signature, webhookSecret);
    } catch (err) {
      console.error('Stripe webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Handle payment_intent.succeeded event
    if (event.type === 'payment_intent.succeeded') {
      await connectDB();

      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const donation = await Donation.findOne({
        'paymentMetadata.paymentIntentId': paymentIntent.id,
      });

      if (donation) {
        donation.paymentStatus = 'completed';
        donation.paymentMetadata = {
          ...donation.paymentMetadata,
          stripeEvent: paymentIntent,
        };
        await donation.save();
      }
    }

    // Handle payment_intent.payment_failed event
    if (event.type === 'payment_intent.payment_failed') {
      await connectDB();

      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const donation = await Donation.findOne({
        'paymentMetadata.paymentIntentId': paymentIntent.id,
      });

      if (donation) {
        donation.paymentStatus = 'failed';
        await donation.save();
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
