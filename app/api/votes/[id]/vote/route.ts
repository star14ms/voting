import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { itemId } = await request.json();
    const voteId = parseInt(params.id);

    // Check if the vote exists
    const vote = await prisma.vote.findUnique({
      where: { id: voteId },
    });

    if (!vote) {
      return NextResponse.json({ error: 'Vote not found' }, { status: 404 });
    }

    // Check if the vote item exists
    const voteItem = await prisma.voteItem.findUnique({
      where: { id: itemId },
    });

    if (!voteItem) {
      return NextResponse.json({ error: 'Vote item not found' }, { status: 404 });
    }

    // Update or create the vote count
    await prisma.voteItemVote.upsert({
      where: {
        voteItemId_voteId: {
          voteItemId: itemId,
          voteId: voteId,
        },
      },
      update: {
        voteCount: {
          increment: 1,
        },
      },
      create: {
        voteItemId: itemId,
        voteId: voteId,
        voteCount: 1,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing vote:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 