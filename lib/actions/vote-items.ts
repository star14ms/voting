'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { uploadFile } from './votes';

export async function deleteVoteItem(id: number) {
  const voteItem = await prisma.voteItem.findUnique({
    where: { id },
    include: {
      voteItemVote: true,
    },
  });

  if (!voteItem) {
    throw new Error('투표 항목을 찾을 수 없습니다.');
  }

  if (voteItem.voteItemVote.length > 0) {
    throw new Error('이미 투표에 사용된 항목은 삭제할 수 없습니다.');
  }

  await prisma.voteItem.delete({
    where: { id },
  });

  revalidatePath('/vote-items');
}

export async function getVoteItems() {
  return prisma.voteItem.findMany({
    include: {
      voteItemVote: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function createVoteItem(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const imageFile = formData.get('image') as File;

  if (!name || !description || !imageFile) {
    throw new Error('모든 필드를 입력해주세요.');
  }

  // Upload image file
  const imageFormData = new FormData();
  imageFormData.append('file', imageFile);
  const { url: imageUrl } = await uploadFile(imageFormData);

  const voteItem = await prisma.voteItem.create({
    data: {
      name,
      description,
      image: imageUrl,
    },
  });

  revalidatePath('/vote-items');
  return voteItem;
}

export async function getVoteItem(id: number) {
  const voteItem = await prisma.voteItem.findUnique({
    where: { id },
    include: {
      voteItemVote: true,
    },
  });

  if (!voteItem) {
    throw new Error('투표 항목을 찾을 수 없습니다.');
  }

  return voteItem;
}

export async function updateVoteItem(id: number, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const imageFile = formData.get('image') as File;

  if (!name) {
    throw new Error('이름은 필수 입력 항목입니다.');
  }

  const existingVoteItem = await prisma.voteItem.findUnique({
    where: { id },
  });

  if (!existingVoteItem) {
    throw new Error('투표 항목을 찾을 수 없습니다.');
  }

  let imageUrl = existingVoteItem.image;

  // If a new image is provided, upload it
  if (imageFile && imageFile.size > 0) {
    const imageFormData = new FormData();
    imageFormData.append('file', imageFile);
    const { url } = await uploadFile(imageFormData);
    imageUrl = url;
  }

  const voteItem = await prisma.voteItem.update({
    where: { id },
    data: {
      name,
      description: description || undefined,
      image: imageUrl,
    },
  });

  revalidatePath('/vote-items');
  revalidatePath(`/vote-items/${id}`);
  return voteItem;
} 