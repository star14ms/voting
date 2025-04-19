'use server';

import { prisma } from '@/lib/prisma';
import { uploadToS3 } from '@/lib/s3';
import { revalidatePath } from 'next/cache';
import { VoteResponse } from '@/app/types';

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('파일이 없습니다');
    }

    const url = await uploadToS3(file);
    return { url };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('파일 업로드에 실패했습니다');
  }
}

export async function createVote(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const type = formData.get('type') as 'CELEBRITY' | 'TVSHOW';
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const image = formData.get('image') as string;
    const existingItems = JSON.parse(formData.get('existingItems') as string);
    const newItems = JSON.parse(formData.get('newItems') as string);

    const vote = await prisma.vote.create({
      data: {
        title,
        type,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        image,
        voteItemVote: {
          create: [
            ...existingItems.map((item: { id: number }) => ({
              voteItemId: item.id,
              voteCount: 0,
            })),
            ...newItems.map((item: { name: string; description: string; image: string }) => ({
              voteItem: {
                create: {
                  name: item.name,
                  description: item.description,
                  image: item.image,
                },
              },
              voteCount: 0,
            })),
          ],
        },
      },
    });

    revalidatePath('/');
    return vote;
  } catch (error) {
    console.error('Error creating vote:', error);
    throw new Error('투표 생성에 실패했습니다');
  }
}

export async function getVote(id: string) {
  try {
    const vote = await prisma.vote.findUnique({
      where: { id: Number(id) },
      include: {
        voteItemVote: {
          include: {
            voteItem: true
          }
        }
      }
    });

    if (!vote) {
      throw new Error('투표를 찾을 수 없습니다');
    }

    return vote;
  } catch (error) {
    console.error('Error fetching vote:', error);
    throw new Error('투표를 불러오는데 실패했습니다');
  }
}

export async function voteForItem(voteId: string, itemId: number) {
  try {
    const voteItemVote = await prisma.voteItemVote.findUnique({
      where: {
        voteItemId_voteId: {
          voteItemId: itemId,
          voteId: Number(voteId)
        }
      }
    });

    if (!voteItemVote) {
      throw new Error('투표 항목을 찾을 수 없습니다');
    }

    const updatedVoteItemVote = await prisma.voteItemVote.update({
      where: {
        voteItemId_voteId: {
          voteItemId: itemId,
          voteId: Number(voteId)
        }
      },
      data: {
        voteCount: {
          increment: 1
        }
      }
    });

    revalidatePath(`/votes/${voteId}`);
    return updatedVoteItemVote;
  } catch (error) {
    console.error('Error voting for item:', error);
    throw new Error('투표에 실패했습니다');
  }
}

export async function removeVote(voteId: string, itemId: number) {
  try {
    const voteItemVote = await prisma.voteItemVote.findUnique({
      where: {
        voteItemId_voteId: {
          voteItemId: itemId,
          voteId: Number(voteId)
        }
      }
    });

    if (!voteItemVote) {
      throw new Error('투표 항목을 찾을 수 없습니다');
    }

    const updatedVoteItemVote = await prisma.voteItemVote.update({
      where: {
        voteItemId_voteId: {
          voteItemId: itemId,
          voteId: Number(voteId)
        }
      },
      data: {
        voteCount: {
          decrement: 1
        }
      }
    });

    revalidatePath(`/votes/${voteId}`);
    return updatedVoteItemVote;
  } catch (error) {
    console.error('Error removing vote:', error);
    throw new Error('투표 취소에 실패했습니다');
  }
}

export async function resetVotes(voteId: string) {
  try {
    await prisma.voteItemVote.updateMany({
      where: {
        voteId: Number(voteId)
      },
      data: {
        voteCount: 0
      }
    });

    revalidatePath(`/votes/${voteId}`);
    return getVote(voteId);
  } catch (error) {
    console.error('Error resetting votes:', error);
    throw new Error('투표 초기화에 실패했습니다');
  }
}

export async function deleteVote(voteId: string) {
  try {
    // First delete all VoteItemVote records
    await prisma.voteItemVote.deleteMany({
      where: {
        voteId: Number(voteId)
      }
    });

    // Then delete the vote
    await prisma.vote.delete({
      where: {
        id: Number(voteId)
      }
    });

    revalidatePath('/');
  } catch (error) {
    console.error('Error deleting vote:', error);
    throw new Error('투표 삭제에 실패했습니다');
  }
}

export async function getVotes(): Promise<VoteResponse[]> {
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

    return votes.map(vote => ({
      ...vote,
      startDate: new Date(vote.startDate),
      endDate: new Date(vote.endDate)
    }));
  } catch (error) {
    console.error('Error fetching votes:', error);
    throw new Error('Failed to fetch votes');
  }
} 