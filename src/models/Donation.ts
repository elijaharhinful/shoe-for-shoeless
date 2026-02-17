import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDonation extends Document {
  // Donor Information
  donorName?: string;
  donorEmail?: string;
  donorPhone?: string;
  
  // Payment Details
  amount: number;
  currency: string;
  paymentMethod: 'paystack' | 'stripe' | 'paypal' | 'card' | 'google_pay';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionReference: string;
  
  // Campaign Information
  campaignType: 'general' | 'sponsor_child' | 'sponsor_village' | 'volunteer' | 'donate_shoes';
  message?: string;
  
  // Metadata
  paymentMetadata?: Record<string, unknown>;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema: Schema = new Schema(
  {
    donorName: {
      type: String,
      trim: true,
    },
    donorEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    donorPhone: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: 'USD',
      uppercase: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['paystack', 'stripe', 'paypal', 'card', 'google_pay'],
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    transactionReference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    campaignType: {
      type: String,
      required: true,
      enum: ['general', 'sponsor_child', 'sponsor_village', 'volunteer', 'donate_shoes'],
      default: 'general',
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    paymentMetadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
DonationSchema.index({ paymentStatus: 1, createdAt: -1 });
DonationSchema.index({ donorEmail: 1 });
DonationSchema.index({ campaignType: 1 });

const Donation: Model<IDonation> =
  mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);

export default Donation;
