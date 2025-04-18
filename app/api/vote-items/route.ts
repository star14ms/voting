import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const voteItems = await prisma.voteItem.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
      },
    });

    return NextResponse.json(voteItems);
  } catch (error) {
    console.error('Error fetching vote items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vote items' },
      { status: 500 }
    );
  }
} 