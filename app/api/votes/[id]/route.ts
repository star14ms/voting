import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { VoteItem, VoteItemVote } from '@prisma/client';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if we're on the create page (no ID provided)
    if (!params.id || params.id === 'create') {
      return NextResponse.json({ error: 'No vote ID provided' }, { status: 400 });
    }

    const voteId = parseInt(params.id);
    
    // Get the vote with all items
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
    console.error('Error fetching vote:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vote' },
      { status: 500 }
    );
  }
} 