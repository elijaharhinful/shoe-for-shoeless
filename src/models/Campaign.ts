import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICampaign extends Document {
  name: string;
  description: string;
  type: 'general' | 'sponsor_child' | 'sponsor_village' | 'donate_shoes' | 'volunteer';
  
  // Financial Goals
  targetAmount?: number;
  currentAmount: number;
  currency: string;
  
  // Status
  status: 'active' | 'completed' | 'paused' | 'archived';
  
  // Media
  imageUrl?: string;
  images?: string[];
  
  // Impact Metrics
  impactMetrics?: {
    shoesDistributed?: number;
    villagesReached?: number;
    childrenHelped?: number;
    volunteersEngaged?: number;
  };
  
  // Dates
  startDate?: Date;
  endDate?: Date;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const CampaignSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['general', 'sponsor_child', 'sponsor_village', 'donate_shoes', 'volunteer'],
    },
    targetAmount: {
      type: Number,
      min: 0,
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'completed', 'paused', 'archived'],
      default: 'active',
    },
    imageUrl: {
      type: String,
    },
    images: [{
      type: String,
    }],
    impactMetrics: {
      shoesDistributed: { type: Number, default: 0 },
      villagesReached: { type: Number, default: 0 },
      childrenHelped: { type: Number, default: 0 },
      volunteersEngaged: { type: Number, default: 0 },
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
CampaignSchema.index({ status: 1, type: 1 });
CampaignSchema.index({ startDate: -1 });

const Campaign: Model<ICampaign> =
  mongoose.models.Campaign || mongoose.model<ICampaign>('Campaign', CampaignSchema);

export default Campaign;
