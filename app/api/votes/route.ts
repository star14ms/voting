import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const type = formData.get('type') as 'CELEBRITY' | 'TVSHOW';
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const image = formData.get('image') as string;
    const selectedItems = formData.getAll('selectedItems') as string[];

    // Create the vote
    const vote = await prisma.vote.create({
      data: {
        title,
        type,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        image,
      } as Prisma.VoteCreateInput,
    });

    // Connect selected items to the vote
    for (const itemId of selectedItems) {
      await prisma.voteItemVote.create({
        data: {
          voteId: vote.id,
          voteItemId: parseInt(itemId),
        },
      });
    }

    return NextResponse.json(vote);
  } catch (error) {
    console.error('Error creating vote:', error);
    return NextResponse.json(
      { error: 'Failed to create vote' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const votes = await prisma.vote.findMany({
      include: {
        items: {
          include: {
            itemVotes: true,
          },
        },
      },
    });

    return NextResponse.json(votes);
  } catch (error) {
    console.error('Error fetching votes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch votes' },
      { status: 500 }
    );
  }
} 