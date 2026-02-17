// API Route: Get Campaigns and Statistics
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Campaign from '@/models/Campaign';
import Donation from '@/models/Donation';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get active campaigns
    const campaigns = await Campaign.find({ status: 'active' })
      .sort({ createdAt: -1 })
      .limit(10);

    // Get donation statistics
    const stats = await Donation.aggregate([
      {
        $match: {
          paymentStatus: 'completed',
        },
      },
      {
        $group: {
          _id: null,
          totalDonations: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    // Get campaign-specific stats
    const campaignStats = await Donation.aggregate([
      {
        $match: {
          paymentStatus: 'completed',
        },
      },
      {
        $group: {
          _id: '$campaignType',
          count: { $sum: 1 },
          total: { $sum: '$amount' },
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      campaigns,
      statistics: {
        totalDonations: stats[0]?.totalDonations || 0,
        totalAmount: stats[0]?.totalAmount || 0,
        campaignBreakdown: campaignStats,
      },
    });
  } catch (error) {
    console.error('Campaigns fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}
