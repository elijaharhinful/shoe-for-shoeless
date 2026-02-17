// API Route: Paystack Webhook Handler
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Donation from '@/models/Donation';
import { verifyPaystackWebhook } from '@/lib/payments/paystack';

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-paystack-signature');
    
    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      );
    }

    const body = await request.text();
    
    // Verify webhook signature
    const isValid = verifyPaystackWebhook(signature, body);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const event = JSON.parse(body);

    // Handle charge.success event
    if (event.event === 'charge.success') {
      await connectDB();

      const reference = event.data.reference;
      const donation = await Donation.findOne({ transactionReference: reference });

      if (donation) {
        donation.paymentStatus = 'completed';
        donation.paymentMetadata = {
          ...donation.paymentMetadata,
          paystackEvent: event.data,
        };
        await donation.save();
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Paystack webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
