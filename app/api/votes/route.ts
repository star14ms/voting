import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const type = formData.get('type') as string;
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const image = formData.get('image') as string;

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

    // Get all items from the form data
    const items: { id?: string; name: string; description: string; image: string }[] = [];
    let index = 0;
    while (formData.has(`items[${index}][name]`)) {
      items.push({
        id: formData.get(`items[${index}][id]`) as string,
        name: formData.get(`items[${index}][name]`) as string,
        description: formData.get(`items[${index}][description]`) as string,
        image: formData.get(`items[${index}][image]`) as string,
      });
      index++;
    }

    // Create or connect items
    for (const item of items) {
      if (item.id) {
        // Connect existing item
        await prisma.voteItemVote.create({
          data: {
            voteId: vote.id,
            voteItemId: parseInt(item.id),
          },
        });
      } else {
        // Create new item
        const voteItem = await prisma.voteItem.create({
          data: {
            name: item.name,
            description: item.description,
            image: item.image,
            vote: {
              connect: {
                id: vote.id,
              },
            },
          } as Prisma.VoteItemCreateInput,
        });

        await prisma.voteItemVote.create({
          data: {
            voteId: vote.id,
            voteItemId: voteItem.id,
          },
        });
      }
    }

    return NextResponse.json({ success: true, vote });
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
        items: true,
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