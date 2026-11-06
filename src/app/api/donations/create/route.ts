// API Route: Create Donation
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Donation from '@/models/Donation';
import { generateTransactionReference, validatePaymentAmount, resolvePaymentProvider } from '@/lib/payments';
import { initializePaystackPayment } from '@/lib/payments/paystack';
import { createStripePaymentIntent } from '@/lib/payments/stripe';
import { createPayPalOrder } from '@/lib/payments/paypal';
import type { PaymentMethod } from '@/lib/payments';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      amount,
      currency = 'GHS',
      paymentMethod,
      donorName,
      donorEmail,
      donorPhone,
      campaignType = 'general',
      message,
    } = body;

    // Validation
    if (!amount || !paymentMethod) {
      return NextResponse.json(
        { error: 'Amount and payment method are required' },
        { status: 400 }
      );
    }

    if (!validatePaymentAmount(amount)) {
      return NextResponse.json(
        { error: 'Invalid amount. Must be between 1 and 1,000,000' },
        { status: 400 }
      );
    }

    // Generate unique transaction reference
    const reference = generateTransactionReference('DON');

    // Resolve payment provider
    const { provider } = resolvePaymentProvider(paymentMethod as PaymentMethod);

    // Create donation record
    const donation = await Donation.create({
      donorName,
      donorEmail,
      donorPhone,
      amount,
      currency: currency.toUpperCase(),
      paymentMethod,
      paymentStatus: 'pending',
      transactionReference: reference,
      campaignType,
      message,
    });

    // Initialize payment based on provider
    const paymentData: {
      paymentUrl?: string;
      clientSecret?: string;
      orderId?: string;
    } = {};

    try {
      switch (provider) {
        case 'paystack':
          if (!donorEmail) {
            return NextResponse.json(
              { error: 'Email is required for Paystack payments' },
              { status: 400 }
            );
          }
          const paystackResponse = await initializePaystackPayment(
            donorEmail,
            amount,
            reference,
            { donationId: donation._id.toString(), campaignType, donorName },
            currency.toUpperCase()
          );
          paymentData.paymentUrl = paystackResponse.data.authorization_url;
          break;

        case 'stripe':
          const stripeResponse = await createStripePaymentIntent(
            amount,
            currency,
            {
              donationId: donation._id.toString(),
              campaignType,
              reference,
            }
          );
          paymentData.clientSecret = stripeResponse.clientSecret;
          
          // Update donation with payment intent ID
          donation.paymentMetadata = { paymentIntentId: stripeResponse.paymentIntentId };
          await donation.save();
          break;

        case 'paypal':
          const paypalResponse = await createPayPalOrder(amount, currency);
          paymentData.orderId = paypalResponse.orderId;
          
          // Find approval URL
          const approvalUrl = paypalResponse.links.find(
            (link) => link.rel === 'approve'
          );
          paymentData.paymentUrl = approvalUrl?.href;
          
          // Update donation with order ID
          donation.paymentMetadata = { orderId: paypalResponse.orderId };
          await donation.save();
          break;

        default:
          return NextResponse.json(
            { error: 'Unsupported payment method' },
            { status: 400 }
          );
      }

      return NextResponse.json({
        success: true,
        donationId: donation._id,
        reference,
        ...paymentData,
      });
    } catch (paymentError) {
      // Update donation status to failed
      donation.paymentStatus = 'failed';
      await donation.save();

      console.error('Payment initialization error:', paymentError);
      return NextResponse.json(
        { error: 'Failed to initialize payment' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Donation creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
