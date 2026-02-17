// API Route: Verify Donation Payment
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Donation from '@/models/Donation';
import { verifyPaystackPayment } from '@/lib/payments/paystack';
import { retrieveStripePaymentIntent } from '@/lib/payments/stripe';
import { capturePayPalOrder, getPayPalOrderDetails } from '@/lib/payments/paypal';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const reference = searchParams.get('reference');
    const paymentIntentId = searchParams.get('payment_intent');
    const orderId = searchParams.get('token'); // PayPal uses 'token' parameter

    if (!reference && !paymentIntentId && !orderId) {
      return NextResponse.json(
        { error: 'Payment reference is required' },
        { status: 400 }
      );
    }

    // Find donation
    let donation;
    if (reference) {
      donation = await Donation.findOne({ transactionReference: reference });
    } else if (paymentIntentId) {
      donation = await Donation.findOne({
        'paymentMetadata.paymentIntentId': paymentIntentId,
      });
    } else if (orderId) {
      donation = await Donation.findOne({
        'paymentMetadata.orderId': orderId,
      });
    }

    if (!donation) {
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      );
    }

    // If already completed, return success
    if (donation.paymentStatus === 'completed') {
      return NextResponse.json({
        success: true,
        status: 'completed',
        donation: {
          id: donation._id,
          amount: donation.amount,
          currency: donation.currency,
        },
      });
    }

    // Verify payment based on payment method
    try {
      switch (donation.paymentMethod) {
        case 'paystack':
          const paystackVerification = await verifyPaystackPayment(reference!);
          if (paystackVerification.data.status === 'success') {
            donation.paymentStatus = 'completed';
            await donation.save();
          } else {
            donation.paymentStatus = 'failed';
            await donation.save();
          }
          break;

        case 'stripe':
        case 'card':
        case 'google_pay':
          const intentId = paymentIntentId || donation.paymentMetadata?.paymentIntentId;
          if (!intentId) {
            throw new Error('Payment intent ID not found');
          }
          
          const paymentIntent = await retrieveStripePaymentIntent(intentId as string);
          if (paymentIntent.status === 'succeeded') {
            donation.paymentStatus = 'completed';
            await donation.save();
          } else if (paymentIntent.status === 'canceled' || paymentIntent.status === 'requires_payment_method') {
            donation.paymentStatus = 'failed';
            await donation.save();
          }
          break;

        case 'paypal':
          const paypalOrderId = orderId || donation.paymentMetadata?.orderId;
          if (!paypalOrderId) {
            throw new Error('PayPal order ID not found');
          }

          // Get order details first
          const orderDetails = await getPayPalOrderDetails(paypalOrderId as string);
          
          // Capture the order if it's approved
          if (orderDetails.status === 'APPROVED') {
            await capturePayPalOrder(paypalOrderId as string);
            donation.paymentStatus = 'completed';
            await donation.save();
          } else if (orderDetails.status === 'COMPLETED') {
            donation.paymentStatus = 'completed';
            await donation.save();
          } else {
            donation.paymentStatus = 'failed';
            await donation.save();
          }
          break;

        default:
          return NextResponse.json(
            { error: 'Unsupported payment method' },
            { status: 400 }
          );
      }

      return NextResponse.json({
        success: donation.paymentStatus === 'completed',
        status: donation.paymentStatus,
        donation: {
          id: donation._id,
          amount: donation.amount,
          currency: donation.currency,
          reference: donation.transactionReference,
        },
      });
    } catch (verificationError) {
      console.error('Payment verification error:', verificationError);
      donation.paymentStatus = 'failed';
      await donation.save();

      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Donation verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
