'use server';

import { prisma } from "@/lib/prisma";

export async function voteForCelebrity(celebrityId: number) {
  try {
    const vote = await prisma.vote.create({
      data: {
        celebrityId,
      },
    });
    return { success: true, vote };
  } catch (error) {
    console.error('Error voting for celebrity:', error);
    return { success: false, error: 'Failed to vote for celebrity' };
  }
}

export async function voteForTVShow(tvShowId: number) {
  try {
    const vote = await prisma.vote.create({
      data: {
        tvShowId,
      },
    });
    return { success: true, vote };
  } catch (error) {
    console.error('Error voting for TV show:', error);
    return { success: false, error: 'Failed to vote for TV show' };
  }
} 