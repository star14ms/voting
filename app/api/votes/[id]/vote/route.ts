import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { itemId } = await request.json();

    // Find the vote item vote record
    const voteItemVote = await prisma.voteItemVote.findUnique({
      where: {
        voteItemId_voteId: {
          voteItemId: itemId,
          voteId: parseInt(params.id),
        },
      },
    });

    if (!voteItemVote) {
      return NextResponse.json(
        { error: 'Vote item not found' },
        { status: 404 }
      );
    }

    // Increment the vote count
    const updatedVoteItemVote = await prisma.voteItemVote.update({
      where: {
        id: voteItemVote.id,
      },
      data: {
        voteCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(updatedVoteItemVote);
  } catch (error) {
    console.error('Error voting:', error);
    return NextResponse.json(
      { error: 'Failed to vote' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { itemId } = await request.json();

    // Find the vote item vote record
    const voteItemVote = await prisma.voteItemVote.findUnique({
      where: {
        voteItemId_voteId: {
          voteItemId: itemId,
          voteId: parseInt(params.id),
        },
      },
    });

    if (!voteItemVote) {
      return NextResponse.json(
        { error: 'Vote item not found' },
        { status: 404 }
      );
    }

    // Decrement the vote count
    const updatedVoteItemVote = await prisma.voteItemVote.update({
      where: {
        id: voteItemVote.id,
      },
      data: {
        voteCount: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json(updatedVoteItemVote);
  } catch (error) {
    console.error('Error removing vote:', error);
    return NextResponse.json(
      { error: 'Failed to remove vote' },
      { status: 500 }
    );
  }
} 