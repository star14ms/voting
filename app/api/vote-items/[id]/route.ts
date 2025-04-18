import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    // Check if the item exists
    const existingItem = await prisma.voteItem.findUnique({
      where: { id },
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: 'VoteItem not found' },
        { status: 404 }
      );
    }

    // Delete the item
    await prisma.voteItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting vote item:', error);
    return NextResponse.json(
      { error: 'Failed to delete vote item' },
      { status: 500 }
    );
  }
} 