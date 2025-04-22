'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type SampleSet = 'cooking' | 'tvshows' | 'maleactors';

const sampleSets = {
  cooking: {
    vote: {
      title: '요리 프로그램 인기 투표',
      type: 'TVSHOW' as const,
      image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1744988878716-Cook.jpg',
    },
    items: [
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
    ]
  },
  tvshows: {
    vote: {
      title: 'TV 프로그램 인기순위 2025',
      type: 'TVSHOW' as const,
      image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745078288242-TV+%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%85%E1%85%A2%E1%86%B7+%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%80%E1%85%B5%E1%84%89%E1%85%AE%E1%86%AB%E1%84%8B%E1%85%B1+2025.jpeg'
    },
    items: [
      {
        name: '폭싹 속았수다',
        description: '제주도 사투리와 유머로 풀어내는 애순이와 관수의 당차고 따뜻한 로맨스 드라마.',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745078288683-%E1%84%91%E1%85%A9%E1%86%A8%E1%84%8A%E1%85%A1%E1%86%A8+%E1%84%89%E1%85%A9%E1%86%A8%E1%84%8B%E1%85%A1%E1%86%BB%E1%84%89%E1%85%AE%E1%84%83%E1%85%A1.webp'
      },
      {
        name: '미스터트롯3',
        description: '신선한 트롯 선곡과 치열한 경쟁으로 새로운 트롯 스타를 발굴하는 오디션 프로그램.',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745078288515-%E1%84%86%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%84%90%E1%85%B3%E1%84%85%E1%85%A9%E1%86%BA3.webp'
      },
      {
        name: '독수리 5형제를 부탁해!',
        description: '독수리 술도가의 개성 강한 오형제와 맏형수가 빚어내는 유쾌한 가족 드라마.',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745078288445-%E1%84%83%E1%85%A9%E1%86%A8%E1%84%89%E1%85%AE%E1%84%85%E1%85%B5+5%E1%84%92%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%85%E1%85%B3%E1%86%AF+%E1%84%87%E1%85%AE%E1%84%90%E1%85%A1%E1%86%A8%E1%84%92%E1%85%A2!.webp'
      },
      {
        name: '결혼하자 맹꽁아!',
        description: '사랑과 갈등 속에서 결혼을 향해 나아가는 캐릭터들의 감동적인 일일 드라마.',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745078288380-%E1%84%80%E1%85%A7%E1%86%AF%E1%84%92%E1%85%A9%E1%86%AB%E1%84%92%E1%85%A1%E1%84%8C%E1%85%A1+%E1%84%86%E1%85%A2%E1%86%BC%E1%84%81%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%A1!.webp'
      },
      {
        name: '보물섬',
        description: '미스터리한 스토리와 긴장감 넘치는 전개로 시청자를 사로잡는 주말 드라마.',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745078288616-%E1%84%87%E1%85%A9%E1%84%86%E1%85%AE%E1%86%AF%E1%84%89%E1%85%A5%E1%86%B7.webp'
      }
    ]
  },
  maleactors: {
    vote: {
      title: '남자 배우 인기 투표',
      type: 'CELEBRITY' as const,
      image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745299831553-%E1%84%82%E1%85%A1%E1%86%B7%E1%84%8C%E1%85%A1%E1%84%87%E1%85%A2%E1%84%8B%E1%85%AE+28%E1%84%8E%E1%85%A1.png', // This will be replaced with actual image
    },
    items: [
      {
        name: '추영우',
        description: '',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745299832602-%E1%84%8E%E1%85%AE%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%AE.png'
      },
      {
        name: '주지훈',
        description: '',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745299832500-%E1%84%8C%E1%85%AE%E1%84%8C%E1%85%B5%E1%84%92%E1%85%AE%E1%86%AB.png'
      },
      {
        name: '정해인',
        description: '',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745299832409-%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%92%E1%85%A2%E1%84%8B%E1%85%B5%E1%86%AB.jpg'
      },
      {
        name: '이준호',
        description: '',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745299832347-%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%AE%E1%86%AB%E1%84%92%E1%85%A9.jpg'
      },
      {
        name: '이준혁',
        description: '',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745299832208-%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%AE%E1%86%AB%E1%84%92%E1%85%A7%E1%86%A8.png'
      },
      {
        name: '이동욱',
        description: '',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745299832167-%E1%84%8B%E1%85%B5%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%AE%E1%86%A8.jpeg'
      },
      {
        name: '윤시윤',
        description: '',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745299832103-%E1%84%8B%E1%85%B2%E1%86%AB%E1%84%89%E1%85%B5%E1%84%8B%E1%85%B2%E1%86%AB.jpg'
      },
      {
        name: '엄태구',
        description: '',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745299831981-%E1%84%8B%E1%85%A5%E1%86%B7%E1%84%90%E1%85%A2%E1%84%80%E1%85%AE.png'
      },
      {
        name: '변우석',
        description: '',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745299831854-%E1%84%87%E1%85%A7%E1%86%AB%E1%84%8B%E1%85%AE%E1%84%89%E1%85%A5%E1%86%A8.png'
      },
      {
        name: '로운',
        description: '',
        image: 'https://voting-korea.s3.ap-northeast-2.amazonaws.com/images/1745299831791-%E1%84%85%E1%85%A9%E1%84%8B%E1%85%AE%E1%86%AB.jpg'
      }
    ]
  }
};

export async function seedDatabase(sampleSet: SampleSet = 'cooking') {
  try {
    if (!(sampleSet in sampleSets)) {
      throw new Error(`Invalid sample set: ${sampleSet}`);
    }

    const selectedSet = sampleSets[sampleSet];
    
    // First create the vote
    console.log(`Creating ${sampleSet} vote...`);
    const startDate = new Date();
    const endDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    
    const vote = await prisma.vote.create({
      data: {
        title: selectedSet.vote.title,
        type: selectedSet.vote.type,
        image: selectedSet.vote.image,
        startDate,
        endDate
      }
    });

    console.log('Successfully created vote with ID:', vote.id);

    // Create the vote items
    console.log('Creating vote items...');
    for (const item of selectedSet.items) {
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