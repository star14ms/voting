import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const vote = await prisma.vote.findUnique({
      where: { id: parseInt(params.id) }
    });

    if (!vote) {
      return NextResponse.json(
        { error: 'Vote not found' },
        { status: 404 }
      );
    }

    // Reset all vote counts to 0
    await prisma.voteItemVote.updateMany({
      where: { voteId: parseInt(params.id) },
      data: { voteCount: 0 }
    });

    // Return the updated vote with all items
    const updatedVote = await prisma.vote.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        voteItemVote: {
          include: {
            voteItem: {
              select: {
                id: true,
                name: true,
                description: true,
                image: true,
              }
            }
          }
        }
      }
    });

    return NextResponse.json(updatedVote);
  } catch (error) {
    console.error('Error resetting votes:', error);
    return NextResponse.json(
      { error: 'Failed to reset votes' },
      { status: 500 }
    );
  }
} 