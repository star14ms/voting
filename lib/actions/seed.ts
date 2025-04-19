'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedDatabase() {
  try {
    // First create the vote
    console.log('Creating vote...');
    const startDate = new Date();
    const endDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    
    const vote = await prisma.vote.create({
      data: {
        title: '요리 프로그램 인기 투표',
        type: 'TVSHOW',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1744988878716-Cook.jpg',
        startDate,
        endDate
      }
    });

    console.log('Successfully created vote with ID:', vote.id);

    // Create the vote items
    console.log('Creating vote items...');
    const voteItems = [
      {
        name: '냉장고를 부탁해',
        description: '게스트의 냉장고 속 재료들을 이용한 1vs1 요리 대결',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1744988881350-%EB%83%89%EC%9E%A5%EA%B3%A0%EB%A5%BC+%EB%B6%80%ED%83%81%ED%95%B4.webp'
      },
      {
        name: '흑백요리사',
        description: '요리 서바이벌',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1744988881805-%ED%9D%91%EB%B0%B1%EC%9A%94%EB%A6%AC%EC%82%AC.webp'
      },
      {
        name: '윤식당',
        description: '가게 경영',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1744988882079-%EC%9C%A4%EC%8B%9D%EB%8B%B9.webp'
      },
      {
        name: '백종원의 골목식당',
        description: '골목 상권 살리기',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1744988882420-%EB%B0%B1%EC%A2%85%EC%9B%90%EC%9D%98+%EA%B3%A8%EB%AA%A9%EC%8B%9D%EB%8B%B9.jpeg'
      }
    ];

    for (const item of voteItems) {
      // Create VoteItem
      const voteItem = await prisma.voteItem.create({
        data: {
          name: item.name,
          description: item.description,
          image: item.image
        }
      });

      // Create VoteItemVote record
      await prisma.voteItemVote.create({
        data: {
          voteId: vote.id,
          voteItemId: voteItem.id,
          voteCount: 0,
        },
      });

      console.log(`Created vote item: ${voteItem.name}`);
    }

    await prisma.$disconnect();
    return { success: true, message: '샘플 데이터가 성공적으로 추가되었습니다.' };
  } catch (error) {
    console.error('Error during seeding:', error);
    await prisma.$disconnect();
    return { success: false, error: '샘플 데이터 추가 중 오류가 발생했습니다.' };
  }
} 