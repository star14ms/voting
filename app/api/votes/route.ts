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
    
    // Get existing items IDs if any
    const existingItemsStr = formData.get('existingItems');
    const existingItems = existingItemsStr ? JSON.parse(existingItemsStr as string) : [];

    // Create the vote
    const vote = await prisma.vote.create({
      data: {
        title,
        type,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        image,
      },
    });

    // Handle existing items
    for (const itemId of existingItems) {
      await prisma.voteItemVote.create({
        data: {
          voteId: vote.id,
          voteItemId: itemId,
          voteCount: 0
        }
      });
    }

    // Handle new or modified items
    const itemKeys = Array.from(formData.keys())
      .filter(key => key.startsWith('items['))
      .map(key => key.match(/items\[(\d+)\]/)?.[1])
      .filter((value, index, self) => value && self.indexOf(value) === index);

    for (const index of itemKeys) {
      const name = formData.get(`items[${index}].name`) as string;
      const description = formData.get(`items[${index}].description`) as string;
      const image = formData.get(`items[${index}].image`) as string;

      if (name && description && image) {
        // Create new vote item
        const voteItem = await prisma.voteItem.create({
          data: {
            name,
            description,
            image
          }
        });

        // Link it to the vote
        await prisma.voteItemVote.create({
          data: {
            voteId: vote.id,
            voteItemId: voteItem.id,
            voteCount: 0
          }
        });
      }
    }

    // Return the created vote with all its items
    const createdVote = await prisma.vote.findUnique({
      where: { id: vote.id },
      include: {
        voteItemVote: {
          include: {
            voteItem: true
          }
        }
      }
    });

    return NextResponse.json(createdVote);
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
        voteItemVote: {
          include: {
            voteItem: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
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