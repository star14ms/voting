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
    
    // Get and validate existingItems
    const existingItemsStr = formData.get('existingItems') as string;
    const existingItems = existingItemsStr ? JSON.parse(existingItemsStr) : [];
    if (!Array.isArray(existingItems)) {
      throw new Error('기존 항목 데이터가 올바르지 않습니다');
    }

    // Get and validate newItems
    const newItemsStr = formData.get('newItems') as string;
    const newItems = newItemsStr ? JSON.parse(newItemsStr) : [];
    if (!Array.isArray(newItems)) {
      throw new Error('새 항목 데이터가 올바르지 않습니다');
    }

    // Validate required fields
    if (!title || !type || !startDate || !endDate || !image) {
      throw new Error('필수 항목이 누락되었습니다');
    }

    // Create the vote first
    const vote = await prisma.vote.create({
      data: {
        title,
        type,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        image,
      },
    });

    // Create voteItemVote records for existing items
    if (existingItems.length > 0) {
      await prisma.voteItemVote.createMany({
        data: existingItems.map((itemId: number) => ({
          voteId: vote.id,
          voteItemId: itemId,
          voteCount: 0,
        })),
      });
    }

    // Create new items and their voteItemVote records
    if (newItems.length > 0) {
      for (const item of newItems) {
        const newVoteItem = await prisma.voteItem.create({
          data: {
            name: item.name,
            description: item.description,
            image: item.image,
          },
        });

        await prisma.voteItemVote.create({
          data: {
            voteId: vote.id,
            voteItemId: newVoteItem.id,
            voteCount: 0,
          },
        });
      }
    }

    // Fetch the complete vote with all relations
    const completeVote = await prisma.vote.findUnique({
      where: { id: vote.id },
      include: {
        voteItemVote: {
          include: {
            voteItem: true,
          },
        },
      },
    });

    if (!completeVote) {
      throw new Error('투표를 찾을 수 없습니다');
    }

    revalidatePath('/');
    return completeVote;
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

export async function deleteVote(voteId: string, deleteItems: boolean = false) {
  try {
    // First check if the vote exists
    const vote = await prisma.vote.findUnique({
      where: {
        id: Number(voteId)
      }
    });

    if (!vote) {
      throw new Error('삭제할 투표를 찾을 수 없습니다');
    }

    // First delete all VoteItemVote records
    await prisma.voteItemVote.deleteMany({
      where: {
        voteId: Number(voteId)
      }
    });

    // If deleteItems is true, find and delete unused VoteItems
    if (deleteItems) {
      const voteItems = await prisma.voteItem.findMany({
        where: {
          voteItemVote: {
            none: {} // Find items with no VoteItemVote records
          }
        }
      });

      if (voteItems.length > 0) {
        await prisma.voteItem.deleteMany({
          where: {
            id: {
              in: voteItems.map(item => item.id)
            }
          }
        });
      }
    }

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

export async function deleteUnusedVoteItems() {
  try {
    // Find all vote items that have no VoteItemVote records
    const unusedItems = await prisma.voteItem.findMany({
      where: {
        voteItemVote: {
          none: {}
        }
      }
    });

    if (unusedItems.length === 0) {
      return { message: '삭제할 항목이 없습니다.' };
    }

    // Delete the unused items
    await prisma.voteItem.deleteMany({
      where: {
        id: {
          in: unusedItems.map(item => item.id)
        }
      }
    });

    revalidatePath('/vote-items');
    return { message: `${unusedItems.length}개의 미사용 항목이 삭제되었습니다.` };
  } catch (error) {
    console.error('Error deleting unused vote items:', error);
    throw new Error('미사용 항목 삭제에 실패했습니다');
  }
} 