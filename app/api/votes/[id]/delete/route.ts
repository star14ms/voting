import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const voteId = parseInt(params.id);
    
    // First, delete all VoteItemVotes related to this vote
    await prisma.voteItemVote.deleteMany({
      where: {
        voteId: voteId
      }
    });

    // Then, delete the vote itself
    await prisma.vote.delete({
      where: {
        id: voteId
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting vote:', error);
    return NextResponse.json(
      { error: 'Failed to delete vote' },
      { status: 500 }
    );
  }
} 