'use server';

import { prisma } from "@/lib/prisma";

export async function voteForItem(voteId: number, itemId: number) {
  try {
    const voteItemVote = await prisma.voteItemVote.upsert({
      where: {
        voteItemId_voteId: {
          voteItemId: itemId,
          voteId: voteId,
        },
      },
      update: {
        voteCount: {
          increment: 1,
        },
      },
      create: {
        voteItemId: itemId,
        voteId: voteId,
        voteCount: 1,
      },
    });
    return { success: true, voteItemVote };
  } catch (error) {
    console.error('Error voting for item:', error);
    return { success: false, error: 'Failed to vote for item' };
  }
}

export async function voteForCelebrity(voteId: number, voteItemId: number) {
  try {
    const voteItemVote = await prisma.voteItemVote.upsert({
      where: {
        voteItemId_voteId: {
          voteItemId: voteItemId,
          voteId: voteId,
        },
      },
      update: {
        voteCount: {
          increment: 1,
        },
      },
      create: {
        voteItemId: voteItemId,
        voteId: voteId,
        voteCount: 1,
      },
    });
    return { success: true, voteItemVote };
  } catch (error) {
    console.error('Error voting for celebrity:', error);
    return { success: false, error: 'Failed to vote for celebrity' };
  }
}

export async function voteForTVShow(voteId: number, voteItemId: number) {
  try {
    const voteItemVote = await prisma.voteItemVote.upsert({
      where: {
        voteItemId_voteId: {
          voteItemId: voteItemId,
          voteId: voteId,
        },
      },
      update: {
        voteCount: {
          increment: 1,
        },
      },
      create: {
        voteItemId: voteItemId,
        voteId: voteId,
        voteCount: 1,
      },
    });
    return { success: true, voteItemVote };
  } catch (error) {
    console.error('Error voting for TV show:', error);
    return { success: false, error: 'Failed to vote for TV show' };
  }
} 