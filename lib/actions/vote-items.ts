'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteVoteItem(id: number) {
  try {
    // Check if the item is being used in any votes
    const votes = await prisma.voteItemVote.findMany({
      where: {
        voteItemId: id
      },
      include: {
        vote: true
      }
    });

    if (votes.length > 0) {
      const voteTitles = votes.map(v => v.vote.title);
      return { error: '사용 중인 항목', votes: voteTitles };
    }

    await prisma.voteItem.delete({
      where: { id }
    });

    revalidatePath('/vote-items');
    return { success: true };
  } catch (error) {
    console.error('Error deleting vote item:', error);
    throw new Error('투표 항목 삭제에 실패했습니다');
  }
}

export async function getVoteItems() {
  try {
    const items = await prisma.voteItem.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return items.map(item => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching vote items:', error);
    throw new Error('투표 항목을 불러오는데 실패했습니다');
  }
} 