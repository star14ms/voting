import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { VoteItem, VoteItemVote } from '@prisma/client';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const voteId = parseInt(params.id);
    
    // Reset all vote counts to zero for this vote
    await prisma.voteItemVote.updateMany({
      where: {
        voteId: voteId
      },
      data: {
        voteCount: 0
      }
    });

    // Get the updated vote with all items
    const vote = await prisma.vote.findUnique({
      where: { id: voteId },
      include: {
        items: {
          include: {
            itemVotes: true
          }
        }
      }
    });

    if (!vote) {
      return NextResponse.json({ error: 'Vote not found' }, { status: 404 });
    }

    // Transform the data to include voteCount
    const transformedVote = {
      ...vote,
      items: vote.items.map((item: VoteItem & { itemVotes: VoteItemVote[] }) => ({
        ...item,
        voteCount: item.itemVotes[0]?.voteCount || 0
      }))
    };

    return NextResponse.json(transformedVote);
  } catch (error) {
    console.error('Error resetting votes:', error);
    return NextResponse.json(
      { error: 'Failed to reset votes' },
      { status: 500 }
    );
  }
} 