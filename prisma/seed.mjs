import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient({
  log: ['query', 'error']
});

async function main() {
  try {
    // Convert images to base64
    const convertImageToBase64 = (imagePath) => {
      try {
        const fullPath = join(process.cwd(), 'public', 'images', imagePath);
        console.log(`Reading image: ${imagePath}`);
        const buffer = readFileSync(fullPath);
        const extension = imagePath.split('.').pop().toLowerCase();
        const mimeType = extension === 'jpg' || extension === 'jpeg' ? 'jpeg' : extension;
        return `data:image/${mimeType};base64,${buffer.toString('base64')}`;
      } catch (error) {
        console.error(`Error reading image ${imagePath}:`, error);
        throw error;
      }
    };

    console.log('Converting images to base64...');
    const mainImage = convertImageToBase64('Cook.jpg');
    const images = {
      '냉장고를 부탁해': convertImageToBase64('냉장고를 부탁해.webp'),
      '흑백요리사': convertImageToBase64('흑백요리사.webp'),
      '윤식당': convertImageToBase64('윤식당.webp'),
      '백종원의 골목식당': convertImageToBase64('백종원의 골목식당.jpeg')
    };

    // First create the vote using raw SQL
    console.log('Creating vote...');
    const startDate = new Date();
    const endDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    
    const result = await prisma.$executeRaw`
      INSERT INTO "Vote" ("title", "type", "image", "startDate", "endDate", "createdAt", "updatedAt")
      VALUES (
        '요리 프로그램 인기 투표',
        'TVSHOW',
        ${mainImage},
        ${startDate},
        ${endDate},
        NOW(),
        NOW()
      )
      RETURNING "id"
    `;

    // Get the last inserted vote
    const vote = await prisma.vote.findFirst({
      orderBy: {
        id: 'desc'
      }
    });

    console.log('Successfully created vote with ID:', vote.id);

    // Then create the vote items using raw SQL to avoid Prisma validation issues
    console.log('Creating vote items...');
    const voteItems = [
      {
        name: '냉장고를 부탁해',
        description: '게스트의 냉장고 속 재료들을 이용한 1vs1 요리 대결',
        image: images['냉장고를 부탁해'],
        voteId: vote.id
      },
      {
        name: '흑백요리사',
        description: '요리 서바이벌',
        image: images['흑백요리사'],
        voteId: vote.id
      },
      {
        name: '윤식당',
        description: '가게 경영',
        image: images['윤식당'],
        voteId: vote.id
      },
      {
        name: '백종원의 골목식당',
        description: '골목 상권 살리기',
        image: images['백종원의 골목식당'],
        voteId: vote.id
      }
    ];

    for (const item of voteItems) {
      // Create VoteItem and get its ID
      const voteItemResult = await prisma.$queryRaw`
        INSERT INTO "VoteItem" ("name", "description", "image", "voteId", "createdAt", "updatedAt")
        VALUES (
          ${item.name},
          ${item.description},
          ${item.image},
          ${item.voteId},
          NOW(),
          NOW()
        )
        RETURNING "id"
      `;
      
      const voteItemId = voteItemResult[0].id;

      // Create VoteItemVote for this item
      await prisma.$executeRaw`
        INSERT INTO "VoteItemVote" ("voteItemId", "voteId", "voteCount", "createdAt", "updatedAt")
        VALUES (
          ${voteItemId},
          ${vote.id},
          0,
          NOW(),
          NOW()
        )
      `;

      console.log(`Created vote item and vote count: ${item.name}`);
    }

    console.log('Successfully created all vote items and vote counts');
  } catch (error) {
    console.error('Error seeding database:', error);
    if (error.code === 'P2009') {
      console.error('Invalid Prisma schema - check if all required fields are provided');
    }
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      meta: error.meta
    });
    throw error;
  }
}

console.log('Starting database seed...');
main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Cleaning up...');
    await prisma.$disconnect();
  }); 