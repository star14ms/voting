import { PrismaClient } from '@prisma/client';
import { uploadToS3, getPublicUrl } from '../lib/s3.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient({
  log: ['query', 'error']
});

async function createFileFromPath(imagePath, contentType) {
  const fullPath = join(process.cwd(), 'public', imagePath);
  const buffer = readFileSync(fullPath);
  const fileName = imagePath.split('/').pop();
  return new File([buffer], fileName, { type: contentType });
}

async function main() {
  try {
    // First create the vote
    console.log('Creating vote...');
    const startDate = new Date();
    const endDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    
    // Upload main image to S3
    const mainImageFile = await createFileFromPath('images/Cook.jpg', 'image/jpeg');
    const mainImageUrl = await uploadToS3(mainImageFile);
    
    const vote = await prisma.vote.create({
      data: {
        title: '요리 프로그램 인기 투표',
        type: 'TVSHOW',
        image: getPublicUrl(mainImageUrl),
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
        imagePath: 'images/냉장고를 부탁해.webp',
        contentType: 'image/webp'
      },
      {
        name: '흑백요리사',
        description: '요리 서바이벌',
        imagePath: 'images/흑백요리사.webp',
        contentType: 'image/webp'
      },
      {
        name: '윤식당',
        description: '가게 경영',
        imagePath: 'images/윤식당.webp',
        contentType: 'image/webp'
      },
      {
        name: '백종원의 골목식당',
        description: '골목 상권 살리기',
        imagePath: 'images/백종원의 골목식당.jpeg',
        contentType: 'image/jpeg'
      }
    ];

    for (const item of voteItems) {
      // Upload image to S3
      const imageFile = await createFileFromPath(item.imagePath, item.contentType);
      const imageUrl = await uploadToS3(imageFile);

      // Create VoteItem
      const voteItem = await prisma.voteItem.create({
        data: {
          name: item.name,
          description: item.description,
          image: imageUrl
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

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 