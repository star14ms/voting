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
    const type = formData.get('type') as string;
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

export async function voteForItem(voteId: string, itemId: number, userId: string) {
  try {
    // Check if user is authenticated
    if (!userId) {
      throw new Error('로그인이 필요합니다');
    }

    // Check if user has already voted
    const hasVoted = await hasUserVoted(Number(voteId), userId);
    if (hasVoted) {
      const voted_id = await getUserVoteItem(voteId, userId);
      if (voted_id === Number(itemId)) {
        throw new Error('이미 투표하셨습니다.');
      }
    }

    // Increment vote count
    const updatedVoteItemVote = await prisma.voteItemVote.update({
      where: {
        voteItemId_voteId: {
          voteItemId: Number(itemId),
          voteId: Number(voteId),
        },
      },
      data: {
        voteCount: {
          increment: 1,
        },
      },
    });

    // Record user's vote
    await recordUserVote(Number(voteId), userId, updatedVoteItemVote.id);

    revalidatePath(`/votes/${voteId}`);
    return updatedVoteItemVote;
  } catch (error) {
    console.error('Error voting for item:', error);
    throw error;
  }
}

export async function removeVote(voteId: string, itemId: number, userId: string) {
  try {
    const voteItemVote = await prisma.voteItemVote.findUnique({
      where: {
        voteItemId_voteId: {
          voteItemId: Number(itemId),
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
          voteItemId: Number(itemId),
          voteId: Number(voteId)
        }
      },
      data: {
        voteCount: {
          decrement: 1
        }
      }
    });

    await prisma.userVotes.delete({
      where: {
        userId_voteId: {
          userId: Number(userId),
          voteId: Number(voteId)
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

    await prisma.userVotes.deleteMany({
      where: {
        voteId: Number(voteId)
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

    await prisma.userVotes.deleteMany({
      where: {
        voteId: Number(voteId)
      }
    });

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
      endDate: new Date(vote.endDate),
      image: vote.image,
      voteCount: vote.voteItemVote.reduce((sum, item) => sum + item.voteCount, 0)
    }));
  } catch (error) {
    console.error('Error fetching votes:', error);
    throw new Error('Failed to fetch votes');
  }
}

export async function hasUserVoted(voteId: number, userId: string): Promise<boolean> {
  const db = prisma;
  try {
    const existingVote = await db.userVotes.findUnique({
      where: {
        userId_voteId: {
          userId: Number(userId),
          voteId: Number(voteId)
        }
      }
    });
    return !!existingVote;
  } catch (error) {
    console.error('Error checking user vote:', error);
    return false;
  }
}

export async function getUserVoteItem(voteId: string, userId: string): Promise<number | null> {
  const db = prisma;
  try {
    const userVote = await db.userVotes.findUnique({
      where: {
        userId_voteId: {
          userId: Number(userId),
          voteId: Number(voteId)
        }
      },
      include: {
        voteItemVote: true
      }
    });

    return userVote?.voteItemVote?.voteItemId || null;
  } catch (error) {
    console.error('Error getting user vote item:', error);
    return null;
  }
}

export async function recordUserVote(voteId: number, userId: string, voteItemVoteId: number): Promise<void> {
  const db = prisma;
  try {
    // Check if user has already voted
    const existingVote = await db.userVotes.findUnique({
      where: {
        userId_voteId: {
          userId: Number(userId),
          voteId: Number(voteId)
        }
      }
    });

    if (existingVote) {
      // Update existing vote
      await db.userVotes.update({
        where: {
          id: existingVote.id
        },
        data: {
          voteItemVoteId
        }
      });
    } else {
      // Create new vote
      await db.userVotes.create({
        data: {
          userId: Number(userId),
          voteId: Number(voteId),
          voteItemVoteId,
        },
      });
    }
  } catch (error) {
    console.error('Error recording user vote:', error);
    throw error;
  }
}

export async function deleteUnusedVoteItems() {
  try {
    // Find all vote items that are not associated with any voteItemVote
    const unusedItems = await prisma.voteItem.findMany({
      where: {
        voteItemVote: {
          none: {}
        }
      }
    });

    // Delete the unused items
    const deletedCount = await prisma.voteItem.deleteMany({
      where: {
        id: {
          in: unusedItems.map(item => item.id)
        }
      }
    });

    revalidatePath('/vote-items');
    return { message: `${deletedCount.count}개의 미사용 항목이 삭제되었습니다.` };
  } catch (error) {
    console.error('Error deleting unused vote items:', error);
    throw new Error('미사용 항목 삭제에 실패했습니다');
  }
}

export async function updateVote(voteId: string, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const type = formData.get('type') as string;
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

    // Start a transaction to update the vote and its items
    const updatedVote = await prisma.$transaction(async (tx) => {
      // Update the vote
      const vote = await tx.vote.update({
        where: { id: Number(voteId) },
        data: {
          title,
          type,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          image,
        },
      });

      // Get current vote items
      const currentVoteItems = await tx.voteItemVote.findMany({
        where: { voteId: Number(voteId) },
        include: { voteItem: true },
      });

      // Delete vote items that are no longer in the list
      const currentItemIds = currentVoteItems.map(item => item.voteItemId);
      const newItemIds = [...existingItems, ...newItems.map(item => item.id)];
      const itemsToDelete = currentItemIds.filter(id => !newItemIds.includes(id));

      if (itemsToDelete.length > 0) {
        await tx.voteItemVote.deleteMany({
          where: {
            voteId: Number(voteId),
            voteItemId: { in: itemsToDelete },
          },
        });
      }

      // Handle existing items that are not in the current vote
      for (const itemId of existingItems) {
        const existingVoteItemVote = await tx.voteItemVote.findUnique({
          where: {
            voteItemId_voteId: {
              voteItemId: itemId,
              voteId: Number(voteId),
            },
          },
        });

        if (!existingVoteItemVote) {
          // Create new voteItemVote for existing item
          await tx.voteItemVote.create({
            data: {
              voteId: Number(voteId),
              voteItemId: itemId,
              voteCount: 0,
            },
          });
        }
      }

      // Create new items and their voteItemVote records
      if (newItems.length > 0) {
        for (const item of newItems) {
          if (item.id) {
            // Update existing item
            await tx.voteItem.update({
              where: { id: item.id },
              data: {
                name: item.name,
                description: item.description,
                image: item.image,
              },
            });
          } else {
            // Create new item
            const newVoteItem = await tx.voteItem.create({
              data: {
                name: item.name,
                description: item.description,
                image: item.image,
              },
            });

            await tx.voteItemVote.create({
              data: {
                voteId: Number(voteId),
                voteItemId: newVoteItem.id,
                voteCount: 0,
              },
            });
          }
        }
      }

      // Return the complete updated vote
      return tx.vote.findUnique({
        where: { id: Number(voteId) },
        include: {
          voteItemVote: {
            include: {
              voteItem: true,
            },
          },
        },
      });
    });

    if (!updatedVote) {
      throw new Error('투표를 찾을 수 없습니다');
    }

    revalidatePath(`/votes/${voteId}`);
    return updatedVote;
  } catch (error) {
    console.error('Error updating vote:', error);
    throw new Error('투표 수정에 실패했습니다');
  }
} 